// Storage: the only module that knows where data lives.
// In the desktop app it asks Rust (src-tauri/src/storage.rs) to read and write a file on disk.
// In a plain browser preview (python -m http.server) it falls back to localStorage, so the
// interface can be tried and tested without building the app (Dev environment).

import { emptyDocument, validateDocument } from './model.js';
import { todayLocal } from './dates.js';

export const STORAGE_KEY = 'pebble.v1';

/** The Tauri bridge, present only inside the desktop app. */
function tauri() {
  return window.__TAURI__ ? window.__TAURI__.core : null;
}

export function isDesktop() {
  return tauri() !== null;
}

/** Asks Rust to run one command. Errors are logged for developers, never shown raw. */
async function call(command, args = {}) {
  return tauri().invoke(command, args);
}

async function readRaw() {
  if (isDesktop()) return call('load_document');
  return localStorage.getItem(STORAGE_KEY);
}

/** Keeps an unreadable copy under its own name. Never silently delete (Architecture). */
async function keepCorruptCopy(rawText) {
  try {
    if (isDesktop()) await call('keep_corrupt_copy', { text: rawText });
    else localStorage.setItem(`pebble.corrupt.${todayLocal()}`, rawText);
  } catch (error) {
    console.warn('Pebble could not keep a copy of unreadable data', error);
  }
}

/**
 * Loads the saved document. Resolves to { doc, problem, skipped } where problem is
 * null, 'corrupt' (couldn't read, started fresh) or 'unavailable' (storage blocked).
 */
export async function load() {
  let rawText;
  try {
    rawText = await readRaw();
  } catch (error) {
    console.warn('Pebble could not read its saved data', error);
    return { doc: emptyDocument(), problem: 'unavailable', skipped: 0 };
  }
  if (rawText === null || rawText === undefined) {
    return { doc: emptyDocument(), problem: null, skipped: 0 };
  }
  let result = null;
  try {
    result = validateDocument(JSON.parse(rawText));
  } catch (error) {
    console.warn('Pebble found saved data it could not parse', error);
  }
  if (!result) {
    await keepCorruptCopy(rawText);
    return { doc: emptyDocument(), problem: 'corrupt', skipped: 0 };
  }
  if (result.skipped > 0) await keepCorruptCopy(rawText);
  return { doc: result.doc, problem: null, skipped: result.skipped };
}

/** Saves the whole document. Resolves to false if it couldn't be saved. */
export async function save(doc) {
  const text = JSON.stringify(doc);
  try {
    if (isDesktop()) await call('save_document', { text });
    else localStorage.setItem(STORAGE_KEY, text);
    return true;
  } catch (error) {
    console.warn('Pebble could not save', error);
    return false;
  }
}

/** Removes everything Pebble saved, including kept copies (U6). */
export async function clearAll() {
  try {
    if (isDesktop()) {
      await call('delete_everything');
      return true;
    }
    Object.keys(localStorage).filter((key) => key.startsWith('pebble.'))
      .forEach((key) => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.warn('Pebble could not delete its data', error);
    return false;
  }
}

/** Desktop: native "Save as" dialog. Resolves to true if saved, false if cancelled. */
export async function exportFile(text, fileName) {
  return call('export_backup', { text, fileName });
}

/** Desktop: native "Open" dialog. Resolves to the file's text, or null if cancelled. */
export async function importFile() {
  return call('import_backup');
}

/** Desktop: opens one of the fixed help links in the person's own browser. */
export async function openLink(which) {
  return call('open_link', { which });
}
