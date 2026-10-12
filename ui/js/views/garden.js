// Garden: the evidence, gently (U5; Screens → 5). No charts, streaks, scores or trends.

import { STRINGS } from '../strings.js';
import { byId, pebbleTone } from '../dom.js';
import { gardenCounts, isChecked } from '../model.js';
import * as state from '../state.js';

const MIN_FOR_RATIO = 5; // below 5 checked, a ratio would mislead (U5)
const MAX_STONES = 60; // beyond 60, the pond just stays full (Screens → Garden)
const SVG_NS = 'http://www.w3.org/2000/svg';

/** A repeatable "random" number from a pebble id, so stones don't jump between visits. */
function seeded(id, salt) {
  let hash = salt * 7919;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 100003;
  return hash / 100003;
}

/** One stone resting in the water. Stones farther back are a little smaller. */
function makeStone(worry, index) {
  const depth = seeded(worry.id, 2);
  const stone = document.createElementNS(SVG_NS, 'ellipse');
  stone.setAttribute('cx', String(Math.round(24 + seeded(worry.id, 1) * 312)));
  stone.setAttribute('cy', String(Math.round(146 + depth * 42)));
  stone.setAttribute('rx', String(Math.round(6 + depth * 5 + seeded(worry.id, 3) * 2)));
  stone.setAttribute('ry', String(Math.round(4 + depth * 3)));
  stone.setAttribute('class', `stone ${pebbleTone(worry.id)}`);
  // Stones settle one after another; CSSOM is allowed by our security policy
  stone.style.animationDelay = `${Math.min(index, 20) * 40}ms`;
  return stone;
}

/** Draws one stone per checked pebble, front stones last so they overlap the back ones. */
function drawPond(checkedWorries) {
  const stones = checkedWorries.slice(0, MAX_STONES).map(makeStone)
    .sort((a, b) => Number(a.getAttribute('cy')) - Number(b.getAttribute('cy')));
  byId('pond-stones').replaceChildren(...stones);
}

export function renderGarden() {
  const worries = state.getWorries();
  const { checked, didntHappen } = gardenCounts(worries);
  const hasEnough = checked >= MIN_FOR_RATIO;
  byId('garden-count').hidden = !hasEnough;
  byId('garden-small').hidden = hasEnough;
  byId('garden-number').textContent = STRINGS.gardenCount(didntHappen, checked);
  byId('garden-sentence').textContent = STRINGS.gardenAria(didntHappen, checked);
  drawPond(worries.filter(isChecked));
}
