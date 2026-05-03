import Table from 'cli-table3';
import chalk from 'chalk';
import { DATASETS } from '../data/datasets.js';

export async function showDatasetMenu() {
  const table = new Table({
    head: [chalk.yellow.bold('编号'), chalk.yellow.bold('名称'), chalk.yellow.bold('描述'), chalk.yellow.bold('任务')],
    style: { head: [], border: [] },
    colWidths: [6, 25, 30, 10],
  });

  const entries = Object.entries(DATASETS);
  entries.forEach(([key, ds], i) => {
    table.push([String(i + 1), ds.name, ds.description, ds.task]);
  });

  console.log();
  console.log(chalk.cyan.bold('内置数据集'));
  console.log();
  console.log(table.toString());
  console.log();
}
