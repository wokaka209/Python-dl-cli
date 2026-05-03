中文 | **[English](README.md)**

# Python 机器学习学习软件 — 研究生版

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=fff)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=fff)
![scikit--learn](https://img.shields.io/badge/scikit--learn-1.3-F7931E?style=flat-square&logo=scikit-learn&logoColor=fff)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0-EE4C2C?style=flat-square&logo=pytorch&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

终端交互式机器学习学习平台，面向研究生。覆盖经典 ML（scikit-learn）和深度学习（PyTorch），通过结构化课程、实战项目和代码练习场来学。

## 目录

- [这是什么](#这是什么)
- [跑起来](#跑起来)
- [功能](#功能)
- [文件结构](#文件结构)
- [用到的东西](#用到的东西)
- [许可协议](#许可协议)

## 这是什么

一个中文 CLI 应用，带你一步步学机器学习。可以理解成一本能跑的教材——每节课有讲解、有代码示例、能直接执行、还有测验检查你懂没懂。

代码通过 Python 子进程执行，所以机器上得有 Python 和常用的 ML 库（numpy、pandas、scikit-learn、torch）。

## 跑起来

```bash
# 克隆
git clone https://github.com/wokaka209/Python-dl-cli.git
cd Python-dl-cli

# 装 Node 依赖
npm install

# 确保 Python + ML 库可用
pip install numpy pandas scikit-learn torch matplotlib

# 启动
node cli.js
```

Windows 用户注意：如果 `python` 指向的是微软商店的空壳（exit code 49），得用 Python 的完整路径。

## 功能

**7 节结构化课程**，分两条线：
- Scikit-learn（4 节）：数据预处理、分类、回归
- PyTorch（3 节）：张量、神经网络、CNN

每节课的流程：看讲解 → 看代码 → 跑代码 → 标记完成 → 做测验。

**交互式代码练习场** — 直接在终端写 Python 代码并执行。自动导入常用库（numpy、pandas、sklearn、torch、matplotlib）。

**3 个实战项目**，带起始代码：
- 鸢尾花分类（入门）
- 房价预测（入门）
- PyTorch 手写数字分类器（中级）

**进度追踪** — 所有进度持久化到 `data/progress.json`。记录已完成课程、测验分数、学习时长、练习场运行次数。

**3 级证书系统** — 达到条件自动颁发：
- Scikit-learn 基础：完成全部 4 节 sklearn 课程
- 深度学习基础：完成全部 3 节 pytorch 课程
- ML 大师：全部课程 + 3 个项目

## 文件结构

```
cli.js                    入口
src/
  ui/                     终端 UI（chalk、inquirer、cli-table3）
    banner.js             ASCII art 横幅
    display.js            菜单提示、进度条、状态消息
    markdown.js           渲染课程内容和代码示例
  data/                   课程数据，JS 对象
    lessons.js            7 节课，含 markdown、代码、测验
    datasets.js           5 个内置数据集描述
    projects.js           3 个项目简介和起始代码
    certificates.js       证书等级定义
  core/                   业务逻辑
    tracker.js            读写 data/progress.json
    executor.js           通过 child_process.spawn 跑 Python 代码
    certificate.js        检查资格、渲染证书
  menus/                  交互式菜单
    main-menu.js          顶层导航
    lesson-menu.js        浏览和学习课程
    playground.js         Python REPL
    dataset-menu.js       数据集浏览器
    project-menu.js       项目实验室
    progress-view.js      统计面板
    certificate-view.js   证书展示
    settings.js           用户名管理
```

## 用到的东西

- [inquirer](https://github.com/SBoudrias/Inquirer.js) — 交互式提示
- [chalk](https://github.com/chalk/chalk) — 终端颜色
- [cli-table3](https://github.com/cli-table/cli-table3) — 表格渲染
- [marked](https://github.com/markedjs/marked) + [marked-terminal](https://github.com/mikaelbr/marked-terminal) — 终端里的 markdown
- [cli-highlight](https://github.com/felixfbecker/cli-highlight) — 语法高亮

## 许可协议

MIT
