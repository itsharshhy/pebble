// New worry: capture in under 20 seconds (U1, U2, U7, U8; Screens → 2).

import { STRINGS } from '../strings.js';
import { byId, make, askDialog } from '../dom.js';
import { todayLocal, addDays, maxCheckDate, isValidLocalDate } from '../dates.js';
import { FEELINGS, MAX_TEXT } from '../model.js';
import * as state from '../state.js';
import { go } from '../router.js';

const DEFAULT_DAYS = 3; // long enough for most everyday worries to resolve (U2)
const COUNTER_FROM = 120; // the counter appears only near the limit, so it never nags (U1)

let chosenDays = DEFAULT_DAYS; // a number of days, or 'pick'
let chosenFeeling = null;

function textField() {
  return byId('worry-text');
}

/** The chosen check-back day, or null if a picked date is missing or out of range. */
function chosenCheckOn() {
  const today = todayLocal();
  if (chosenDays !== 'pick') return addDays(today, chosenDays);
  const picked = byId('pick-date-input').value;
  const isInRange = isValidLocalDate(picked) && picked >= today && picked <= maxCheckDate(today);
  return isInRange ? picked : null;
}

/** Save stays disabled (not an error) until there's text and a valid day (U1). */
function updateSaveState() {
  const text = textField().value;
  const counter = byId('worry-count');
  counter.textContent = text.length > COUNTER_FROM ? STRINGS.charsLeft(MAX_TEXT - text.length) : '';
  byId('save-worry').disabled = text.trim() === '' || chosenCheckOn() === null;
}

function pressOnly(container, selected) {
  container.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selected));
  });
}

function chooseDate(button) {
  const value = button.dataset.days;
  chosenDays = value === 'pick' ? 'pick' : Number(value);
  pressOnly(byId('date-chips'), button);
  const isPicking = chosenDays === 'pick';
  byId('pick-date').hidden = !isPicking;
  if (isPicking) {
    const today = todayLocal();
    const input = byId('pick-date-input');
    input.min = today;
    input.max = maxCheckDate(today);
    if (!input.value) input.value = addDays(today, DEFAULT_DAYS);
    input.focus();
  }
  updateSaveState();
}

/** One feeling at most; tapping the chosen one again clears it (U7). */
function chooseFeeling(button) {
  const feeling = button.dataset.feeling;
  chosenFeeling = chosenFeeling === feeling ? null : feeling;
  byId('feeling-chips').querySelectorAll('button').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.feeling === chosenFeeling));
  });
}

function buildFeelingChips() {
  const chips = FEELINGS.map((feeling) => {
    const chip = make('button', 'chip', STRINGS.feelings[feeling]);
    chip.type = 'button';
    chip.dataset.feeling = feeling;
    chip.setAttribute('aria-pressed', 'false');
    return chip;
  });
  byId('feeling-chips').replaceChildren(...chips);
}

/** Clears the form each time it opens, with the cursor in the text field (U1). */
export function showNewWorry() {
  byId('new-form').reset();
  chosenFeeling = null;
  byId('more').open = false;
  byId('pick-date-input').value = '';
  chooseDate(byId('date-chips').querySelector(`[data-days="${DEFAULT_DAYS}"]`));
  buildFeelingChips();
  updateSaveState();
  textField().focus();
}

function hasTypedSomething() {
  return textField().value.trim() !== '' || byId('next-step').value.trim() !== '';
}

async function cancel() {
  if (hasTypedSomething()) {
    const choice = await askDialog('dialog-leave');
    if (choice !== 'leave') return;
  }
  go('today');
}

function save(event, onSaved) {
  event.preventDefault();
  const checkOn = chosenCheckOn();
  if (textField().value.trim() === '' || !checkOn) return;
  const worry = state.addWorry({
    text: textField().value, checkOn, feeling: chosenFeeling, nextStep: byId('next-step').value,
  });
  onSaved(worry.id);
  go('today');
}

export function setupNewWorry({ onSaved }) {
  textField().addEventListener('input', updateSaveState);
  byId('pick-date-input').addEventListener('input', updateSaveState);
  byId('date-chips').addEventListener('click', (event) => {
    const chip = event.target.closest('button');
    if (chip) chooseDate(chip);
  });
  byId('feeling-chips').addEventListener('click', (event) => {
    const chip = event.target.closest('button');
    if (chip) chooseFeeling(chip);
  });
  byId('cancel-worry').addEventListener('click', cancel);
  byId('new-form').addEventListener('submit', (event) => save(event, onSaved));
}
