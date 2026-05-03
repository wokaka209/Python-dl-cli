# Python 机器学习学习软件 - 研究生版

交互式终端学习平台，面向研究生系统学习机器学习。涵盖 Scikit-learn 经典 ML 和 PyTorch 深度学习。

## 功能

- **课程学习** — 7 节结构化课程（4 sklearn + 3 pytorch），含 Markdown 讲义、可运行代码示例、课后测验
- **代码练习场** — 交互式 Python REPL，自动导入 numpy/pandas/sklearn/torch/matplotlib
- **数据集浏览** — 5 个内置数据集元数据查看（Iris, Wine, Digits, 合成分类/回归）
- **实战项目** — 3 个项目练手（鸢尾花分类、房价预测、PyTorch 手写数字分类）
- **进度追踪** — JSON 持久化，记录完成课程、测验分数、学习时长
- **证书系统** — 3 级证书自动颁发（sklearn 基础 / PyTorch 基础 / ML 大师）

## 安装

```bash
npm install
```

## 运行

```bash
node cli.js
```

## 项目结构

```
cli.js                    主入口
src/
  ui/                     终端 UI 层 (chalk, inquirer, cli-table3)
  data/                   课程数据 (lessons, datasets, projects, certificates)
  core/                   核心逻辑 (tracker, executor, certificate)
  menus/                  菜单模块
```
