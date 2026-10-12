// Small helpers shared by every view. User text only ever goes in through textContent
// (Privacy and security → Safe rendering rule), never innerHTML.

import { STRINGS } from './strings.js';

export function byId(id) {
  return document.getElementById(id);
}

/** Creates an element with an optional class and plain-text content. */
export function make(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

/** Fills every data-s, data-s-placeholder and data-s-label attribute from STRINGS. */
export function applyStrings(root = document) {
  root.querySelectorAll('[data-s]').forEach((element) => {
    element.textContent = STRINGS[element.dataset.s];
  });
  root.querySelectorAll('[data-s-placeholder]').forEach((element) => {
    element.placeholder = STRINGS[element.dataset.sPlaceholder];
  });
  root.querySelectorAll('[data-s-label]').forEach((element) => {
    element.setAttribute('aria-label', STRINGS[element.dataset.sLabel]);
  });
}

/** Picks one of three soft stone colours from the id, so a pebble keeps its colour. */
export function pebbleTone(id) {
  let sum = 0;
  for (const char of id) sum += char.charCodeAt(0);
  return `tone-${sum % 3}`;
}

export function makePebble(id) {
  const pebble = make('span', `pebble ${pebbleTone(id)}`);
  pebble.setAttribute('aria-hidden', 'true');
  return pebble;
}

/** A calm, polite message at the top of the screen (errors, import results). */
export function showNotice(text) {
  const notice = byId('notice');
  notice.textContent = text;
  notice.hidden = false;
}

let queuedNotice = null;

/** Keeps a message for the next screen, e.g. after Delete everything returns to Today. */
export function queueNotice(text) {
  queuedNotice = text;
}

/** On every screen change: show a queued message, or clear the old one. */
export function refreshNotice() {
  const notice = byId('notice');
  notice.textContent = queuedNotice || '';
  notice.hidden = !queuedNotice;
  queuedNotice = null;
}

/** Applies the palette: "system" follows the device, "light" and "evening" override it. */
export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

/** True when the person asked their device for less motion. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Opens a <dialog> and resolves with the data-close value of the button pressed,
 * or 'cancel' if closed with Esc. Focus returns to whatever opened it (WCAG 2.1.2).
 */
export function askDialog(id) {
  const dialog = byId(id);
  const opener = document.activeElement;
  return new Promise((resolve) => {
    const onClick = (event) => {
      const button = event.target.closest('[data-close]');
      if (button) dialog.close(button.dataset.close);
    };
    dialog.addEventListener('click', onClick);
    dialog.addEventListener('close', () => {
      dialog.removeEventListener('click', onClick);
      if (opener && document.contains(opener)) opener.focus();
      resolve(dialog.returnValue || 'cancel');
    }, { once: true });
    dialog.returnValue = '';
    dialog.showModal();
  });
}
