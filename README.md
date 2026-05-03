**[中文版](README_cn.md)** | English

# Python ML Learning Suite

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=fff)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=fff)
![scikit--learn](https://img.shields.io/badge/scikit--learn-1.3-F7931E?style=flat-square&logo=scikit-learn&logoColor=fff)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0-EE4C2C?style=flat-square&logo=pytorch&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A terminal-based interactive learning platform for graduate students studying machine learning. Covers classical ML (scikit-learn) and deep learning (PyTorch) through structured lessons, hands-on projects, and a code playground.

## Table of Contents

- [What is this](#what-is-this)
- [Getting started](#getting-started)
- [Features](#features)
- [File structure](#file-structure)
- [Built with](#built-with)
- [License](#license)

## What is this

A Chinese-language CLI app that walks you through machine learning concepts step by step. Think of it as a textbook you can run — each lesson has explanations, code examples you can execute on the spot, and quizzes to check your understanding.

The app runs Python code in a subprocess, so you need Python installed with the usual ML libraries (numpy, pandas, scikit-learn, torch).

## Getting started

```bash
# Clone
git clone https://github.com/wokaka209/Python-dl-cli.git
cd Python-dl-cli

# Install Node dependencies
npm install

# Make sure Python + ML libraries are available
pip install numpy pandas scikit-learn torch matplotlib

# Run
node cli.js
```

On Windows, if `python` points to the Microsoft Store stub, use the full path to your Python executable instead.

## Features

**7 structured lessons** across two tracks:
- Scikit-learn (4 lessons): data preprocessing, classification, regression
- PyTorch (3 lessons): tensors, neural networks, CNNs

Each lesson follows: read → view code → run code → mark complete → quiz.

**Interactive code playground** — write and execute Python code directly in the terminal. Auto-imports common libraries (numpy, pandas, sklearn, torch, matplotlib).

**3 hands-on projects** with starter code:
- Iris classification (beginner)
- House price prediction (beginner)
- PyTorch digit classifier (intermediate)

**Progress tracking** — all progress persists to `data/progress.json`. Tracks completed lessons, quiz scores, study time, and playground runs.

**3-tier certificate system** — automatically awarded when you hit milestones:
- Scikit-learn Basic: complete all 4 sklearn lessons
- Deep Learning Basic: complete all 3 pytorch lessons
- ML Master: complete everything + 3 projects

## File structure

```
cli.js                    Entry point
src/
  ui/                     Terminal UI (chalk, inquirer, cli-table3)
    banner.js             ASCII art banner
    display.js            Menu prompts, progress bars, status messages
    markdown.js           Render lesson content and code examples
  data/                   Course content as JS objects
    lessons.js            7 lessons with markdown, code, and quizzes
    datasets.js           5 built-in dataset descriptions
    projects.js           3 project briefs with starter code
    certificates.js       Certificate tier definitions
  core/                   Business logic
    tracker.js            Read/write data/progress.json
    executor.js           Run Python code via child_process.spawn
    certificate.js        Check eligibility and render certificates
  menus/                  Interactive menu screens
    main-menu.js          Top-level navigation
    lesson-menu.js        Browse and run lessons
    playground.js         Python REPL
    dataset-menu.js       Dataset browser
    project-menu.js       Project lab
    progress-view.js      Stats dashboard
    certificate-view.js   Certificate display
    settings.js           Username management
```

## Built with

- [inquirer](https://github.com/SBoudrias/Inquirer.js) — interactive prompts
- [chalk](https://github.com/chalk/chalk) — terminal colors
- [cli-table3](https://github.com/cli-table/cli-table3) — table rendering
- [marked](https://github.com/markedjs/marked) + [marked-terminal](https://github.com/mikaelbr/marked-terminal) — markdown in terminal
- [cli-highlight](https://github.com/felixfbecker/cli-highlight) — syntax highlighting

## License

MIT
