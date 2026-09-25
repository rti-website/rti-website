/**
 * THE DESKTOP CANVAS ZOOM, AS A NUMBER — 25 Sep 2026.
 *
 * Asim: a friend on Safari with a 24 inch screen saw the page stop about 130px
 * short of the right edge, with white space down that side.
 *
 * What was happening: the 1920 board is scaled to the window with
 *   zoom: tan(atan2(100cqw, 1660px))
 * (globals.css). Chrome, Edge and Firefox resolve that to window / 1660.
 * Safari left the board at zoom 1: the page drew at its true 1920px, still
 * shifted 130px left by the gutter trim, so on a 1920 wide window the last
 * 130px were blank. The screenshot matches that exactly (content at x156 of
 * 1600 = zoom 1 on a 1920 window). On a MacBook's narrower window the same
 * fault only makes the page a little larger than it should be, which is why
 * it was not seen before.
 *
 * The fix does not depend on why Safari drops it: this script measures the
 * page width and hands the ratio to CSS as a plain number (--canvas-zoom on
 * <html>), which every browser has accepted in `zoom` for as long as it has
 * had `zoom`. globals.css uses the variable when it is set and falls back to
 * the old expression when it is not (script blocked), so nothing changes for
 * browsers where the old line already worked.
 *
 * It runs inline in <head>, before the body is parsed, so the first paint is
 * already at the right scale. The ResizeObserver on <html> follows window
 * resizes, browser zoom, and the scrollbar appearing once the page is long
 * enough (the width that 100cqw measured, and what this measures, both
 * exclude it). The value is only written when it changes.
 */

/** The part of the 1920 board shown across the window: 1920 minus
 *  --canvas-inset (130, globals.css) on each side. Change both together. */
export const CANVAS_VISIBLE_W = 1920 - 2 * 130

export const canvasZoomScript = `(function(){try{var d=document.documentElement,v='';function s(){var w=d.getBoundingClientRect().width;if(!(w>0))return;var z=String(w/${CANVAS_VISIBLE_W});if(z!==v){v=z;d.style.setProperty('--canvas-zoom',z)}}s();if(window.ResizeObserver){new ResizeObserver(s).observe(d)}else{window.addEventListener('resize',s)}}catch(e){}})()`
