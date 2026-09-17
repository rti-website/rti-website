#!/usr/bin/env node
/**
 * Knock a flat background colour out of a Figma PNG export.
 *
 * Why this exists: a node exported from Figma is rendered ON the fill behind
 * it, so an image that looks like a cut-out in the file arrives as a fully
 * opaque rectangle. `home/cta-ewaste.png` (node 6478:5192) came back as a solid
 * plate of #0c4e5a, which is the CTA band's base colour — fine where the band
 * is that exact colour, and a visible dark box everywhere the band's green wash
 * has lifted it. Asim spotted it on the homepage, 16 Sep 2026.
 *
 *   node scripts/cut-figma-plate.mjs <in.png> <out.png> [#rrggbb]
 *
 * The plate colour is read from the four corners when it is not given. The four
 * must agree, otherwise the export is not plate-backed and the script refuses
 * rather than eating part of the picture.
 *
 * Pixels within `T0` of the plate go fully transparent, pixels past `T1` stay
 * fully opaque, and the band between is feathered. Feathered pixels are then
 * un-multiplied — `(P - (1-a)B) / a` — so the plate's colour is taken back out
 * of the semi-transparent edge instead of being left as a rim of teal.
 *
 * The thresholds suit a plate laid down by a renderer, which is flat to within
 * a hair. Widen T1 for a photographic backdrop, or do not use this at all.
 *
 * Re-running the fetch script overwrites `*-flat.png`, never the cut-out, so
 * the two can be regenerated in either order.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const T0 = 6 // distance from the plate at or below which a pixel is background
const T1 = 30 // distance at or above which a pixel is untouched

const [, , inArg, outArg, colourArg] = process.argv
if (!inArg || !outArg) {
  console.error('  usage: node scripts/cut-figma-plate.mjs <in.png> <out.png> [#rrggbb]')
  process.exit(1)
}

const inPath = path.resolve(process.cwd(), inArg)
const outPath = path.resolve(process.cwd(), outArg)
if (!fs.existsSync(inPath)) {
  console.error(`  no such file: ${inArg}`)
  process.exit(1)
}

const { data, info } = await sharp(inPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
const at = (x, y) => {
  const i = (y * width + x) * channels
  return [data[i], data[i + 1], data[i + 2]]
}

let plate
if (colourArg) {
  const m = /^#?([0-9a-f]{6})$/i.exec(colourArg)
  if (!m) { console.error(`  not a colour: ${colourArg}`); process.exit(1) }
  const n = parseInt(m[1], 16)
  plate = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
} else {
  const corners = [at(1, 1), at(width - 2, 1), at(1, height - 2), at(width - 2, height - 2)]
  const [first] = corners
  const spread = Math.max(...corners.map((c) => Math.hypot(c[0] - first[0], c[1] - first[1], c[2] - first[2])))
  if (spread > T0) {
    console.error(`  corners disagree by ${spread.toFixed(1)} — this export is not plate-backed.`)
    console.error(`  corners: ${corners.map((c) => `rgb(${c.join(',')})`).join('  ')}`)
    process.exit(1)
  }
  plate = first
}

const [br, bg, bb] = plate
let cleared = 0
let feathered = 0

for (let i = 0; i < data.length; i += channels) {
  const dr = data[i] - br
  const dg = data[i + 1] - bg
  const db = data[i + 2] - bb
  const dist = Math.sqrt(dr * dr + dg * dg + db * db)
  if (dist <= T0) {
    data[i] = 0; data[i + 1] = 0; data[i + 2] = 0; data[i + 3] = 0
    cleared++
    continue
  }
  if (dist >= T1) continue
  const a = (dist - T0) / (T1 - T0)
  // un-multiply the plate out of the edge so no rim of its colour is left
  data[i] = Math.max(0, Math.min(255, (data[i] - (1 - a) * br) / a))
  data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - (1 - a) * bg) / a))
  data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - (1 - a) * bb) / a))
  data[i + 3] = Math.round(a * data[i + 3])
  feathered++
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
await sharp(data, { raw: { width, height, channels } }).png().toFile(outPath)

const pct = (n) => ((n / (width * height)) * 100).toFixed(1)
console.log(`  ${outArg}  ${width}x${height}`)
console.log(`  plate rgb(${plate.join(',')}) — ${pct(cleared)}% cleared, ${pct(feathered)}% feathered`)
