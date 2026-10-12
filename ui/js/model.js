// The data model: shape, validation and counting. Pure functions only (no storage, no DOM),
// so they can be tested on their own. See docs/handbook/03-design/data-model.md.

import { isValidLocalDate } from './dates.js';

export const SCHEMA_VERSION = 1;
export const MAX_TEXT = 140;
export const MAX_NEXT_STEP = 100;
export const FEELINGS = ['nervous', 'uneasy', 'dread', 'unsure', 'tense', 'sad'];
export const AREAS = ['work', 'health', 'people', 'money', 'other'];
export const STATUSES = ['open', 'didnt', 'better', 'happened', 'worse', 'letgo'];
export const THEMES = ['system', 'light', 'evening'];

const CHECKED = ['didnt', 'better', 'happened', 'worse'];
// "Better than I feared" counts as the feared outcome not happening (Data model → Derived values)
const DIDNT_HAPPEN = ['didnt', 'better'];

export function defaultSettings() {
  return { theme: 'system', breathPause: false, seenWelcome: false };
}

export function emptyDocument() {
  return { version: SCHEMA_VERSION, settings: defaultSettings(), worries: [] };
}

/** "w_" + random base-36. Collisions are checked by the caller against existing ids. */
export function newId() {
  const random = Math.random().toString(36).slice(2, 10).padEnd(8, '0');
  return `w_${random}`;
}

function isIsoTimestamp(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function isOptionalText(value, max) {
  return value === null || (typeof value === 'string' && value.trim().length >= 1
    && value.length <= max);
}

/** True if one stored worry has every required field with the right type and range. */
export function isValidWorry(w) {
  if (!w || typeof w !== 'object') return false;
  const textOk = typeof w.text === 'string' && w.text.trim().length >= 1
    && w.text.length <= MAX_TEXT;
  const resolvedOk = w.status === 'open' ? w.resolvedAt === null : isIsoTimestamp(w.resolvedAt);
  return typeof w.id === 'string' && /^w_[a-z0-9]+$/.test(w.id) && textOk
    && isIsoTimestamp(w.createdAt) && isValidLocalDate(w.checkOn)
    && (w.feeling === null || FEELINGS.includes(w.feeling))
    && isOptionalText(w.nextStep, MAX_NEXT_STEP)
    && (w.area === null || AREAS.includes(w.area))
    && STATUSES.includes(w.status) && resolvedOk;
}

/** Copies only known fields, so unknown fields in an import are ignored (threat T3). */
function cleanWorry(w) {
  return {
    id: w.id, text: w.text, createdAt: w.createdAt, checkOn: w.checkOn,
    feeling: w.feeling, nextStep: w.nextStep, area: w.area,
    status: w.status, resolvedAt: w.resolvedAt,
  };
}

function cleanSettings(s) {
  const settings = defaultSettings();
  if (!s || typeof s !== 'object') return settings;
  if (THEMES.includes(s.theme)) settings.theme = s.theme;
  if (typeof s.breathPause === 'boolean') settings.breathPause = s.breathPause;
  if (typeof s.seenWelcome === 'boolean') settings.seenWelcome = s.seenWelcome;
  return settings;
}

/** Upgrades older documents step by step (1 → 2 → 3). Only version 1 exists so far. */
export function migrate(doc) {
  if (doc.version === SCHEMA_VERSION) return doc;
  throw new Error(`Unknown schema version: ${doc.version}`);
}

/**
 * Checks a parsed document. Returns { doc, skipped } with invalid worries left out and counted,
 * or null if the document as a whole can't be used. Duplicate ids keep the first copy.
 */
export function validateDocument(raw) {
  if (!raw || typeof raw !== 'object' || !Number.isInteger(raw.version)) return null;
  if (raw.version < 1 || raw.version > SCHEMA_VERSION || !Array.isArray(raw.worries)) return null;
  const migrated = migrate(raw);
  const seen = new Set();
  const worries = [];
  let skipped = 0;
  for (const w of migrated.worries) {
    if (isValidWorry(w) && !seen.has(w.id)) {
      seen.add(w.id);
      worries.push(cleanWorry(w));
    } else {
      skipped += 1;
    }
  }
  const doc = { version: SCHEMA_VERSION, settings: cleanSettings(migrated.settings), worries };
  return { doc, skipped };
}

export function isDue(worry, today) {
  return worry.status === 'open' && worry.checkOn <= today;
}

/** The Garden's honest tally. Let-go and open pebbles are in neither number. */
export function gardenCounts(worries) {
  const checked = worries.filter((w) => CHECKED.includes(w.status)).length;
  const didntHappen = worries.filter((w) => DIDNT_HAPPEN.includes(w.status)).length;
  return { checked, didntHappen };
}

export function isChecked(worry) {
  return CHECKED.includes(worry.status);
}
