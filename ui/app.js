// Pebble: entry point. Loads state, fills in the words, and shows one screen per route.
// Modules: storage (js/storage.js) → state (js/state.js) → views (js/views/) ← router (js/router.js)

import { STRINGS } from './js/strings.js';
import { byId, applyStrings, applyTheme, queueNotice, refreshNotice, showNotice }
  from './js/dom.js';
import { isDesktop, openLink } from './js/storage.js';
import { startRouter, go } from './js/router.js';
import * as state from './js/state.js';
import { renderToday, renderWelcome, resetToday, markArrived, setupToday }
  from './js/views/today.js';
import { showNewWorry, setupNewWorry } from './js/views/new-worry.js';
import { showBreath, showCheckBack, leaveCheckBack, setupCheckBack }
  from './js/views/check-back.js';
import { renderGarden } from './js/views/garden.js';
import { renderSettings, renderAbout, setupSettings } from './js/views/settings.js';

export const VERSION = '0.1.0'; // single source for the version (Versioning)

const SCREEN_TITLES = {
  welcome: STRINGS.titleWelcome, today: STRINGS.titleToday, new: STRINGS.titleNew,
  breath: STRINGS.titleBreath, check: STRINGS.titleCheck, garden: STRINGS.titleGarden,
  settings: STRINGS.titleSettings, about: STRINGS.titleAbout,
};
const SCREENS_WITHOUT_NAV = ['welcome', 'new', 'breath'];

let currentRoute = { name: '', id: null };
let breathDoneFor = null; // the pebble whose breath pause is finished, so it isn't repeated

/** Shows one screen, updates the title and nav, and moves focus to its heading (Accessibility). */
function showScreen(name, focusTarget = null) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.hidden = screen.id !== `screen-${name}`;
  });
  document.title = STRINGS.pageTitle(SCREEN_TITLES[name]);
  document.querySelector('.nav').hidden = SCREENS_WITHOUT_NAV.includes(name);
  document.querySelectorAll('.nav a').forEach((link) => {
    const isCurrent = link.dataset.route === name || (name === 'about'
      && link.dataset.route === 'settings');
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const screen = byId(`screen-${name}`);
  (focusTarget || screen.querySelector('h1')).focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

/** A check-back can open only for a pebble that's still waiting. Otherwise go home quietly. */
function showCheckRoute(id) {
  const worry = state.findWorry(id);
  if (!worry || worry.status !== 'open') {
    go('today');
    return;
  }
  if (state.getSettings().breathPause && breathDoneFor !== id) {
    showScreen('breath');
    showBreath();
    return;
  }
  showCheckBack(id);
  showScreen('check');
}

function showRoute(route) {
  if (route.name !== 'check') leaveCheckBack();
  if (route.name !== 'check') breathDoneFor = null;
  if (route.name === 'today') resetToday();
  refreshNotice();
  currentRoute = route;
  if (route.name === 'today' && !state.getSettings().seenWelcome) {
    renderWelcome();
    showScreen('welcome');
  } else if (route.name === 'today') {
    renderToday();
    showScreen('today');
  } else if (route.name === 'new') {
    showScreen('new', byId('worry-text'));
    showNewWorry();
  } else if (route.name === 'check') {
    showCheckRoute(route.id);
  } else {
    renderStatic(route.name);
    showScreen(route.name);
  }
}

function renderStatic(name) {
  if (name === 'garden') renderGarden();
  if (name === 'settings') renderSettings();
  if (name === 'about') renderAbout(VERSION);
}

/** Re-draws list screens after data changes. Task screens manage their own updates. */
function onDataChange() {
  if (currentRoute.name === 'today' && state.getSettings().seenWelcome) renderToday();
  if (currentRoute.name === 'garden') renderGarden();
  if (currentRoute.name === 'settings') renderSettings();
}

function wireViews() {
  setupToday({
    onBegin: () => {
      state.updateSettings({ seenWelcome: true });
      renderToday();
      showScreen('today');
    },
  });
  setupNewWorry({ onSaved: markArrived });
  setupCheckBack({
    onBreathDone: () => {
      breathDoneFor = currentRoute.id;
      showCheckRoute(currentRoute.id);
    },
  });
  setupSettings({
    onDeleted: () => {
      queueNotice(STRINGS.deleted);
      go('today');
    },
  });
}

/** In the desktop app, outside links open in the person's own browser via Rust (fixed list). */
function wireOutsideLinks() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-link]');
    if (!link || !isDesktop()) return;
    event.preventDefault();
    openLink(link.dataset.link).catch((error) => console.warn('Could not open link', error));
  });
}

/** Ctrl+N (Cmd+N on macOS) sets a new pebble down from anywhere: fast capture (U1). */
function wireShortcuts() {
  document.addEventListener('keydown', (event) => {
    const isNew = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n';
    if (isNew && state.getSettings().seenWelcome && !document.querySelector('dialog[open]')) {
      event.preventDefault();
      go('new');
    }
  });
}

async function start() {
  const { problem, skipped } = await state.init();
  applyStrings();
  applyTheme(state.getSettings().theme);
  if (problem === 'corrupt') queueNotice(STRINGS.corruptNotice);
  if (problem === 'unavailable') queueNotice(STRINGS.storageError);
  if (skipped > 0) queueNotice(STRINGS.skippedOnLoad(skipped));
  state.onChange(onDataChange);
  state.onSaveFailure(() => showNotice(STRINGS.storageError));
  wireViews();
  wireOutsideLinks();
  wireShortcuts();
  startRouter(showRoute);
}

start();
