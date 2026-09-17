import { Extension } from '@tiptap/core'

/**
 * Two small extensions that add attributes to nodes the StarterKit already
 * provides, rather than replacing those nodes.
 *
 * !! WHY addGlobalAttributes AND NOT BulletList.extend(). The static renderer on
 * the server is handed the SAME array as the browser (see editor-extensions.ts).
 * Swapping a StarterKit node for a custom one means keeping two definitions in
 * step forever, and the day they drift the renderer meets a node it does not
 * know and emits NOTHING — silently, on a live page. A global attribute rides on
 * the node that is already there, so there is nothing to drift.
 *
 * Everything is rendered as an inline style. That is deliberate: content_html is
 * written into the database and served from a prerendered page, so a list marker
 * must not depend on a CSS class that some future stylesheet forgets to ship.
 */

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    listStyle: {
      /** Sets list-style-type on the list the cursor is in. */
      setListStyle: (style: string) => ReturnType
      unsetListStyle: () => ReturnType
    }
    blockSpacing: {
      /** Space above and below a paragraph or heading, in ems, or null to clear. */
      setBlockSpacing: (space: { before?: number | null; after?: number | null }) => ReturnType
      /** Line spacing for the block the cursor is in. */
      setLineSpacing: (value: string | null) => ReturnType
    }
  }
}

/* The six markers each dropdown offers. Strings are legal list-style-type
   values in every current browser — `list-style-type: "▸ "` is CSS Lists 3 and
   has been supported since 2021 — which is what lets the arrow and star sets
   exist without a ::before hack that pasted HTML would lose. */
export const BULLET_STYLES = ['disc', 'circle', 'square', '"▸ "', '"★ "', '"◆ "'] as const
export const NUMBER_STYLES = ['decimal', 'lower-alpha', 'lower-roman', 'upper-alpha', 'upper-roman', 'decimal-leading-zero'] as const

export const ListStyle = Extension.create({
  name: 'listStyle',

  addGlobalAttributes() {
    return [{
      types: ['bulletList', 'orderedList'],
      attributes: {
        listStyle: {
          default: null,
          parseHTML: (el) => el.style.listStyleType || null,
          renderHTML: (attrs) =>
            (attrs.listStyle ? { style: `list-style-type: ${attrs.listStyle}` } : {}),
        },
      },
    }]
  },

  addCommands() {
    return {
      setListStyle: (style) => ({ commands, editor }) => {
        // Whichever list the cursor is actually in. Asking for both and letting
        // the inactive one fail would clear the attribute on a nested list.
        const type = editor.isActive('orderedList') ? 'orderedList'
          : editor.isActive('bulletList') ? 'bulletList' : null
        if (!type) return false
        return commands.updateAttributes(type, { listStyle: style })
      },
      unsetListStyle: () => ({ commands, editor }) => {
        const type = editor.isActive('orderedList') ? 'orderedList'
          : editor.isActive('bulletList') ? 'bulletList' : null
        if (!type) return false
        return commands.updateAttributes(type, { listStyle: null })
      },
    }
  },
})

/**
 * Space before and after a block.
 *
 * Google Docs calls this "Add/Remove space before paragraph". Its neighbours in
 * that menu — Keep with next, Keep lines together, Prevent single lines, Add
 * page break — are all PRINT PAGINATION. A web page has no pages to break
 * across, so they are not offered here rather than offered and quietly ignored.
 */
export const BlockSpacing = Extension.create({
  name: 'blockSpacing',

  addGlobalAttributes() {
    return [{
      types: ['paragraph', 'heading', 'bulletList', 'orderedList', 'blockquote'],
      attributes: {
        spaceBefore: {
          default: null,
          parseHTML: (el) => el.style.marginTop || null,
          renderHTML: (attrs) => (attrs.spaceBefore ? { style: `margin-top: ${attrs.spaceBefore}` } : {}),
        },
        spaceAfter: {
          default: null,
          parseHTML: (el) => el.style.marginBottom || null,
          renderHTML: (attrs) => (attrs.spaceAfter ? { style: `margin-bottom: ${attrs.spaceAfter}` } : {}),
        },
        /* !! LINE SPACING IS A BLOCK ATTRIBUTE, NOT THE textStyle MARK.
           TextStyleKit ships a setLineHeight command, but it writes a <span>
           around the SELECTED characters — so with a plain cursor in a paragraph
           it does nothing at all, and with a selection it spaces half a line.
           Line spacing is a property of a paragraph in every word processor
           anybody has used, so it lives on the paragraph here. */
        lineSpacing: {
          default: null,
          parseHTML: (el) => el.style.lineHeight || null,
          renderHTML: (attrs) => (attrs.lineSpacing ? { style: `line-height: ${attrs.lineSpacing}` } : {}),
        },
      },
    }]
  },

  addCommands() {
    return {
      setBlockSpacing: ({ before, after }) => ({ state, commands }) => {
        const node = state.selection.$from.parent.type.name
        const attrs: Record<string, string | null> = {}
        if (before !== undefined) attrs.spaceBefore = before === null ? null : `${before}em`
        if (after !== undefined) attrs.spaceAfter = after === null ? null : `${after}em`
        return commands.updateAttributes(node, attrs)
      },
      setLineSpacing: (value) => ({ state, commands }) => {
        const node = state.selection.$from.parent.type.name
        return commands.updateAttributes(node, { lineSpacing: value })
      },
    }
  },
})
