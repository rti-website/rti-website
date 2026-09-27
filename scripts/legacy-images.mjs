#!/usr/bin/env node
/**
 * The WordPress images the 26 Sep 2026 crawl reported as broken.
 *
 * Their URLs were missing the slash after the domain (fixed: db/009 and
 * src/lib/legacy-urls.ts). Once the slash is back they point at
 * /wp-content/uploads/<year>/<month>/<file> — and that file has to exist
 * somewhere this site serves from, or the image is still broken, just with
 * a 404 instead of a DNS error. next.config serves /wp-content/uploads/* from
 * MEDIA_DIR/legacy/* (data/legacy-media-map.json covers the ones the import
 * already rehosted).
 *
 * Two jobs:
 *
 *   node scripts/legacy-images.mjs check --csv <crawl.csv> [--base <url>]
 *       Lists every distinct image path in the crawl (both CSVs are the same
 *       list), asks the site for each one, and prints which still 404.
 *       Default base: https://www.recycletechnologies.com
 *
 *   node scripts/legacy-images.mjs restore --csv <crawl.csv> --from <dir> [--to <dir>]
 *       Copies just the needed files out of a WordPress wp-content/uploads
 *       backup folder into MEDIA_DIR/legacy, keeping the year/month folders.
 *       --from is the backup's uploads folder (the one holding 2023/, 2024/…).
 *       --to defaults to $MEDIA_DIR/legacy, then ./var/uploads/legacy.
 *       Prints what it copied and what the backup does not have.
 *
 * Read-only apart from the copies in `restore`; nothing is deleted.
 */
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const mode = args[0]
const opt = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d }

if (!['check', 'restore'].includes(mode) || !opt('--csv')) {
  console.error('usage: legacy-images.mjs check --csv <file> [--base <url>]\n       legacy-images.mjs restore --csv <file> --from <uploads dir> [--to <dir>]')
  process.exit(2)
}

/** Distinct /wp-content/uploads/... paths from the crawl, slash repaired. */
function pathsFromCsv(file) {
  const out = new Set()
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/).slice(1)) {
    const cells = line.split(',')
    const img = cells[1]
    if (!img) continue
    const m = img.replace(/recycletechnologies\.com(?=[A-Za-z])/, 'recycletechnologies.com/').match(/(\/wp-content\/uploads\/.+)$/)
    if (m) out.add(decodeURI(m[1]))
  }
  return [...out].sort()
}

const paths = pathsFromCsv(opt('--csv'))
console.log(`${paths.length} distinct image paths in the crawl\n`)

if (mode === 'check') {
  const base = (opt('--base', 'https://www.recycletechnologies.com')).replace(/\/+$/, '')
  const missing = []
  let ok = 0
  for (const p of paths) {
    let status = 'ERR'
    try {
      const r = await fetch(base + encodeURI(p), { redirect: 'manual' })
      await r.body?.cancel()
      status = String(r.status)
    } catch { /* keep ERR */ }
    if (status === '200') ok++
    else { missing.push(p); console.log(`  ${status.padEnd(4)} ${p}`) }
  }
  console.log(`\n${ok} load, ${missing.length} still missing.`)
  if (missing.length) {
    const list = path.join(process.cwd(), 'data', 'legacy-images-missing.txt')
    fs.writeFileSync(list, missing.join('\n') + '\n')
    console.log(`Missing list written to data/legacy-images-missing.txt.\nGet these from the WordPress backup and run:\n  node scripts/legacy-images.mjs restore --csv <crawl.csv> --from <backup>/wp-content/uploads`)
  }
}

if (mode === 'restore') {
  const from = opt('--from')
  if (!from || !fs.existsSync(from)) { console.error('--from <dir> must be the backup wp-content/uploads folder'); process.exit(2) }
  const to = opt('--to', path.join(process.env.MEDIA_DIR || path.join(process.cwd(), 'var', 'uploads'), 'legacy'))
  let copied = 0, had = 0
  const notInBackup = []
  for (const p of paths) {
    const rel = p.replace(/^\/wp-content\/uploads\//, '')
    const src = path.join(from, rel)
    const dst = path.join(to, rel)
    if (!path.resolve(dst).startsWith(path.resolve(to) + path.sep)) continue   // never outside `to`
    if (!fs.existsSync(src)) { notInBackup.push(p); continue }
    if (fs.existsSync(dst)) { had++; continue }
    fs.mkdirSync(path.dirname(dst), { recursive: true })
    fs.copyFileSync(src, dst)
    copied++
  }
  console.log(`${copied} copied into ${to}, ${had} were already there, ${notInBackup.length} not in the backup.`)
  for (const p of notInBackup) console.log(`  not in backup: ${p}`)
  if (notInBackup.length) console.log('\nThose need to be found elsewhere, or the image removed from the post in the admin.')
}
