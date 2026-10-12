// Settings and About (U6, U9; Screens → 6 and 7). The person owns everything (Principle 7).

import { STRINGS } from '../strings.js';
import { byId, applyTheme, askDialog, showNotice } from '../dom.js';
import { todayLocal } from '../dates.js';
import { validateDocument } from '../model.js';
import * as storage from '../storage.js';
import * as state from '../state.js';

const MAX_IMPORT_BYTES = 5 * 1024 * 1024; // threat T3: refuse oversized "backups"

export function renderSettings() {
  const settings = state.getSettings();
  byId('palette-chips').querySelectorAll('button').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.themeChoice === settings.theme));
  });
  byId('breath-switch').setAttribute('aria-checked', String(settings.breathPause));
}

export function renderAbout(version) {
  byId('version-line').textContent = STRINGS.versionLine(version);
}

function choosePalette(theme) {
  applyTheme(theme);
  state.updateSettings({ theme });
}

function toggleBreath() {
  state.updateSettings({ breathPause: !state.getSettings().breathPause });
}

/** Browser preview only: downloads the file through a temporary link. */
function downloadInBrowser(json, fileName) {
  const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Saves everything as readable JSON: pebble-backup-YYYY-MM-DD.json (U6). */
async function exportBackup() {
  await state.settled(); // the backup should include the latest change
  const json = JSON.stringify(state.getDocument(), null, 2);
  const fileName = `pebble-backup-${todayLocal()}.json`;
  if (!storage.isDesktop()) {
    downloadInBrowser(json, fileName);
    return;
  }
  try {
    if (await storage.exportFile(json, fileName)) showNotice(STRINGS.exportDone);
  } catch (error) {
    console.warn('Pebble could not export', error);
    showNotice(STRINGS.exportFailed);
  }
}

/** Checks a backup's text. Returns the validation result, or null if unusable. */
function readBackupText(text) {
  if (typeof text !== 'string' || text.length > MAX_IMPORT_BYTES) return null;
  try {
    return validateDocument(JSON.parse(text));
  } catch (error) {
    console.warn('Pebble could not read the chosen file', error);
    return null;
  }
}

/** Shows "This will replace N pebbles with M pebbles" and waits for a choice (U6). */
async function confirmImport(result) {
  const current = state.getWorries().length;
  byId('dialog-import-text').textContent =
    STRINGS.importConfirm(current, result.doc.worries.length);
  const skippedLine = byId('dialog-import-skipped');
  skippedLine.hidden = result.skipped === 0;
  skippedLine.textContent = result.skipped ? STRINGS.importSkipped(result.skipped) : '';
  return (await askDialog('dialog-import')) === 'replace';
}

/** Validates, asks, then replaces. An unreadable file changes nothing. */
async function importText(text) {
  const result = readBackupText(text);
  if (!result) {
    showNotice(STRINGS.importInvalid);
    return;
  }
  if (!(await confirmImport(result))) return;
  state.replaceDocument(result.doc);
  applyTheme(result.doc.settings.theme);
  showNotice(STRINGS.importDone);
}

async function chooseBackup() {
  if (!storage.isDesktop()) {
    byId('import-file').click();
    return;
  }
  try {
    const text = await storage.importFile();
    if (text !== null) await importText(text);
  } catch (error) {
    console.warn('Pebble could not open the file', error);
    showNotice(STRINGS.importInvalid);
  }
}

/** Browser preview only: the hidden file input. */
async function onFileChosen(event) {
  const input = event.target;
  const file = input.files[0];
  input.value = ''; // lets the same file be chosen again later
  if (!file || file.size > MAX_IMPORT_BYTES) {
    showNotice(STRINGS.importInvalid);
    return;
  }
  await importText(await file.text());
}

async function deleteEverything(onDeleted) {
  if ((await askDialog('dialog-delete')) !== 'delete') return;
  await state.deleteEverything();
  applyTheme('system');
  onDeleted();
}

export function setupSettings({ onDeleted }) {
  byId('palette-chips').addEventListener('click', (event) => {
    const chip = event.target.closest('button');
    if (chip) choosePalette(chip.dataset.themeChoice);
  });
  byId('breath-switch').addEventListener('click', toggleBreath);
  byId('export').addEventListener('click', exportBackup);
  byId('import').addEventListener('click', chooseBackup);
  byId('import-file').addEventListener('change', onFileChosen);
  byId('delete').addEventListener('click', () => deleteEverything(onDeleted));
}
