import chalk from 'chalk';
import inquirer from 'inquirer';
import { showMenu, showInfo, showSuccess } from '../ui/display.js';
import { getProgressSummary, setUsername, getUsername } from '../core/tracker.js';
import { incrementPlaygroundRuns } from '../core/tracker.js';
import { checkCertificates } from '../core/certificate.js';
import { showLessonMenu } from './lesson-menu.js';
import { interactivePlayground } from './playground.js';
import { showDatasetMenu } from './dataset-menu.js';
import { showProjectMenu } from './project-menu.js';
import { showProgressView } from './progress-view.js';
import { showCertificateView, showCertificateProgressView } from './certificate-view.js';
import { showSettings } from './settings.js';

export async function showMainMenu() {
  while (true) {
    const choice = await showMenu('主菜单', [
      ['1', '课程学习 - 系统化学习 ML 知识'],
      ['2', '代码练习场 - 交互式编写运行代码'],
      ['3', '数据集浏览 - 查看内置数据集'],
      ['4', '实战项目 - 动手做项目练手'],
      ['5', '学习进度 - 查看学习统计'],
      ['6', '我的证书 - 查看已获得证书'],
      ['7', '证书进度 - 查看可获得证书及进度'],
      ['8', '设置 - 修改用户名'],
      ['0', '退出'],
    ]);

    if (choice === '0') {
      return;
    } else if (choice === '1') {
      await showLessonMenu();
      checkNewCertificates();
    } else if (choice === '2') {
      const runs = await interactivePlayground();
      if (runs > 0) {
        incrementPlaygroundRuns();
        showInfo(`本次运行了 ${runs} 段代码`);
      }
    } else if (choice === '3') {
      await showDatasetMenu();
    } else if (choice === '4') {
      await showProjectMenu();
      checkNewCertificates();
    } else if (choice === '5') {
      showProgressView();
    } else if (choice === '6') {
      checkNewCertificates();
      showCertificateView();
    } else if (choice === '7') {
      showCertificateProgressView();
    } else if (choice === '8') {
      await showSettings();
    }
  }
}

function checkNewCertificates() {
  const newCerts = checkCertificates();
  if (newCerts.length) {
    console.log();
    for (const name of newCerts) {
      console.log(chalk.yellow.bold('恭喜！你获得了新证书：'));
      console.log();
      console.log(chalk.green.bold(`  ${name}`));
      console.log();
      console.log(chalk.dim('前往「我的证书」查看详情'));
      console.log();
    }
  }
}

export async function initUser() {
  const username = getUsername();
  if (!username) {
    console.log();
    console.log(chalk.cyan.bold('欢迎使用 Python 机器学习学习软件！'));
    console.log();
    console.log('这是一个面向研究生的交互式机器学习学习平台，');
    console.log('涵盖经典机器学习 (Scikit-learn) 和深度学习 (PyTorch)。');
    console.log();
    console.log(chalk.dim('功能包括：'));
    console.log(chalk.dim('  - 系统化课程学习与测验'));
    console.log(chalk.dim('  - 交互式代码练习场'));
    console.log(chalk.dim('  - 内置数据集浏览'));
    console.log(chalk.dim('  - 实战项目训练'));
    console.log(chalk.dim('  - 学习进度追踪'));
    console.log(chalk.dim('  - 完成证书颁发'));
    console.log();

    const { name } = await inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: chalk.green.bold('请输入你的名字'),
      default: '学员',
    }]);
    setUsername(name);
    showSuccess(`你好，${name}！准备开始学习吧。`);
  } else {
    showInfo(`欢迎回来，${username}！`);
  }
}
