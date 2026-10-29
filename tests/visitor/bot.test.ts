// node --test: bot filter and device type (user agent only, no fingerprinting).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { deviceType, isBotUserAgent } from '../../src/lib/visitor/bot.ts'

const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
const IPAD = 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
const ANDROID_TAB = 'Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

test('crawlers and scripts are bots', () => {
  for (const ua of [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    'Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0 Safari/537.36',
    'facebookexternalhit/1.1', 'GPTBot/1.1', 'ClaudeBot/1.0', 'curl/8.4.0', 'python-requests/2.31.0', '', 'x',
  ]) assert.equal(isBotUserAgent(ua), true, ua)
})

test('browsers are not bots', () => {
  for (const ua of [CHROME, IPHONE, IPAD, ANDROID_TAB]) assert.equal(isBotUserAgent(ua), false, ua)
})

test('device type', () => {
  assert.equal(deviceType(CHROME), 'desktop')
  assert.equal(deviceType(IPHONE), 'mobile')
  assert.equal(deviceType(IPAD), 'tablet')
  assert.equal(deviceType(ANDROID_TAB), 'tablet')
})
