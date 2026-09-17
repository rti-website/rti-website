import { StarterKit } from '@tiptap/starter-kit'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Image } from '@tiptap/extension-image'
import { TableKit } from '@tiptap/extension-table'
import { TaskList, TaskItem } from '@tiptap/extension-list'
import { CharacterCount } from '@tiptap/extension-character-count'
import { ListStyle, BlockSpacing } from '@/lib/editor-marks'

/**
 * The editor's extension list — ONE definition, imported by both the editor in
 * the browser and the renderer on the server.
 *
 * !! THEY MUST BE THE SAME LIST. The static renderer turns stored JSON back into
 * HTML using whatever extensions it is given; a node written by an extension the
 * renderer does not have renders as nothing at all — silently, in production, on
 * a live page. That is why this file exists instead of two arrays.
 *
 * !! HEADINGS START AT 2, ON PURPOSE. Google Docs offers Title and Heading 1-4,
 * and an editor that maps its "Heading 1" to <h1> ships TWO h1s on every post —
 * the article title and the first body heading. The article title field is the
 * page's only <h1>; the toolbar relabels 2/3/4 as "Heading 1/2/3". Changing this
 * later means rewriting the stored content of every post, so it is settled here.
 *
 * Everything below is MIT. Tiptap meters documents stored in THEIR cloud; ours
 * live in our own Postgres, so the licence cost of this list is zero, for good.
 */
export const EDITOR_EXTENSIONS = [
  StarterKit.configure({
    heading: { levels: [2, 3, 4] },
    link: {
      openOnClick: false,
      // Anything but http/https/mailto is dropped rather than rendered, which is
      // what stops `javascript:` surviving a paste into a published page.
      protocols: ['http', 'https', 'mailto', 'tel'],
      HTMLAttributes: { rel: 'noopener noreferrer' },
    },
  }),
  // Colour, highlight background, font family, font size and line height — all
  // one package since v3. In v2 these were four custom extensions.
  TextStyleKit,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Image.configure({ inline: false, allowBase64: false }),
  TableKit.configure({ table: { resizable: true } }),
  TaskList,
  TaskItem.configure({ nested: true }),
  CharacterCount,
  // List markers and paragraph spacing, as attributes on the nodes above rather
  // than replacements for them — see editor-marks.ts for why that matters.
  ListStyle,
  BlockSpacing,
]
