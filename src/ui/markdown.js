import chalk from 'chalk';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({
  renderer: new TerminalRenderer({
    showSectionPrefix: false,
    tab: 2,
  }),
});

// CJK characters take 2 columns in terminal
function strWidth(str) {
  let w = 0;
  for (const ch of str) {
    w += /[一-鿿　-〿＀-￯]/.test(ch) ? 2 : 1;
  }
  return w;
}

function padRight(str, targetWidth) {
  const diff = targetWidth - strWidth(str);
  return diff > 0 ? str + ' '.repeat(diff) : str;
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

  // Calculate box inner width based on longest line
  let maxLineW = 0;
  for (const line of lines) {
    maxLineW = Math.max(maxLineW, strWidth(line));
  }
  // inner = prefix + code content, at least 40
  const innerW = Math.max(40, maxLineW + numWidth + 5);
  const border = '─'.repeat(innerW);

  // Title with CJK-aware padding
  const titleText = ' 代码示例 ';
  const titlePad = innerW - strWidth(titleText);
  const titleLine = titleText + ' '.repeat(Math.max(0, titlePad));

  console.log();
  console.log(chalk.yellow('┌' + border + '┐'));
  console.log(chalk.yellow('│') + chalk.yellow.bold(titleLine) + chalk.yellow('│'));
  console.log(chalk.yellow('├' + border + '┤'));

  for (let i = 0; i < lines.length; i++) {
    const num = String(i + 1).padStart(numWidth);
    const prefix = ` ${num} │ `;
    const content = lines[i];
    const row = prefix + content;
    const padded = padRight(row, innerW);
    console.log(chalk.yellow('│') + chalk.gray(padded) + chalk.yellow('│'));
  }

  console.log(chalk.yellow('└' + border + '┘'));
  console.log();
}
