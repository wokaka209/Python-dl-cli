import chalk from 'chalk';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({
  renderer: new TerminalRenderer({
    showSectionPrefix: false,
    tab: 2,
  }),
});

const MAX_WIDTH = 76; // box fits in 80-col terminal

// CJK and fullwidth characters take 2 columns
function strWidth(str) {
  let w = 0;
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if (
      (code >= 0x1100 && code <= 0x115f) || // Hangul Jamo
      (code >= 0x2e80 && code <= 0x303e) || // CJK Radicals
      (code >= 0x3040 && code <= 0x33bf) || // Hiragana, Katakana, etc.
      (code >= 0x3400 && code <= 0x4dbf) || // CJK Unified Ext A
      (code >= 0x4e00 && code <= 0xa4cf) || // CJK Unified
      (code >= 0xac00 && code <= 0xd7a3) || // Hangul Syllables
      (code >= 0xf900 && code <= 0xfaff) || // CJK Compatibility Ideographs
      (code >= 0xfe10 && code <= 0xfe6f) || // CJK Compatibility Forms
      (code >= 0xff01 && code <= 0xff60) || // Fullwidth Forms
      (code >= 0xffe0 && code <= 0xffe6)    // Fullwidth Signs
    ) {
      w += 2;
    } else {
      w += 1;
    }
  }
  return w;
}

function padRight(str, targetWidth) {
  const diff = targetWidth - strWidth(str);
  return diff > 0 ? str + ' '.repeat(diff) : str;
}

function truncate(str, maxWidth) {
  if (strWidth(str) <= maxWidth) return str;
  let w = 0;
  let result = '';
  for (const ch of str) {
    const cw = /[一-鿿]/.test(ch) ? 2 : 1;
    if (w + cw > maxWidth - 3) {
      result += '...';
      break;
    }
    result += ch;
    w += cw;
  }
  return result;
}

export function showLessonContent(title, content) {
  console.log();
  console.log(chalk.cyan.bold('═'.repeat(50)));
  console.log(chalk.cyan.bold(`  ${title}`));
  console.log(chalk.cyan.bold('═'.repeat(50)));
  console.log();
  console.log(marked(content));
}

export function showCodeExample(code, language = 'python') {
  const lines = code.split('\n');
  const numWidth = String(lines.length).length;
  const prefixW = numWidth + 4; // " NN │ "

  // Calculate inner width: prefix + longest line, capped at MAX_WIDTH
  let maxContentW = 0;
  for (const line of lines) {
    maxContentW = Math.max(maxContentW, strWidth(line));
  }
  const innerW = Math.min(MAX_WIDTH, Math.max(40, maxContentW + prefixW));
  const contentW = innerW - prefixW - 1; // -1 for space before border
  const border = '─'.repeat(innerW);

  // Title
  const titleText = ' 代码示例 ';
  const titlePad = innerW - strWidth(titleText);
  const titleLine = titleText + ' '.repeat(Math.max(0, titlePad));

  console.log();
  console.log(chalk.yellow('┌' + border + '┐'));
  console.log(chalk.yellow('│') + chalk.yellow.bold(titleLine) + chalk.yellow('│'));
  console.log(chalk.yellow('├' + border + '┤'));

  for (let i = 0; i < lines.length; i++) {
    const num = String(i + 1).padStart(numWidth);
    const content = truncate(lines[i], contentW);
    const row = ` ${num} │ ${content}`;
    const padded = padRight(row, innerW);
    console.log(chalk.yellow('│') + chalk.gray(padded) + chalk.yellow('│'));
  }

  console.log(chalk.yellow('└' + border + '┘'));
  console.log();
}
