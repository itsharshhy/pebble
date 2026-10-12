// In-browser tests for pure functions (Test strategy, layer 1). No libraries.
// Open tests/index.html through the local server: green means pass.
// The same file also runs in Node for quick checks: `node tests/tests.js`.

import {
  todayLocal, addDays, parseLocalDate, isValidLocalDate, daysBetween, maxCheckDate,
  relativeDayLabel, fullDateLabel,
} from '../ui/js/dates.js';
import {
  isValidWorry, validateDocument, gardenCounts, isDue, emptyDocument, newId,
} from '../ui/js/model.js';
import { STRINGS, numberWord } from '../ui/js/strings.js';
import { parseHash } from '../ui/js/router.js';

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, message: error.message });
  }
}

function assert(condition, message = 'assertion failed') {
  if (!condition) throw new Error(message);
}

function equal(actual, expected) {
  assert(actual === expected, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function worry(overrides = {}) {
  return {
    id: 'w_abc123', text: 'The presentation will go badly', createdAt: '2026-10-13T21:04:00.000Z',
    checkOn: '2026-10-16', feeling: null, nextStep: null, area: null, status: 'open',
    resolvedAt: null, ...overrides,
  };
}

// ---------- Dates (ADR-008) ----------
test('todayLocal returns YYYY-MM-DD', () => {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(todayLocal()));
});
test('todayLocal uses the local calendar late at night and just after midnight', () => {
  equal(todayLocal(new Date(2026, 9, 13, 23, 30)), '2026-10-13');
  equal(todayLocal(new Date(2026, 9, 14, 0, 30)), '2026-10-14');
});
test('addDays crosses months and years', () => {
  equal(addDays('2026-10-30', 3), '2026-11-02');
  equal(addDays('2026-12-31', 1), '2027-01-01');
  equal(addDays('2028-02-28', 1), '2028-02-29');
});
test('addDays is not shifted by daylight-saving changes', () => {
  equal(addDays('2026-03-07', 3), '2026-03-10');
  equal(addDays('2026-10-24', 7), '2026-10-31');
});
test('impossible dates are rejected', () => {
  equal(parseLocalDate('2026-02-31'), null);
  assert(!isValidLocalDate('2026-13-01'));
  assert(!isValidLocalDate('16/10/2026'));
  assert(isValidLocalDate('2026-10-16'));
});
test('daysBetween counts calendar days', () => {
  equal(daysBetween('2026-10-13', '2026-10-16'), 3);
  equal(daysBetween('2026-10-16', '2026-10-13'), -3);
  equal(daysBetween('2026-03-01', '2026-04-01'), 31);
});
test('the latest check-back day is one year ahead', () => {
  equal(maxCheckDate('2026-10-13'), '2027-10-13');
});
test('relative labels: tomorrow, weekday, next week, full date', () => {
  const labels = { today: 'Ready', tomorrow: 'Tomorrow', nextWeek: 'Next week' };
  equal(relativeDayLabel('2026-10-14', '2026-10-13', labels), 'Tomorrow');
  equal(relativeDayLabel('2026-10-17', '2026-10-13', labels), 'Saturday');
  equal(relativeDayLabel('2026-10-21', '2026-10-13', labels), 'Next week');
  equal(relativeDayLabel('2026-11-12', '2026-10-13', labels), '12 November');
  equal(fullDateLabel('2027-01-05', '2026-10-13'), '5 January 2027');
});

// ---------- Validation (Data model) ----------
test('a complete worry is valid', () => {
  assert(isValidWorry(worry()));
  assert(isValidWorry(worry({ status: 'didnt', resolvedAt: '2026-10-16T10:00:00.000Z' })));
});
test('invalid worries are rejected', () => {
  assert(!isValidWorry(worry({ text: '   ' })));
  assert(!isValidWorry(worry({ text: 'x'.repeat(141) })));
  assert(!isValidWorry(worry({ status: 'overdue' })));
  assert(!isValidWorry(worry({ feeling: 'angry' })));
  assert(!isValidWorry(worry({ checkOn: '2026-02-31' })));
  assert(!isValidWorry(worry({ status: 'didnt', resolvedAt: null })));
  assert(!isValidWorry(worry({ nextStep: 'y'.repeat(101) })));
});
test('a document with a wrong version or no worries list is refused', () => {
  equal(validateDocument({ version: 99, worries: [] }), null);
  equal(validateDocument({ version: 1 }), null);
  equal(validateDocument('hello'), null);
  equal(validateDocument(null), null);
});
test('invalid worries are skipped and counted, not silently dropped', () => {
  const result = validateDocument({ version: 1, settings: {}, worries: [worry(), { text: 1 }] });
  equal(result.doc.worries.length, 1);
  equal(result.skipped, 1);
});
test('duplicate ids keep the first copy', () => {
  const result = validateDocument({ version: 1, worries: [worry(), worry({ text: 'Copy' })] });
  equal(result.doc.worries.length, 1);
  equal(result.doc.worries[0].text, 'The presentation will go badly');
  equal(result.skipped, 1);
});
test('unknown fields are ignored and bad settings fall back to defaults', () => {
  const result = validateDocument({
    version: 1, settings: { theme: 'neon', breathPause: 'yes', extra: 1 },
    worries: [worry({ secret: '<script>' })],
  });
  equal(result.doc.worries[0].secret, undefined);
  equal(result.doc.settings.theme, 'system');
  equal(result.doc.settings.breathPause, false);
  equal(result.doc.settings.extra, undefined);
});
test('script-like text stays as plain text data', () => {
  const text = '<img src=x onerror=alert(1)>';
  const result = validateDocument({ version: 1, worries: [worry({ text })] });
  equal(result.doc.worries[0].text, text);
});
test('an empty document round-trips through validation', () => {
  const result = validateDocument(JSON.parse(JSON.stringify(emptyDocument())));
  equal(result.doc.worries.length, 0);
  equal(result.skipped, 0);
});
test('new ids have the w_ format', () => {
  assert(/^w_[a-z0-9]{8}$/.test(newId()));
});

// ---------- Garden maths (U5, manual checklist dataset) ----------
test('let-go pebbles are excluded from the Garden', () => {
  const g = gardenCounts([{ status: 'didnt' }, { status: 'letgo' }, { status: 'happened' }]);
  assert(g.checked === 2 && g.didntHappen === 1);
});
test('known dataset: 4 didnt, 1 better, 2 happened, 3 letgo, 2 open shows 5 of 7', () => {
  const statuses = ['didnt', 'didnt', 'didnt', 'didnt', 'better', 'happened', 'happened',
    'letgo', 'letgo', 'letgo', 'open', 'open'];
  const g = gardenCounts(statuses.map((status) => ({ status })));
  equal(g.didntHappen, 5);
  equal(g.checked, 7);
});
test('"worse" counts as checked but not as didn\'t happen', () => {
  const g = gardenCounts([{ status: 'worse' }, { status: 'better' }]);
  assert(g.checked === 2 && g.didntHappen === 1);
});
test('a pebble is due on its day and after, and only while open', () => {
  assert(isDue(worry(), '2026-10-16'));
  assert(isDue(worry(), '2026-10-20'));
  assert(!isDue(worry(), '2026-10-15'));
  assert(!isDue(worry({ status: 'letgo', resolvedAt: '2026-10-16T10:00:00.000Z' }), '2026-10-20'));
});

// ---------- Words (Content and voice) ----------
test('numbers one to nine are words, 10 and up are digits', () => {
  equal(numberWord(3), 'three');
  equal(numberWord(12), '12');
  equal(STRINGS.todayDueMany(3), 'Three pebbles are ready when you are.');
  equal(STRINGS.writtenAgo(3, ''), 'Three days ago you wrote');
  equal(STRINGS.writtenAgo(20, '12 November'), 'On 12 November you wrote');
  equal(STRINGS.importConfirm(1, 12), 'This will replace one pebble with 12 pebbles.');
});
test('no string uses an exclamation mark, emoji or the word "overdue"', () => {
  const texts = [];
  const collect = (value) => {
    if (typeof value === 'string') texts.push(value);
    else if (typeof value === 'function') texts.push(String(value(2, '1 May')));
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  };
  collect(STRINGS);
  texts.forEach((text) => {
    assert(!text.includes('!'), `"${text}" has an exclamation mark`);
    assert(!/\p{Extended_Pictographic}/u.test(text), `"${text}" has an emoji`);
    assert(!/overdue|you missed/i.test(text), `"${text}" uses guilt words`);
  });
});

// ---------- Router (N2: ids only in the hash) ----------
test('routes are parsed, unknown ones go to Today', () => {
  equal(parseHash('#garden').name, 'garden');
  equal(parseHash('#check/w_abc123').id, 'w_abc123');
  equal(parseHash('#check/<script>').name, 'today');
  equal(parseHash('').name, 'today');
});

// ---------- Report ----------
const failed = results.filter((r) => !r.ok);
const summary = `${results.length - failed.length} of ${results.length} tests passed`;
if (typeof document !== 'undefined') {
  document.getElementById('summary').textContent = summary;
  const list = document.getElementById('results');
  results.forEach((r) => {
    const item = document.createElement('li');
    item.textContent = `${r.ok ? 'Pass' : 'Fail'}: ${r.name}${r.ok ? '' : ` (${r.message})`}`;
    item.dataset.ok = String(r.ok);
    list.append(item);
  });
} else {
  results.filter((r) => !r.ok).forEach((r) => console.error(`Fail: ${r.name}: ${r.message}`));
  console.warn(summary);
  if (failed.length) process.exitCode = 1;
}
