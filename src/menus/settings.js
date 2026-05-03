import chalk from 'chalk';
import inquirer from 'inquirer';
import { showInfo, showSuccess, confirm } from '../ui/display.js';
import { getUsername, setUsername } from '../core/tracker.js';

export async function showSettings() {
  const current = getUsername();
  showInfo(`当前用户名: ${current}`);

  if (await confirm('是否修改用户名？')) {
    const { newName } = await inquirer.prompt([{
      type: 'input',
      name: 'newName',
      message: chalk.green.bold('输入新用户名'),
      default: current,
    }]);
    setUsername(newName);
    showSuccess(`用户名已修改为: ${newName}`);
  }
}
