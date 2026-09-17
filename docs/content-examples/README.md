# Content file examples

Reference shapes for `content/**/*.mdx`. They live here rather than in
`content/` because the catch-all route's dynamic import pulls every file under
`content/` into the build graph, so an example with a non-standard extension
breaks the build.

Copy one into `content/<type>/` and rename to `.mdx` when the real content
migration starts (Phase 2).
