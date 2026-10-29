/**
 * PLACEHOLDER COMPANY NAMES (29 Oct 2026, Anees via Aaqib: "put a validity
 * check, no one should write test, NA, unavailable etc. in company name").
 *
 * isPlaceholderCompany() is true for a value someone typed only to get past
 * the required field: "TEST", "N/A", "unavailable", "none", "asdf", "-",
 * "1111" and the like. The contact, quote and pickup forms (ContactForm,
 * PickupForm) refuse it in the browser and /api/leads refuses it again on the
 * server, with the same message (FORM.errors.companyInvalid).
 *
 * Pure and dependency free on purpose: the browser bundle, the route handler
 * and the node:test file (company-name.test.ts) all import it.
 *
 * Deliberately narrow. A word on the list only fails when it is the WHOLE
 * name (after case, punctuation and spacing are ignored), so "Test America",
 * "NA Manufacturing" or "Home Depot" still go through. Add to the list, do not
 * turn it into a "contains" match.
 */

/** Whole names that are never a real company, compared after normalise(). */
const PLACEHOLDERS = new Set([
  // test entries
  'test', 'tests', 'testing', 'tester', 'test test', 'testtest', 'test company', 'testcompany',
  'test co', 'test inc', 'test llc', 'test corp', 'test business', 'demo', 'sample', 'example',
  'dummy', 'fake', 'placeholder',
  // not applicable / none
  'na', 'n a', 'nan', 'n a a', 'none', 'non', 'nil', 'null', 'nul', 'no', 'nope', 'nothing',
  'no company', 'nocompany', 'no business', 'no name', 'not available', 'notavailable',
  'unavailable', 'not applicable', 'notapplicable', 'not applicable n a', 'unknown', 'unk',
  'tbd', 'tba', 'pending', 'idk', 'dont know', 'do not know', 'not sure', 'nil company',
  'does not apply', 'doesnt apply', 'not relevant', 'skip',
  // no company because it is a person
  'private', 'personal', 'person', 'self', 'myself', 'me', 'mine', 'individual', 'home',
  'homeowner', 'resident', 'residential', 'citizen', 'retired', 'unemployed',
  // the label typed back
  'company', 'company name', 'companyname', 'my company', 'mycompany', 'your company',
  'business', 'business name', 'my business', 'organization', 'organisation', 'name',
  // keyboard mashing and filler
  'abc', 'abcd', 'xyz', 'asd', 'asdf', 'asdfg', 'asdfgh', 'qwe', 'qwerty', 'zxc', 'blah',
  'blah blah', 'hello', 'hi', 'ok', 'okay', 'yes', 'other', 'any', 'anything', 'whatever',
  'something', 'etc', 'xx', 'xxx', 'xxxx', 'none of your business',
])

/** Lower case, punctuation to spaces, one space between words. */
export function normaliseCompany(raw: string): string {
  return raw
    .normalize('NFKD')
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** True when `raw` is a stand-in rather than a company name. Empty is not checked here (required is a separate rule). */
export function isPlaceholderCompany(raw: string | null | undefined): boolean {
  if (typeof raw !== 'string' || raw.trim() === '') return false
  const n = normaliseCompany(raw)
  // Nothing but punctuation ("-", "...", "/"), or a single character.
  if (n.replace(/ /g, '').length < 2) return true
  // No letter at all ("123", "0000").
  if (!/[a-z]/.test(n)) return true
  // One character repeated ("aaaa", "x x x").
  if (/^(.)\1*$/.test(n.replace(/ /g, ''))) return true
  // "test1", "test 123", "testing2".
  if (/^(test|testing|tester|demo|sample)\s*\d*$/.test(n)) return true
  if (PLACEHOLDERS.has(n)) return true
  // The same stand-in typed twice or more ("n/a n/a", "test test test").
  const words = n.split(' ')
  for (let size = 1; size <= words.length / 2; size++) {
    if (words.length % size) continue
    const unit = words.slice(0, size).join(' ')
    if (!PLACEHOLDERS.has(unit) && unit.replace(/ /g, '') !== 'na') continue
    if (words.every((w, i) => w === words[i % size])) return true
  }
  return false
}

/** The message shown when it is refused; FORM.errors.companyInvalid overrides it. */
export const COMPANY_INVALID_MESSAGE = 'Please enter your real company name.'
