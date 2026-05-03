#!/usr/bin/env node
import { showBanner } from './src/ui/banner.js';
import { showError } from './src/ui/display.js';
import { showMainMenu, initUser } from './src/menus/main-menu.js';
import { addStudyTime } from './src/core/tracker.js';

const startTime = Date.now();

async function main() {
  try {
    showBanner();
    await initUser();
    await showMainMenu();
  } catch (err) {
    if (err.name === 'ExitPromptError') {
      // User pressed Ctrl+C
    } else {
      showError(`发生错误: ${err.message}`);
      console.error(err);
    }
  } finally {
    const elapsed = Math.floor((Date.now() - startTime) / 60000);
    if (elapsed > 0) {
      addStudyTime(elapsed);
    }
    console.log();
    console.log('感谢使用！继续加油，下次见！');
    console.log('你的学习进度已自动保存。');
    console.log();
  }
}

main();
