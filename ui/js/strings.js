// Every word Pebble says lives here, never inline in logic (Content and voice → Localisation).
// Rules: sentence case, no exclamation marks, no emoji, words for one to nine in sentences.

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

/** Words for one to nine, digits from 10 (Content and voice, writing rule 6). */
export function numberWord(n) {
  return n >= 0 && n <= 9 ? NUMBER_WORDS[n] : String(n);
}

/** Capitalises the first letter, for numbers that start a sentence. */
export function capitalise(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function pebbles(n) {
  return n === 1 ? 'one pebble' : `${numberWord(n)} pebbles`;
}

export const STRINGS = {
  appName: 'Pebble',
  pageTitle: (screen) => `${screen} · Pebble`,
  noJs: 'Pebble needs JavaScript to run.',

  // Screen names (page titles and headings)
  titleWelcome: 'Welcome',
  titleToday: 'Today',
  titleNew: 'New pebble',
  titleBreath: 'Breath pause',
  titleCheck: 'Look back',
  titleGarden: 'Garden',
  titleSettings: 'Settings',
  titleAbout: 'About & safety',

  // Navigation
  navLabel: 'Main',
  navToday: 'Today',
  navGarden: 'Garden',
  navSettings: 'Settings',

  // Today
  greetingMorning: 'Good morning',
  greetingAfternoon: 'Good afternoon',
  greetingEvening: 'Good evening',
  todayEmpty: 'Nothing to carry today.',
  todayResting: 'Your pebbles are resting.',
  todayDueOne: 'One pebble is ready to look at. No rush.',
  todayDueMany: (n) => `${capitalise(numberWord(n))} pebbles are ready when you are.`,
  readyHeading: 'Ready to look at',
  restingHeading: 'Resting',
  readyWhenYouAre: 'Ready when you are',
  showMore: (n) => `And ${numberWord(n)} more`,
  showFewer: 'Show fewer',
  nextWeek: 'Next week',
  mainAction: 'Set a pebble down',

  // New worry
  newTitle: "What's on your mind?",
  placeholder: 'Say it in one line',
  charsLeft: (n) => `${n} left`,
  dateQuestion: 'When should we look back?',
  chipTomorrow: 'Tomorrow',
  chipThreeDays: 'In 3 days',
  chipWeek: 'In a week',
  chipPick: 'Pick a date',
  pickDateLabel: 'Choose a day',
  pickDateHint: 'Any day from today to a year from now.',
  moreFold: 'Add more (optional)',
  feelingLabel: 'Name the feeling',
  feelings: {
    nervous: 'nervous',
    uneasy: 'uneasy',
    dread: 'dread',
    unsure: 'unsure',
    tense: 'tense',
    sad: 'sad',
  },
  nextStepLabel: 'One small next step?',
  nextStepPlaceholder: 'e.g. Rehearse once tomorrow',
  friendPrompt: 'What would you tell a friend who wrote this?',
  friendHint: 'Just something to think about. It isn\'t saved.',
  saveButton: 'Set it down',
  cancel: 'Cancel',
  leaveQuestion: 'Leave without saving?',
  keepWriting: 'Keep writing',
  leave: 'Leave',

  // Breath pause
  breathIntro: 'Before we look back',
  breathIn: 'Breathe in',
  breathOut: 'and slowly out',
  breathDone: "When you're ready",
  breathReduced: 'Take three slow breaths.',
  breathReady: "I'm ready",
  breathSkip: 'Skip',

  // Check-back
  writtenAgo: (days, dateLabel) => {
    if (days <= 0) return 'Today you wrote';
    if (days === 1) return 'Yesterday you wrote';
    if (days < 14) return `${capitalise(numberWord(days))} days ago you wrote`;
    return `On ${dateLabel} you wrote`;
  },
  question: 'Did it happen?',
  answerDidnt: "It didn't happen",
  answerBetter: 'Better than I feared',
  answerHappened: 'It happened',
  followUp: 'Was it worse than you feared?',
  followYes: 'Yes',
  followExpected: 'About what I expected',
  letGo: 'Let it go',
  closingDidnt: "That one didn't happen. Noted.",
  closingBetter: 'Better than you feared. Noted.',
  closingHappened: "That happened. That's hard. You got through it.",
  closingWorse: "That sounds really hard. If it's weighing on you, talking to someone can help.",
  closingLetGo: "Let go. You won't be asked about it again.",
  findSupport: 'Find support',
  undo: 'Undo',
  done: 'Done',

  // Garden
  gardenLead: 'Since you started',
  gardenCount: (x, y) => `${x} of ${y}`,
  gardenLine: "pebbles you checked didn't happen.",
  gardenAria: (x, y) => `${x} of ${y} pebbles you checked didn't happen`,
  gardenSmall: "Your garden is just starting. Check back on a few pebbles and it'll fill in.",
  gardenFooter: "No streaks. No scores. Just a record that's yours.",

  // Settings
  comfortHeading: 'Comfort',
  paletteLabel: 'Palette',
  paletteSystem: 'Follow system',
  paletteDay: 'Day',
  paletteEvening: 'Evening',
  breathSetting: 'Breath pause',
  breathSettingHint: 'Three slow breaths before you look back. Off by default.',
  dataHeading: 'Your data',
  dataNote: 'Your pebbles live only on this computer. A backup keeps them safe.',
  exportButton: 'Export backup',
  importButton: 'Import backup',
  deleteButton: 'Delete everything',
  aboutHeading: 'About & safety',
  aboutLink: 'About Pebble, privacy and support',

  // Import and delete
  importConfirm: (n, m) => `This will replace ${pebbles(n)} with ${pebbles(m)}.`,
  importSkipped: (n) => `${capitalise(pebbles(n))} in the file couldn't be read and will be left out.`,
  importReplace: 'Replace',
  importKeep: 'Keep what I have',
  importInvalid: "Pebble couldn't read that file. Nothing was changed.",
  importDone: 'Your backup is in place.',
  exportDone: 'Backup saved.',
  exportFailed: "Pebble couldn't save the backup. Your pebbles are unchanged.",
  deleteConfirm: 'Delete every pebble and setting on this device? This can\'t be undone. ' +
    'Export a backup first if you might want them.',
  deleteKeep: 'Keep my pebbles',
  deleteAll: 'Delete everything',
  deleted: 'Everything on this device was deleted.',

  // Storage problems (Architecture → Error handling)
  storageError: "Pebble can't save right now. Try exporting a backup.",
  corruptNotice: "Pebble couldn't read what was saved before. It kept a copy on this device " +
    'and started fresh. Nothing was deleted.',
  skippedOnLoad: (n) => `${capitalise(pebbles(n))} couldn't be read and were left out. ` +
    'A copy was kept on this device.',

  // About & safety
  aboutWhat: 'Pebble is a small, private place to set worries down, one line at a time. ' +
    'On the day you choose, it asks if the worry happened, and keeps an honest record.',
  aboutCountHeading: 'How the garden counts',
  aboutCount: 'It counts the pebbles you answered. "It didn\'t happen" and "Better than I ' +
    'feared" both count as didn\'t happen, because the outcome you feared didn\'t come true. ' +
    'Pebbles you let go aren\'t counted at all.',
  aboutIdeaHeading: 'Where the idea comes from',
  aboutIdea: 'Pebble is based on the Worry Outcome Journal, a technique studied in anxiety ' +
    'research (LaFreniere & Newman, 2020). In that small study, 91.4% of tracked worries ' +
    "didn't come true. Your own record may look different, and that's fine.",
  safetyHeading: "If you're struggling",
  notMedical: "Pebble is a reflection tool, not medical care. If you're struggling, please " +
    'reach out to someone you trust or a professional.',
  helpWorld: 'Find a free helpline in your country',
  helpIndia: 'India: Tele-MANAS, call 14416 (free, 24/7)',
  helpEmergency: 'In an emergency, call your local emergency number.',
  privacyHeading: 'Privacy',
  privacyLine: 'Everything stays on this device. We never see it.',
  privacyDetail: 'Pebble has no servers and no accounts, and its security settings block it ' +
    'from sending data anywhere. Your pebbles are saved in a file on this computer. ' +
    'Export a backup from time to time to keep them safe.',
  versionLine: (v) => `Pebble ${v} · MIT licence`,
  sourceLink: 'Source code',
  backToSettings: 'Back to settings',

  // First run (Screens → First run; Safety → trauma note)
  welcomeCard1: 'Set your worries down, one line at a time.',
  welcomeCard2: 'On the day you choose, Pebble asks: did it happen?',
  welcomeCard3: "Everything stays on this device. Pebble isn't medical care. If you're " +
    'struggling, please reach out to someone.',
  welcomeTrauma: "If something very hard just happened, it's OK to wait before writing about it.",
  welcomeStep: (i) => `${capitalise(numberWord(i))} of three`,
  next: 'Next',
  begin: 'Begin',
};
