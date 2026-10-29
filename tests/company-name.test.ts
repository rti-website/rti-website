// node --test: the placeholder company names refused by the lead forms (29 Oct 2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isPlaceholderCompany } from '../src/lib/company-name.ts'

test('refuses stand-ins', () => {
  for (const v of ['TEST', 'test', ' Test ', 'TEST123', 'test 1', 'Testing', 'NA', 'N/A', 'n.a.', 'N A', 'none', 'NONE',
    'Unavailable', 'not available', 'Not Applicable', 'unknown', 'null', '-', '--', '.', '...', '/', 'x', 'aaaa', 'xxx',
    '1234', '0000', 'asdf', 'qwerty', 'Company', 'company name', 'My Company', 'self', 'Personal', 'Individual', 'Home',
    'Residential', 'n/a n/a', "don't know", 'TBD', 'abc', 'Test Company', 'test-company', 'demo'])
    assert.equal(isPlaceholderCompany(v), true, v)
})

test('lets real names through', () => {
  for (const v of ['Recycle Technologies', 'Test America', 'NA Manufacturing', 'Home Depot', 'Nathan & Sons', 'ABC Supply Co',
    '3M', 'IBM', 'GE', 'HP Inc', 'Testa Farms', 'Unknown Mortals LLC', 'Mayo Clinic', 'Hennepin County', 'XYZ Logistics',
    'Self Storage Plus', 'NAPA Auto Parts', '7-Eleven', 'A1 Recycling', 'Q2'])
    assert.equal(isPlaceholderCompany(v), false, v)
})

test('empty is left to the required rule', () => {
  assert.equal(isPlaceholderCompany(''), false)
  assert.equal(isPlaceholderCompany('   '), false)
  assert.equal(isPlaceholderCompany(null), false)
})
