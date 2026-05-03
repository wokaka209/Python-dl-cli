# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Python机器学习学习软件 - 研究生版 (Python ML Learning Suite - Graduate Edition). A Chinese-language interactive terminal application for graduate students learning machine learning. Built with Node.js (inquirer + chalk + cli-table3).

## Running

```bash
node cli.js
```

## Architecture

```
cli.js                        ← Entry point
src/
  ui/
    banner.js                 ← ASCII art banner
    display.js                ← chalk/inquirer UI primitives
    markdown.js               ← marked-terminal content rendering
  data/
    lessons.js                ← Course content (LESSONS object)
    datasets.js               ← Dataset catalog
    projects.js               ← Hands-on projects
    certificates.js           ← Certificate definitions
  core/
    tracker.js                ← JSON persistence to data/progress.json
    executor.js               ← Python code execution via child_process.spawn
    certificate.js            ← Certificate eligibility checking
  menus/
    main-menu.js              ← Main menu loop
    lesson-menu.js            ← Lesson browsing + quiz
    playground.js             ← Interactive Python REPL
    dataset-menu.js           ← Dataset browser
    project-menu.js           ← Project lab
    progress-view.js          ← Progress statistics
    certificate-view.js       ← Certificate display
    settings.js               ← Username settings
```

### Key Design Decisions

- **All UI goes through `src/ui/display.js`** — use `showInfo()`, `showSuccess()`, `showError()`, `showMenu()`, `confirm()`, etc.
- **Progress persistence**: `src/core/tracker.js` reads/writes `data/progress.json`. All state mutations go through functions in `tracker.js`. The file is created on first use.
- **Code execution**: `src/core/executor.js` uses `child_process.spawn('python', ...)` to run Python code. Timeout is enforced via `setTimeout` + `proc.kill()`.
- **Lessons are data, not files**: All course content lives in the `LESSONS` object inside `src/data/lessons.js` — Markdown strings, code examples, and quiz questions are inline.
- **ESM modules**: Uses `"type": "module"` in package.json. All imports use ES module syntax.

### Data Flow

```
User → cli.js (entry point)
  → src/menus/main-menu.js (main loop)
    → src/menus/lesson-menu.js → src/data/lessons.js → src/core/executor.js → src/core/tracker.js
    → src/menus/playground.js → src/core/executor.js
    → src/menus/project-menu.js → src/data/projects.js → src/core/executor.js → src/core/tracker.js
    → src/menus/dataset-menu.js → src/data/datasets.js
    → src/menus/progress-view.js → src/core/tracker.js
    → src/menus/certificate-view.js → src/core/certificate.js → src/core/tracker.js
    → src/menus/settings.js → src/core/tracker.js
  → data/progress.json
```

## Dependencies

Declared in `package.json`: inquirer, chalk, cli-table3, marked, marked-terminal, cli-highlight. Install with:

```bash
npm install
```
