// Today (and the first-run welcome shown in its place). Screens → 1. Today, First run.

import { STRINGS } from '../strings.js';
import { byId, make, makePebble } from '../dom.js';
import { todayLocal, relativeDayLabel } from '../dates.js';
import * as state from '../state.js';

const MAX_READY = 3; // Screens: max 3 ready pebbles shown before "and N more"
const MAX_RESTING = 5; // Screens: max 5 resting pebbles before collapsing
const WELCOME_CARDS = ['welcomeCard1', 'welcomeCard2', 'welcomeCard3'];

let readyExpanded = false;
let restingExpanded = false;
let welcomeIndex = 0;
let arrivedId = null; // the pebble just set down, so it can fade in (Motion → Save a pebble)

export function markArrived(id) {
  arrivedId = id;
}

/** Collapses the lists again whenever the person comes back to Today. */
export function resetToday() {
  readyExpanded = false;
  restingExpanded = false;
}

function greeting(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) return STRINGS.greetingMorning;
  if (hour < 18) return STRINGS.greetingAfternoon;
  return STRINGS.greetingEvening;
}

function statusLine(dueCount, restingCount) {
  if (dueCount === 1) return STRINGS.todayDueOne;
  if (dueCount > 1) return STRINGS.todayDueMany(dueCount);
  return restingCount > 0 ? STRINGS.todayResting : STRINGS.todayEmpty;
}

/** One pebble card. Ready pebbles are links to their check-back; resting ones are plain. */
function makeCard(worry, subline, isReady) {
  const item = make('li');
  const card = make(isReady ? 'a' : 'div', isReady ? 'card card-link' : 'card');
  if (isReady) card.href = `#check/${worry.id}`;
  if (worry.id === arrivedId) card.classList.add('arrive');
  const body = make('span', 'card-body');
  body.append(make('span', 'card-text', worry.text), make('span', 'soft small', subline));
  if (worry.nextStep) body.append(make('span', 'soft small next-step', worry.nextStep));
  card.append(makePebble(worry.id), body);
  item.append(card);
  return item;
}

/** Fills a list, showing `max` cards unless expanded, with a quiet "And two more" toggle. */
function fillList(listId, moreId, cards, max, isExpanded) {
  const list = byId(listId);
  const more = byId(moreId);
  list.replaceChildren(...(isExpanded ? cards : cards.slice(0, max)));
  const hiddenCount = cards.length - max;
  more.hidden = hiddenCount <= 0;
  more.textContent = isExpanded ? STRINGS.showFewer : STRINGS.showMore(hiddenCount);
  more.setAttribute('aria-expanded', String(isExpanded));
}

export function renderToday() {
  const today = todayLocal();
  const due = state.dueWorries(today);
  const resting = state.restingWorries(today);
  const labels = { today: STRINGS.readyWhenYouAre, tomorrow: STRINGS.chipTomorrow,
    nextWeek: STRINGS.nextWeek };
  byId('greeting').textContent = greeting();
  byId('today-status').textContent = statusLine(due.length, resting.length);
  // SVG elements have no .hidden property, so set the attribute directly
  byId('today-pond').toggleAttribute('hidden', due.length + resting.length > 0);
  byId('today-ready').hidden = due.length === 0;
  byId('today-resting').hidden = resting.length === 0;
  fillList('ready-list', 'ready-more',
    due.map((w) => makeCard(w, STRINGS.readyWhenYouAre, true)), MAX_READY, readyExpanded);
  fillList('resting-list', 'resting-more',
    resting.map((w) => makeCard(w, relativeDayLabel(w.checkOn, today, labels), false)),
    MAX_RESTING, restingExpanded);
  arrivedId = null;
}

export function renderWelcome() {
  const isLast = welcomeIndex === WELCOME_CARDS.length - 1;
  byId('welcome-step').textContent = STRINGS.welcomeStep(welcomeIndex + 1);
  byId('welcome-text').textContent = STRINGS[WELCOME_CARDS[welcomeIndex]];
  byId('welcome-soft').textContent = STRINGS.welcomeTrauma;
  byId('welcome-soft').hidden = !isLast;
  byId('welcome-help').hidden = !isLast;
  byId('welcome-next').textContent = isLast ? STRINGS.begin : STRINGS.next;
}

/** Wires the buttons once. `onBegin` runs after the last welcome card. */
export function setupToday({ onBegin }) {
  byId('ready-more').addEventListener('click', () => {
    readyExpanded = !readyExpanded;
    renderToday();
  });
  byId('resting-more').addEventListener('click', () => {
    restingExpanded = !restingExpanded;
    renderToday();
  });
  byId('welcome-next').addEventListener('click', () => {
    if (welcomeIndex < WELCOME_CARDS.length - 1) {
      welcomeIndex += 1;
      renderWelcome(); // focus stays on Next; the new text is announced politely
      return;
    }
    welcomeIndex = 0;
    onBegin();
  });
}
