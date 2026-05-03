import chalk from 'chalk';
import inquirer from 'inquirer';
import { showMenu, showInfo, showSuccess, showError, confirm } from '../ui/display.js';
import { showLessonContent, showCodeExample } from '../ui/markdown.js';
import { LESSONS, getLesson } from '../data/lessons.js';
import { completeLesson, isLessonCompleted, saveQuizScore } from '../core/tracker.js';
import { runCode } from '../core/executor.js';

export async function showLessonMenu() {
  while (true) {
    const choice = await showMenu('选择课程类别', [
      ['1', '经典机器学习 (Scikit-learn)'],
      ['2', '深度学习 (PyTorch)'],
      ['0', '返回主菜单'],
    ]);

    if (choice === '0') break;

    const category = choice === '1' ? 'sklearn' : 'pytorch';
    await showCategoryLessons(category);
  }
}

async function showCategoryLessons(category) {
  const cat = LESSONS[category];
  const lessons = cat.lessons;

  while (true) {
    const options = lessons.map((lesson, i) => {
      const status = isLessonCompleted(lesson.id) ? ' [done]' : '';
      return [String(i + 1), `${lesson.title}${status}`];
    });
    options.push(['0', '返回']);

    const choice = await showMenu(cat.title, options);
    if (choice === '0') break;

    const idx = parseInt(choice) - 1;
    if (idx >= 0 && idx < lessons.length) {
      await runLesson(lessons[idx].id);
    }
  }
}

async function runLesson(lessonId) {
  const lesson = getLesson(lessonId);
  if (!lesson) {
    showError(`课程 ${lessonId} 不存在`);
    return;
  }

  showLessonContent(lesson.title, lesson.content);

  if (!(await confirm('继续查看代码示例？'))) return;

  showCodeExample(lesson.code);

  if (await confirm('在练习场中运行这段代码？')) {
    console.log();
    console.log(chalk.cyan.bold('正在执行代码...'));
    const result = await runCode(lesson.code);
    if (result.stdout) {
      console.log(chalk.green.bold('运行结果:'));
      console.log(result.stdout);
    }
    if (result.stderr) {
      console.log(result.success ? chalk.yellow.bold('警告:') : chalk.red.bold('错误:'));
      console.log(result.stderr);
    }
  }

  if (!(await confirm('标记此课程为已完成？'))) return;

  completeLesson(lessonId);
  showSuccess(`课程 '${lesson.title}' 已标记完成！`);

  if (lesson.quiz && lesson.quiz.length) {
    if (await confirm('是否进行课后测验？')) {
      await runQuiz(lessonId, lesson.quiz);
    }
  }
}

async function runQuiz(lessonId, questions) {
  console.log();
  console.log(chalk.cyan.bold('═══ 课后测验 ═══'));
  console.log();

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(chalk.bold(`第${i + 1}题: ${q.question}`));
    for (const opt of q.options) {
      console.log(`  ${opt}`);
    }

    const { answer } = await inquirer.prompt([{
      type: 'list',
      name: 'answer',
      message: '你的答案',
      choices: ['A', 'B', 'C', 'D'],
    }]);

    if (answer === q.answer) {
      console.log(chalk.green.bold('  正确！'));
      score++;
    } else {
      console.log(chalk.red.bold(`  错误！正确答案是 ${q.answer}`));
    }
    console.log();
  }

  console.log(chalk.bold(`测验结果: ${score}/${questions.length}`));
  saveQuizScore(lessonId, score, questions.length);

  if (score === questions.length) {
    showSuccess('满分！太棒了！');
  } else if (score >= questions.length * 0.6) {
    showInfo('不错，继续努力！');
  } else {
    showInfo('建议回顾课程内容后再试一次。');
  }
}
