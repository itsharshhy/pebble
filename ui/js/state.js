// State: the worries in memory, and the only place that changes them.
// Data flows one way: action → state changes → storage saves → views re-render (Architecture).

import * as storage from './storage.js';
import { newId, isDue, emptyDocument, MAX_TEXT, MAX_NEXT_STEP, FEELINGS } from './model.js';
import { todayLocal } from './dates.js';

let doc = null;
let lastChange = null; // remembers the previous status so Undo can restore it (U13)
const listeners = [];
let saveQueue = Promise.resolve(); // saves run one after another, never out of order
let onSaveFailed = () => {};

export const UNDO_MS = 8000;

/** Loads saved data once at start-up. Returns any problem so the view can explain it calmly. */
export async function init() {
  const result = await storage.load();
  doc = result.doc;
  return { problem: result.problem, skipped: result.skipped };
}

/** The app shows a calm message if a save ever fails (Architecture → Error handling). */
export function onSaveFailure(handler) {
  onSaveFailed = handler;
}

/** Views call this to re-render after every change. */
export function onChange(listener) {
  listeners.push(listener);
}

/**
 * Tells the views right away (under 100 ms, N3), then saves in the background.
 * A snapshot is saved so later changes can't sneak into an earlier save.
 */
function commit() {
  const snapshot = JSON.parse(JSON.stringify(doc));
  listeners.forEach((listener) => listener());
  saveQueue = saveQueue.then(() => storage.save(snapshot)).then((saved) => {
    if (!saved) onSaveFailed();
  });
}

/** Resolves when every pending save has finished (used before deleting everything). */
export function settled() {
  return saveQueue;
}

export function getSettings() {
  return doc.settings;
}

export function getWorries() {
  return doc.worries;
}

export function getDocument() {
  return doc;
}

export function findWorry(id) {
  return doc.worries.find((w) => w.id === id) || null;
}

/** Due pebbles, oldest check day first. */
export function dueWorries(today = todayLocal()) {
  return doc.worries.filter((w) => isDue(w, today))
    .sort((a, b) => a.checkOn.localeCompare(b.checkOn) || a.createdAt.localeCompare(b.createdAt));
}

/** Open pebbles waiting for a later day, soonest first; newest first on the same day. */
export function restingWorries(today = todayLocal()) {
  return doc.worries.filter((w) => w.status === 'open' && w.checkOn > today)
    .sort((a, b) => a.checkOn.localeCompare(b.checkOn) || b.createdAt.localeCompare(a.createdAt));
}

function uniqueId() {
  let id = newId();
  while (findWorry(id)) id = newId();
  return id;
}

/** Adds a pebble. Text is trimmed and capped; empty optional fields become null. */
export function addWorry({ text, checkOn, feeling = null, nextStep = '' }) {
  const cleanText = text.trim().slice(0, MAX_TEXT);
  const cleanStep = nextStep.trim().slice(0, MAX_NEXT_STEP);
  const worry = {
    id: uniqueId(),
    text: cleanText,
    createdAt: new Date().toISOString(),
    checkOn,
    feeling: FEELINGS.includes(feeling) ? feeling : null,
    nextStep: cleanStep || null,
    area: null,
    status: 'open',
    resolvedAt: null,
  };
  doc.worries.push(worry);
  commit();
  return worry;
}

function resolve(id, status) {
  const worry = findWorry(id);
  if (!worry) return false;
  lastChange = { id, status: worry.status, resolvedAt: worry.resolvedAt, at: Date.now() };
  worry.status = status;
  worry.resolvedAt = new Date().toISOString();
  commit();
  return true;
}

/** Records an answer: didnt, better, happened or worse. */
export function answer(id, status) {
  return resolve(id, status);
}

/** Releases a pebble without an answer. It's never shown as due again (U4). */
export function letGo(id) {
  return resolve(id, 'letgo');
}

/** Restores the last answer or let-go within 8 seconds. Returns true if something was undone. */
export function undo() {
  if (!lastChange || Date.now() - lastChange.at > UNDO_MS) return false;
  const worry = findWorry(lastChange.id);
  if (worry) {
    worry.status = lastChange.status;
    worry.resolvedAt = lastChange.resolvedAt;
  }
  lastChange = null;
  commit();
  return Boolean(worry);
}

export function updateSettings(changes) {
  Object.assign(doc.settings, changes);
  commit();
}

/** Replaces everything with an already-validated document (import). */
export function replaceDocument(newDoc) {
  doc = newDoc;
  lastChange = null;
  commit();
}

/** Empties storage and memory (Delete everything). Waits for pending saves first. */
export async function deleteEverything() {
  await saveQueue;
  const cleared = await storage.clearAll();
  doc = emptyDocument();
  lastChange = null;
  listeners.forEach((listener) => listener());
  return cleared;
}
