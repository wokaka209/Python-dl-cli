import chalk from 'chalk';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({
  renderer: new TerminalRenderer({
    showSectionPrefix: false,
    tab: 2,
  }),
});

export function showLessonContent(title, content) {
  console.log();
  console.log(chalk.cyan.bold('═'.repeat(50)));
  console.log(chalk.cyan.bold(`  ${title}`));
  console.log(chalk.cyan.bold('═'.repeat(50)));
  console.log();
  console.log(marked(content));
}

export function showCodeExample(code, language = 'python') {
  console.log();
  console.log(chalk.yellow.bold('┌' + '─'.repeat(48) + '┐'));
  console.log(chalk.yellow.bold('│  代码示例') + ' '.repeat(38) + chalk.yellow.bold('│'));
  console.log(chalk.yellow.bold('├' + '─'.repeat(48) + '┤'));

  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const lineNum = String(i + 1).padStart(3);
    console.log(chalk.yellow('│ ') + chalk.gray(lineNum + ' │ ') + chalk.white(lines[i]));
  }

  console.log(chalk.yellow.bold('└' + '─'.repeat(48) + '┘'));
  console.log();
}
