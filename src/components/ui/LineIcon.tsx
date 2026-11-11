/**
 * The line icons of the 4 Nov 2026 location service design (Figma 7566:9207):
 * 2px round strokes on a 24 grid, drawn in currentColor so one set serves the
 * teal icons on white, the white ones on the pickup card and the mint ones
 * in the dark Why band. Inline rather than files: they are a few paths each
 * and the page sets their colour.
 *
 * The page data names an icon (`icon: 'battery'`); the converter that builds
 * the pages from the content docs picks the name from the item's words.
 * An unknown name draws the tick in a circle.
 */
const P: Record<string, string> = {
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z|c12,10,3',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z',
  clock: 'c12,12,10|M12 6v6l4 2',
  box: 'M21 8 12 3 3 8v8l9 5 9-5V8Z|M3 8l9 5 9-5|M12 13v8',
  truck: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2|M15 18H9|M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 8.38A1 1 0 0 0 17.52 8H14|c17,18,2|c7,18,2',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z|m22 7-10 6L2 7',
  battery: 'M4 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z|M22 11v2|M6 11v2|M10 11v2',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
  repeat: 'm17 2 4 4-4 4|M3 11v-1a4 4 0 0 1 4-4h14|m7 22-4-4 4-4|M21 13v1a4 4 0 0 1-4 4H3',
  target: 'c12,12,10|c12,12,3',
  tool: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z',
  plug: 'M12 22v-5|M9 8V2|M15 8V2|M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z',
  car: 'M19 17h2a1 1 0 0 0 1-1v-3a2 2 0 0 0-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3A2.5 2.5 0 0 0 12 7H5a1.5 1.5 0 0 0-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4a1 1 0 0 0 1 1h2|M9 17h6|c7,17,2|c17,17,2',
  search: 'c11,11,8|m21 21-4.3-4.3',
  check: 'M20 6 9 17l-5-5',
  arrowRight: 'M5 12h14|m12 5 7 7-7 7',
  alert: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z|M12 9v4|M12 17h.01',
  building: 'M6 2h12a2 2 0 0 1 2 2v18H4V4a2 2 0 0 1 2-2Z|M10 22v-4h4v4|M8 6h.01|M16 6h.01|M12 6h.01|M12 10h.01|M12 14h.01|M16 10h.01|M16 14h.01|M8 10h.01|M8 14h.01',
  school: 'M22 10 12 5 2 10l10 5 10-5Z|M6 12v5c3 3 9 3 12 0v-5|M22 10v6',
  heart: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z|M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27',
  warehouse: 'M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z|M6 18h12|M6 14h12|M6 10h12v12H6Z',
  layers: 'm12 2 10 5-10 5L2 7l10-5Z|m2 17 10 5 10-5|m2 12 10 5 10-5',
  sort: 'M3 6h18|M7 12h10|M10 18h4',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z|M14 2v6h6|m9 15 2 2 4-4',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z|m9 12 2 2 4-4',
  lock: 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z|M7 11V7a5 5 0 0 1 10 0v4',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z|c12,12,3',
  monitor: 'M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z|M8 21h8|M12 17v4',
  laptop: 'M4 5h16v11H4Z|M2 20h20',
  tv: 'M4 7h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z|m17 2-5 5-5-5',
  smartphone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z|M12 18h.01',
  drive: 'M22 12H2|M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z|M6 16h.01|M10 16h.01',
  server: 'M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z|M4 14h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z|M6 6h.01|M6 18h.01',
  printer: 'M6 9V2h12v7|M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2|M6 14h12v8H6Z',
  cpu: 'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z|M9 9h6v6H9Z|M9 1v3|M15 1v3|M9 20v3|M15 20v3|M20 9h3|M20 14h3|M1 9h3|M1 14h3',
  cable: 'M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1|M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9|M21 21v-2h-4|M3 5h4V3|M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3',
  bulb: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5|M9 18h6|M10 22h4',
  tube: 'M3 9h18v6H3Z|M1 12h2|M21 12h2|M7 9v6|M17 9v6',
  home: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z|M9 22V12h6v10',
  briefcase: 'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|c9,7,4|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75',
  award: 'c12,8,6|M15.48 12.89 17 22l-5-3-5 3 1.52-9.11',
  recycle: 'M7 19H4.82a1.83 1.83 0 0 1-1.57-.88 1.79 1.79 0 0 1 0-1.84L7.2 9.5|M11 19h8.2a1.83 1.83 0 0 0 1.56-.89 1.78 1.78 0 0 0 0-1.83l-1.2-2|m14 16-3 3 3 3|M8.29 13.6 7.2 9.5 3.1 10.6|m9.34 5.8 1.09-1.87a1.83 1.83 0 0 1 3.14 0l3.93 6.77|m13.38 9.5 4.1 1.1 1.1-4.1',
  trash: 'M3 6h18|M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6|M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  scissors: 'c6,6,3|c6,18,3|M20 4 8.12 15.88|M14.47 14.48 20 20|M8.12 8.12 12 12',
  landmark: 'M3 22h18|M6 18v-7|M10 18v-7|M14 18v-7|M18 18v-7|m12 2 8 5H4l8-5Z',
  factory: 'M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z|M17 18h1|M12 18h1|M7 18h1',
  calendar: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z|M16 2v4|M8 2v4|M3 10h18',
  map: 'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4Z|M8 2v16|M16 6v16',
  info: 'c12,12,10|M12 16v-4|M12 8h.01',
  dollar: 'M12 1v22|M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  droplet: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z',
  flask: 'M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55A1 1 0 0 0 5.62 22h12.76a1 1 0 0 0 .9-1.45l-5.07-10.12a2 2 0 0 1-.21-.9V2|M8.5 2h7|M7 16h10',
  spray: 'M3 3h.01|M7 5h.01|M11 7h.01|M3 7h.01|M7 9h.01|M3 11h.01|M15 5h4v4h-4Z|M19 9l2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1v-4a2 2 0 0 1 2-2h0a2 2 0 0 0 2-2V9',
  thermometer: 'M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z',
  checkCircle: 'M22 11.08V12a10 10 0 1 1-5.93-9.14|m9 11 3 3L22 4',
}

export const LINE_ICONS = Object.keys(P)

export function LineIcon({ name, className = 'size-[22px]', strokeWidth = 2 }: { name: string; className?: string; strokeWidth?: number }) {
  const parts = (P[name] ?? P.checkCircle!).split('|')
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {parts.map((d, i) => {
        if (d.startsWith('c')) {
          const [cx, cy, r] = d.slice(1).split(',').map(Number)
          return <circle key={i} cx={cx} cy={cy} r={r} />
        }
        return <path key={i} d={d} />
      })}
    </svg>
  )
}
