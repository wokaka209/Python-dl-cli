import chalk from 'chalk';
import { getProgressSummary } from '../core/tracker.js';
import { showProgressBar } from '../ui/display.js';

export function showProgressView() {
  const summary = getProgressSummary();

  console.log();
  console.log(chalk.cyan.bold('学习进度统计'));
  console.log();

  for (const [key, value] of Object.entries(summary)) {
    console.log(`  ${chalk.bold(key)}: ${value}`);
  }

  console.log();

  const totalLessons = 7;
  const completed = summary['已完成课程'] || 0;
  showProgressBar(completed, totalLessons, '课程进度');

  const totalProjects = 3;
  const completedProj = summary['已完成项目'] || 0;
  showProgressBar(completedProj, totalProjects, '项目进度');

  console.log();
}
