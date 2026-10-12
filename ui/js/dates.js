// Date helpers. Pebble stores check-back days as local "YYYY-MM-DD" strings (ADR-008).
// Never compare dates with toISOString(): it uses UTC and shifts the day near midnight.

const DAY_MS = 24 * 60 * 60 * 1000;
const LOCAL_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Formats a Date's local calendar day as YYYY-MM-DD. */
export function toLocalDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Returns today's date as YYYY-MM-DD in the user's local timezone. */
export function todayLocal(now = new Date()) {
  return toLocalDateString(now);
}

/** Turns "YYYY-MM-DD" into a Date at local noon (noon avoids daylight-saving edge cases). */
export function parseLocalDate(text) {
  const match = LOCAL_DATE.exec(text);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12);
  // Reject impossible days such as 2026-02-31, which Date would silently roll over
  return toLocalDateString(date) === text ? date : null;
}

export function isValidLocalDate(text) {
  return typeof text === 'string' && parseLocalDate(text) !== null;
}

/** Adds whole calendar days to a "YYYY-MM-DD" string. */
export function addDays(localDate, days) {
  const date = parseLocalDate(localDate);
  date.setDate(date.getDate() + days);
  return toLocalDateString(date);
}

/** The latest allowed check-back day: one year ahead (U2). */
export function maxCheckDate(today) {
  const date = parseLocalDate(today);
  date.setFullYear(date.getFullYear() + 1);
  return toLocalDateString(date);
}

/** Whole calendar days from one local date to another (positive if `to` is later). */
export function daysBetween(from, to) {
  return Math.round((parseLocalDate(to) - parseLocalDate(from)) / DAY_MS);
}

/** The local calendar day on which an ISO timestamp happened. */
export function localDateOfTimestamp(iso) {
  return toLocalDateString(new Date(iso));
}

/** "12 November", plus the year when it isn't this year (Content and voice, rule 7). */
export function fullDateLabel(localDate, today) {
  const date = parseLocalDate(localDate);
  const sameYear = localDate.slice(0, 4) === today.slice(0, 4);
  const options = sameYear ? { day: 'numeric', month: 'long' }
    : { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

/** Relative label for a future check-back day: Tomorrow, Saturday, Next week, 12 November. */
export function relativeDayLabel(localDate, today, labels) {
  const days = daysBetween(today, localDate);
  if (days <= 0) return labels.today;
  if (days === 1) return labels.tomorrow;
  if (days < 7) return parseLocalDate(localDate).toLocaleDateString('en-GB', { weekday: 'long' });
  if (days < 14) return labels.nextWeek;
  return fullDateLabel(localDate, today);
}
