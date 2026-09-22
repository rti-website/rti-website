#!/usr/bin/env python3
"""
Re-black the GLBA mark for the certifications strip.

  python3 scripts/recolour-glba.py

Reads public/images/certs/8.png (the Figma export: blue wordmark on an opaque
white ground) and writes public/images/certs/8-black.png: every non-white
pixel to #000, white ground made transparent, anti-aliased edges kept as
partial alpha. Asim, 22 Sep 2026: "make the GLBA colour black". Run it again
after any re-export of node 6721:5861; the strip reads the -black file.
"""
from PIL import Image

src = Image.open('public/images/certs/8.png').convert('RGBA')
w, h = src.size
out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
s = src.load(); d = out.load()
for y in range(h):
    for x in range(w):
        r, g, b, _ = s[x, y]
        lum = (r + g + b) / 3
        alpha = 0 if lum > 245 else (255 if lum < 200 else int(255 * (245 - lum) / 45))
        d[x, y] = (0, 0, 0, alpha)
out.save('public/images/certs/8-black.png')
print('wrote public/images/certs/8-black.png')
