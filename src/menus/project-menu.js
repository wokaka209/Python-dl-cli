import chalk from 'chalk';
import { showMenu, showSuccess, showError, confirm } from '../ui/display.js';
import { showLessonContent, showCodeExample } from '../ui/markdown.js';
import { PROJECTS } from '../data/projects.js';
import { completeProject } from '../core/tracker.js';
import { runCode } from '../core/executor.js';

export async function showProjectMenu() {
  while (true) {
    const options = PROJECTS.map((p, i) => [String(i + 1), `${p.name} [${p.difficulty}]`]);
    options.push(['0', '返回主菜单']);

    const choice = await showMenu('实战项目', options);
    if (choice === '0') break;

    const idx = parseInt(choice) - 1;
    if (idx >= 0 && idx < PROJECTS.length) {
      await runProject(PROJECTS[idx].id);
    }
  }
}

async function runProject(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) {
    showError(`项目 ${projectId} 不存在`);
    return;
  }

  showLessonContent(project.name, project.content);

  if (await confirm('查看起始代码？')) {
    showCodeExample(project.starterCode);
  }

  if (await confirm('在练习场中运行起始代码？')) {
    console.log();
    console.log(chalk.cyan.bold('正在执行项目代码...'));
    const result = await runCode(project.starterCode);
    if (result.stdout) {
      console.log(chalk.green.bold('运行结果:'));
      console.log(result.stdout);
    }
    if (result.stderr) {
      console.log(result.success ? chalk.yellow.bold('警告:') : chalk.red.bold('错误:'));
      console.log(result.stderr);
    }
  }

  if (await confirm('标记此项目为已完成？')) {
    completeProject(projectId);
    showSuccess(`项目 '${project.name}' 已标记完成！`);
  }
}
