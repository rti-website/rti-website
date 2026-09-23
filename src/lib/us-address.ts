/**
 * US address helpers shared by the contact form (browser) and /api/leads and
 * /api/zip (server). No data file here — the ZIP table is server only, in
 * src/lib/zips.ts — so this stays a few hundred bytes in the form's bundle.
 */

/** The 50 states and DC: postal abbreviation, name. */
export const US_STATES: ReadonlyArray<readonly [string, string]> = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'],
  ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'],
  ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
  ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'],
  ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'], ['SD', 'South Dakota'],
  ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'],
  ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
]

/** "mn", "MN", "Minnesota", " minnesota " -> "MN". Anything else -> null. */
export function stateCode(input: string): string | null {
  const s = input.trim().replace(/\.$/, '').toLowerCase()
  if (!s) return null
  for (const [code, name] of US_STATES) {
    if (s === code.toLowerCase() || s === name.toLowerCase()) return code
  }
  return null
}

/**
 * A city name reduced to what matters for comparing two spellings of it:
 * "St. Paul", "Saint Paul" and "saint  paul" are the same key, as are
 * "Fort Worth" / "Ft Worth" and "Coeur d'Alene" / "Coeur dAlene".
 */
export function cityKey(input: string): string {
  return input
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[.'’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => ({ saint: 'st', sainte: 'ste', fort: 'ft', mount: 'mt' } as Record<string, string>)[w] ?? w)
    .join(' ')
}
