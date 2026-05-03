import chalk from 'chalk';
import inquirer from 'inquirer';

export function showInfo(message) {
  console.log(chalk.blue.bold('[信息] ') + message);
}

export function showSuccess(message) {
  console.log(chalk.green.bold('[成功] ') + message);
}

export function showWarning(message) {
  console.log(chalk.yellow.bold('[警告] ') + message);
}

export function showError(message) {
  console.log(chalk.red.bold('[错误] ') + message);
}

export async function showMenu(title, options) {
  console.log();
  const choices = options.map(([num, desc]) => ({
    name: `${chalk.yellow.bold(num.padStart(2))}  ${desc}`,
    value: num,
  }));

  const { choice } = await inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: chalk.cyan.bold(title),
    choices,
    pageSize: 20,
  }]);

  return choice;
}

export async function askQuestion(question, choices) {
  if (choices) {
    const { answer } = await inquirer.prompt([{
      type: 'list',
      name: 'answer',
      message: chalk.green.bold(question),
      choices: choices.map(c => ({ name: c, value: c })),
    }]);
    return answer;
  }
  const { answer } = await inquirer.prompt([{
    type: 'input',
    name: 'answer',
    message: chalk.green.bold(question),
  }]);
  return answer;
}

export async function confirm(message) {
  const { answer } = await inquirer.prompt([{
    type: 'confirm',
    name: 'answer',
    message: chalk.green.bold(message),
    default: true,
  }]);
  return answer;
}

export function showProgressBar(completed, total, label = '进度') {
  const pct = total > 0 ? (completed / total * 100) : 0;
  const barLen = 30;
  const filled = total > 0 ? Math.floor(barLen * completed / total) : 0;
  const bar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(barLen - filled));
  console.log(`${chalk.bold(label)}: [${bar}] ${Math.round(pct)}% (${completed}/${total})`);
}
