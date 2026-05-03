export const LESSONS = {
  sklearn: {
    title: '经典机器学习 (Scikit-learn)',
    lessons: [
      {
        id: 'sklearn_01',
        title: '第1课: 机器学习概述与环境配置',
        content: `# 机器学习概述

## 什么是机器学习？

机器学习是人工智能的一个分支，它使计算机能够从数据中学习并做出预测或决策，而无需被显式编程。

## 机器学习的三大类别

1. **监督学习 (Supervised Learning)** - 有标签数据训练，任务：分类、回归
2. **无监督学习 (Unsupervised Learning)** - 无标签数据训练，任务：聚类、降维
3. **强化学习 (Reinforcement Learning)** - 通过与环境交互学习最优策略

## Scikit-learn 简介

Scikit-learn 是 Python 中最流行的机器学习库，提供了分类、回归、聚类、模型评估等完整工具链。
`,
        code: `# 环境检查
import sklearn
import numpy as np
import pandas as pd

print(f"Scikit-learn 版本: {sklearn.__version__}")
print(f"NumPy 版本: {np.__version__}")
print(f"Pandas 版本: {pd.__version__}")
print("\\n环境配置完成！可以开始学习机器学习了。")`,
        quiz: [
          { question: '以下哪种学习方式需要有标签数据？', options: ['A. 监督学习', 'B. 无监督学习', 'C. 强化学习', 'D. 以上都不需要'], answer: 'A' },
          { question: 'Scikit-learn 主要用于？', options: ['A. 深度学习', 'B. 传统机器学习', 'C. 图像处理', 'D. 自然语言处理'], answer: 'B' },
        ],
      },
      {
        id: 'sklearn_02',
        title: '第2课: 数据预处理与特征工程',
        content: `# 数据预处理与特征工程

## 为什么需要数据预处理？

真实世界的数据通常是"脏"的：缺失值、异常值、不一致格式、不同量纲。

## 常见预处理步骤

1. **数据清洗**: 处理缺失值和异常值
2. **特征编码**: 将分类变量转为数值 (One-Hot, Label Encoding)
3. **特征缩放**: StandardScaler, MinMaxScaler
4. **特征选择**: 选择最相关的特征

> "Applied machine learning is basically feature engineering." — Andrew Ng
`,
        code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer

data = pd.DataFrame({
    '年龄': [25, 30, np.nan, 35, 28],
    '收入': [5000, 8000, 6000, np.nan, 7000],
    '城市': ['北京', '上海', '北京', '深圳', '上海'],
    '购买': ['是', '否', '是', '是', '否']
})

print("原始数据:")
print(data)

imputer = SimpleImputer(strategy='mean')
data[['年龄', '收入']] = imputer.fit_transform(data[['年龄', '收入']])
print("\\n填充缺失值后:")
print(data)

le = LabelEncoder()
data['购买编码'] = le.fit_transform(data['购买'])
print("\\n标签编码后:")
print(data)

scaler = StandardScaler()
scaled = scaler.fit_transform(data[['年龄', '收入']])
print(f"\\n标准化后:\\n{pd.DataFrame(scaled, columns=['年龄', '收入'])}")`,
        quiz: [
          { question: 'StandardScaler将数据变换为？', options: ['A. [0,1]区间', 'B. 均值为0，标准差为1', 'C. [-1,1]区间', 'D. 整数'], answer: 'B' },
        ],
      },
      {
        id: 'sklearn_03',
        title: '第3课: 监督学习 - 分类算法',
        content: `# 监督学习 - 分类算法

## 常用分类算法

- **逻辑回归**: 简单高效，输出概率值
- **决策树**: 直观易理解，可处理非线性关系
- **随机森林**: 集成学习，减少过拟合
- **SVM**: 寻找最优分隔超平面，适合高维数据

## 评估指标

- **准确率**: 正确预测的比例
- **精确率**: 预测为正类中真正为正的比例
- **召回率**: 真正为正类中被正确预测的比例
- **F1分数**: 精确率和召回率的调和平均
`,
        code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

iris = load_iris()
X, y = iris.data, iris.target
print(f"数据集: {X.shape}, 类别: {list(iris.target_names)}")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

classifiers = {
    '逻辑回归': LogisticRegression(max_iter=200, random_state=42),
    '决策树': DecisionTreeClassifier(random_state=42),
    '随机森林': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM': SVC(kernel='rbf', random_state=42)
}

for name, clf in classifiers.items():
    clf.fit(X_train, y_train)
    acc = accuracy_score(y_test, clf.predict(X_test))
    print(f"{name}: 准确率 = {acc:.2%}")

print("\\n随机森林详细报告:")
print(classification_report(y_test, classifiers['随机森林'].predict(X_test),
                          target_names=iris.target_names))`,
        quiz: [
          { question: '随机森林的核心思想是？', options: ['A. 单棵深决策树', 'B. 多棵决策树的集成投票', 'C. 线性回归的扩展', 'D. 神经网络的一种'], answer: 'B' },
          { question: 'F1分数是哪两个指标的调和平均？', options: ['A. 准确率和召回率', 'B. 精确率和召回率', 'C. 准确率和精确率', 'D. 以上都不是'], answer: 'B' },
        ],
      },
      {
        id: 'sklearn_04',
        title: '第4课: 监督学习 - 回归算法',
        content: `# 监督学习 - 回归算法

## 常用回归算法

- **线性回归**: 最基础，假设线性关系
- **岭回归 (Ridge)**: L2正则化，防止过拟合
- **Lasso**: L1正则化，可特征选择
- **随机森林回归**: 处理非线性关系

## 评估指标

- **MSE/RMSE**: 均方误差/均方根误差
- **MAE**: 平均绝对误差
- **R²**: 决定系数，模型解释的方差比例
`,
        code: `import numpy as np
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

X, y = make_regression(n_samples=500, n_features=5, noise=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

regressors = {
    '线性回归': LinearRegression(),
    '岭回归': Ridge(alpha=1.0),
    'Lasso': Lasso(alpha=0.1),
    '随机森林': RandomForestRegressor(n_estimators=100, random_state=42)
}

print("回归模型对比:")
print("-".repeat(60))
for name, reg in regressors.items():
    reg.fit(X_train, y_train)
    y_pred = reg.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"{name:10s} | RMSE: {rmse:8.2f} | MAE: {mae:8.2f} | R²: {r2:.4f}")`,
        quiz: [
          { question: 'R²=0.85 意味着什么？', options: ['A. 模型准确率85%', 'B. 模型解释了85%的方差', 'C. 预测误差15%', 'D. 以上都不对'], answer: 'B' },
        ],
      },
    ],
  },
  pytorch: {
    title: '深度学习 (PyTorch)',
    lessons: [
      {
        id: 'pytorch_01',
        title: '第1课: PyTorch基础 - 张量操作',
        content: `# PyTorch基础 - 张量操作

## PyTorch特点

- **动态计算图**: 更灵活的网络结构
- **Python优先**: 与NumPy类似的API
- **GPU加速**: 无缝切换CPU/GPU

## 张量 (Tensor)

张量是PyTorch的核心数据结构，类似NumPy的ndarray。
支持自动求导 (Autograd)，是训练神经网络的基础。
`,
        code: `import torch
import numpy as np

print(f"PyTorch版本: {torch.__version__}")
print(f"CUDA可用: {torch.cuda.is_available()}")

t1 = torch.tensor([1, 2, 3, 4, 5])
t2 = torch.zeros(3, 4)
t3 = torch.randn(2, 3)

print(f"\\n一维张量: {t1}")
print(f"形状: {t1.shape}, 类型: {t1.dtype}")
print(f"\\n全零矩阵:\\n{t2}")
print(f"\\n随机矩阵:\\n{t3}")

a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])
print(f"\\n加法: {a + b}")
print(f"点积: {torch.dot(a, b)}")

x = torch.tensor(2.0, requires_grad=True)
y = x ** 3 + 2 * x ** 2 + x
y.backward()
print(f"\\nx={x.item()}, y={y.item()}, dy/dx={x.grad.item()}")`,
        quiz: [
          { question: 'requires_grad=True的作用是？', options: ['A. 启用GPU加速', 'B. 启用自动求导', 'C. 冻结参数', 'D. 初始化权重'], answer: 'B' },
        ],
      },
      {
        id: 'pytorch_02',
        title: '第2课: 构建神经网络',
        content: `# 构建神经网络

## 神经网络结构

- **输入层**: 接收原始数据
- **隐藏层**: 提取特征
- **输出层**: 产生预测

## PyTorch构建网络

继承 \`nn.Module\`，在 \`__init__\` 定义层，在 \`forward\` 定义前向传播。

## 常用组件

- **ReLU**: max(0,x) - 最常用激活函数
- **CrossEntropy Loss**: 分类任务损失函数
- **Adam**: 自适应学习率优化器
`,
        code: `import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class IrisNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(4, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, 3)
        )
    def forward(self, x):
        return self.net(x)

iris = load_iris()
X = StandardScaler().fit_transform(iris.data)
y = iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

X_train_t, y_train_t = torch.FloatTensor(X_train), torch.LongTensor(y_train)
X_test_t, y_test_t = torch.FloatTensor(X_test), torch.LongTensor(y_test)

model = IrisNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

print("训练神经网络...")
for epoch in range(100):
    optimizer.zero_grad()
    loss = criterion(model(X_train_t), y_train_t)
    loss.backward()
    optimizer.step()
    if (epoch + 1) % 20 == 0:
        with torch.no_grad():
            _, predicted = torch.max(model(X_test_t), 1)
            acc = (predicted == y_test_t).float().mean()
            print(f"Epoch {epoch+1:3d} | Loss: {loss.item():.4f} | 准确率: {acc:.2%}")`,
        quiz: [
          { question: 'nn.Sequential的作用是？', options: ['A. 并行连接层', 'B. 按顺序串联层', 'C. 创建数据集', 'D. 设置优化器'], answer: 'B' },
        ],
      },
      {
        id: 'pytorch_03',
        title: '第3课: 卷积神经网络 (CNN)',
        content: `# 卷积神经网络 (CNN)

## 核心组件

- **卷积层 (Conv2d)**: 使用卷积核提取局部特征
- **池化层 (MaxPool2d)**: 降低尺寸，保留显著特征
- **全连接层 (Linear)**: 映射到输出类别

## 架构模式

\`\`\`
输入 → [卷积 → 激活 → 池化] × N → 展平 → 全连接 → 输出
\`\`\`
`,
        code: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        return self.classifier(self.features(x))

model = SimpleCNN(num_classes=10)
print("模型结构:")
print(model)

total = sum(p.numel() for p in model.parameters())
print(f"\\n总参数量: {total:,}")

dummy = torch.randn(1, 1, 28, 28)
output = model(dummy)
print(f"输入: {dummy.shape} -> 输出: {output.shape}")`,
        quiz: [
          { question: 'MaxPool2d(2)的作用是？', options: ['A. 特征图尺寸缩小一半', 'B. 特征图尺寸扩大一倍', 'C. 增加通道数', 'D. 减少通道数'], answer: 'A' },
        ],
      },
    ],
  },
};

export function getLesson(lessonId) {
  for (const cat of Object.values(LESSONS)) {
    for (const lesson of cat.lessons) {
      if (lesson.id === lessonId) return lesson;
    }
  }
  return null;
}
