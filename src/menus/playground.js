import chalk from 'chalk';
import inquirer from 'inquirer';
import { showCodeExample } from '../ui/markdown.js';
import { runCode } from '../core/executor.js';

const EXAMPLES = [
  ['NumPy基础', `import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(f"数组: {arr}")
print(f"均值: {arr.mean()}")
print(f"标准差: {arr.std():.2f}")`],
  ['Pandas数据处理', `import pandas as pd
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '成绩': [85, 92, 78],
    '专业': ['计算机', '数学', '物理']
})
print(df)
print(f"\\n平均成绩: {df['成绩'].mean()}")`],
  ['Scikit-learn分类', `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=42)
clf = DecisionTreeClassifier(random_state=42)
clf.fit(X_train, y_train)
print(f"准确率: {accuracy_score(y_test, clf.predict(X_test)):.2%}")`],
];

export async function interactivePlayground() {
  console.log();
  console.log(chalk.cyan.bold('交互式代码练习场'));
  console.log();
  console.log('输入Python代码即可执行，支持 numpy/pandas/sklearn/torch/matplotlib');
  console.log();
  console.log(chalk.yellow('特殊命令:'));
  console.log(`  ${chalk.yellow(':example')}  - 显示示例代码`);
  console.log(`  ${chalk.yellow(':clear')}   - 清屏`);
  console.log(`  ${chalk.yellow(':quit')}    - 退出练习场`);
  console.log(`  ${chalk.yellow(':help')}    - 显示帮助`);
  console.log();

  let runCount = 0;

  while (true) {
    const { input } = await inquirer.prompt([{
      type: 'input',
      name: 'input',
      message: chalk.green.bold('>>>'),
      prefix: '',
    }]);

    const trimmed = input.trim();

    if (trimmed === ':quit') {
      console.log(chalk.yellow('退出练习场'));
      break;
    } else if (trimmed === ':clear') {
      console.clear();
      console.log(chalk.dim('已清屏'));
      continue;
    } else if (trimmed === ':help') {
      showHelp();
      continue;
    } else if (trimmed === ':example') {
      showExamples();
      continue;
    }

    if (!trimmed) continue;

    let code = input;
    while (code.trimEnd().endsWith(':') || code.trimEnd().endsWith('\\')) {
      const { line } = await inquirer.prompt([{
        type: 'input',
        name: 'line',
        message: chalk.green.bold('...'),
        prefix: '',
      }]);
      code += '\n' + line;
      if (!line.trim()) {
        code += '\n';
        break;
      }
    }

    const result = await runCode(code);
    runCount++;

    if (result.stdout) {
      console.log(chalk.green.bold('输出:'));
      console.log(result.stdout);
    }

    if (result.stderr) {
      console.log(result.success ? chalk.yellow.bold('警告:') : chalk.red.bold('错误:'));
      console.log(result.stderr);
    }

    if (result.success && !result.stdout && !result.stderr) {
      console.log(chalk.dim('代码执行成功（无输出）'));
    }
  }

  return runCount;
}

function showHelp() {
  console.log();
  console.log(chalk.bold('代码练习场使用说明'));
  console.log();
  console.log('1. 直接输入Python代码即可执行');
  console.log('2. 自动导入常用库 (numpy, pandas, sklearn, torch, matplotlib)');
  console.log('3. 支持多行代码：以冒号(:)结尾时自动继续输入');
  console.log();
  console.log(chalk.yellow.bold('特殊命令:'));
  console.log('  :example  - 显示常用代码示例');
  console.log('  :clear    - 清除屏幕');
  console.log('  :help     - 显示此帮助');
  console.log('  :quit     - 退出练习场');
  console.log();
}

function showExamples() {
  for (const [title, code] of EXAMPLES) {
    showCodeExample(code);
  }
}
