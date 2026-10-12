# Project structure
*Phase: Implementation · Where every file lives. If you're unsure where something goes, it's here.*

```
pebble/
├── index.html                  The app: all screens as <section>s, hidden until routed
├── style.css                   1) tokens  2) base  3) components  4) screens  5) motion
├── app.js                      Entry point: starts router, loads state
├── js/                         (created when app.js passes ~300 lines)
│   ├── storage.js              load / save / validate / migrate
│   ├── state.js                worries in memory + actions
│   ├── view.js                 render functions, one per screen
│   ├── router.js               hash → screen
│   ├── dates.js                todayLocal(), addDays(), relative labels
│   └── strings.js              every user-facing string (STRINGS)
├── assets/
│   ├── icon.svg                App icon (neutral, no "worry" imagery)
│   └── pond.svg                Illustrations
├── tests/
│   └── index.html              In-browser tests for pure functions (dates, validation, migration)
├── design/
│   └── preview.html            Living design reference
├── docs/
│   └── handbook/               This handbook, one folder per SDLC phase
├── AGENTS.md                   Instructions + project memory for AI helpers
├── README.md                   The front door
├── CHANGELOG.md                Release notes (from v1)
├── LICENSE                     MIT
└── .gitignore                  Keeps exports and OS clutter out of Git
```

## Rules
1. **One concern per file.** If you can't describe a file in one line, split it.
2. **Strings live in `strings.js`**, never inline in logic ([Content](../03-design/content-and-voice.md#localisation-readiness)).
3. **No user data in the repo.** Exports are git-ignored (`pebble-backup*.json`).
4. **Docs move with code.** Changing behaviour means updating the matching handbook page in the same commit.
5. **Names:** files `kebab-case`, JS variables and functions `camelCase`, CSS classes `kebab-case`, constants `UPPER_SNAKE`.

## Done when
Every file in the repo has a home listed above (or the tree is updated).
