// Breath pause (U9) and Check-back (U3, U4, U13). Screens → 3 and 4.

import { STRINGS } from '../strings.js';
import { byId, pebbleTone, prefersReducedMotion } from '../dom.js';
import { todayLocal, daysBetween, localDateOfTimestamp, fullDateLabel } from '../dates.js';
import * as state from '../state.js';

const INHALE_MS = 4000; // 4 s in + 6 s out = 6 breaths a minute, longer exhale (Science S5)
const EXHALE_MS = 6000;
const BREATHS = 3;
const CLOSING = {
  didnt: STRINGS.closingDidnt,
  better: STRINGS.closingBetter,
  happened: STRINGS.closingHappened,
  worse: STRINGS.closingWorse,
  letgo: STRINGS.closingLetGo,
};

let currentId = null;
let breathTimers = [];
let undoTimer = null;

function stopBreathing() {
  breathTimers.forEach(clearTimeout);
  breathTimers = [];
  byId('breath-circle').classList.remove('breathing');
}

/** Stops every timer when the person leaves these screens. */
export function leaveCheckBack() {
  stopBreathing();
  clearTimeout(undoTimer);
}

/** Changes the label once per phase, so screen readers hear it once, not every second. */
function scheduleBreathLabels() {
  const label = byId('breath-label');
  const cycle = INHALE_MS + EXHALE_MS;
  for (let i = 0; i < BREATHS; i += 1) {
    breathTimers.push(setTimeout(() => { label.textContent = STRINGS.breathIn; }, i * cycle));
    breathTimers.push(setTimeout(() => {
      label.textContent = STRINGS.breathOut;
    }, i * cycle + INHALE_MS));
  }
  breathTimers.push(setTimeout(() => {
    label.textContent = STRINGS.breathDone;
    byId('breath-circle').classList.remove('breathing');
  }, BREATHS * cycle));
}

/** The optional pause before a check-back. Skip is always visible. */
export function showBreath() {
  stopBreathing();
  const label = byId('breath-label');
  if (prefersReducedMotion()) {
    // Static circle; the words guide instead (U9)
    label.textContent = STRINGS.breathReduced;
    breathTimers.push(setTimeout(() => {
      label.textContent = STRINGS.breathDone;
    }, BREATHS * (INHALE_MS + EXHALE_MS)));
    return;
  }
  byId('breath-circle').classList.add('breathing');
  scheduleBreathLabels();
}

function writtenLine(worry) {
  const today = todayLocal();
  const written = localDateOfTimestamp(worry.createdAt);
  return STRINGS.writtenAgo(daysBetween(written, today), fullDateLabel(written, today));
}

/** Shows only the one line and when it was written, never anything more (U3). */
export function showCheckBack(id) {
  stopBreathing();
  clearTimeout(undoTimer);
  const worry = state.findWorry(id);
  currentId = id;
  byId('check-lead').textContent = writtenLine(worry);
  byId('check-text').textContent = worry.text;
  byId('check-step').textContent = worry.nextStep || '';
  byId('check-step').hidden = !worry.nextStep;
  byId('check-pebble').className = `pebble ${pebbleTone(worry.id)}`;
  showAsking();
}

function showAsking() {
  byId('check-ask').hidden = false;
  byId('check-closed').hidden = true;
  byId('follow-up').hidden = true;
  byId('answer-happened').setAttribute('aria-expanded', 'false');
  byId('check-pebble').classList.remove('sinking');
}

function rippleOnce() {
  const ripple = byId('ripple');
  ripple.classList.remove('go');
  void ripple.offsetWidth; // restarts the CSS animation
  ripple.classList.add('go');
}

/** After an answer or let-go: a calm closing line, Done, and Undo for 8 seconds. */
function showClosed(status) {
  byId('check-ask').hidden = true;
  byId('check-closed').hidden = false;
  byId('closing').textContent = CLOSING[status];
  byId('help-door').hidden = status !== 'worse';
  byId('undo').hidden = false;
  undoTimer = setTimeout(() => { byId('undo').hidden = true; }, state.UNDO_MS);
  rippleOnce();
  byId('check-done').focus();
}

function onAnswer(button) {
  const status = button.dataset.answer;
  state.answer(currentId, status);
  showClosed(status);
}

function toggleFollowUp() {
  const followUp = byId('follow-up');
  followUp.hidden = !followUp.hidden;
  byId('answer-happened').setAttribute('aria-expanded', String(!followUp.hidden));
  if (!followUp.hidden) followUp.querySelector('button').focus();
}

function onLetGo() {
  byId('check-pebble').classList.add('sinking');
  state.letGo(currentId);
  showClosed('letgo');
}

function onUndo() {
  clearTimeout(undoTimer);
  if (state.undo()) {
    showAsking();
    byId('check-lead').focus();
  } else {
    byId('undo').hidden = true;
  }
}

export function setupCheckBack({ onBreathDone }) {
  byId('breath-ready').addEventListener('click', onBreathDone);
  byId('breath-skip').addEventListener('click', onBreathDone);
  byId('answers').addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]');
    if (button) onAnswer(button);
  });
  byId('answer-happened').addEventListener('click', toggleFollowUp);
  byId('follow-up').addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]');
    if (button) onAnswer(button);
  });
  byId('let-go').addEventListener('click', onLetGo);
  byId('undo').addEventListener('click', onUndo);
}
