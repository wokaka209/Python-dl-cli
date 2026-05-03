export const PROJECTS = [
  {
    id: 'proj_iris',
    name: '鸢尾花分类实战',
    difficulty: '入门',
    category: 'sklearn',
    description: '使用多种分类器对鸢尾花数据集进行分类',
    content: `# 项目: 鸢尾花分类实战

## 任务步骤

1. **数据加载与探索** - 加载Iris数据集，查看数据形状和特征统计
2. **数据预处理** - 划分训练/测试集，特征标准化
3. **模型训练** - 训练至少3种分类器，使用交叉验证
4. **模型评估** - 混淆矩阵、分类报告、可视化比较

## 评分标准
- 代码正确运行
- 使用3种以上算法
- 输出评估指标
`,
    starterCode: `# 鸢尾花分类实战
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report
import numpy as np

# 1. 加载数据
iris = load_iris()
X, y = iris.data, iris.target

# 2. 划分数据集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 3. 标准化
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 4. 训练模型
models = {
    '逻辑回归': LogisticRegression(max_iter=200),
    '决策树': DecisionTreeClassifier(),
    '随机森林': RandomForestClassifier(n_estimators=100),
    'SVM': SVC()
}

for name, model in models.items():
    scores = cross_val_score(model, X_train, y_train, cv=5)
    model.fit(X_train, y_train)
    test_acc = model.score(X_test, y_test)
    print(f"{name}: CV={scores.mean():.2%}, Test={test_acc:.2%}")

# 5. 详细报告
print("\\n随机森林分类报告:")
print(classification_report(y_test, models['随机森林'].predict(X_test),
                          target_names=iris.target_names))
`,
  },
  {
    id: 'proj_regression',
    name: '房价预测实战',
    difficulty: '入门',
    category: 'sklearn',
    description: '使用回归算法预测房价',
    content: `# 项目: 房价预测实战

## 任务步骤

1. **生成数据** - 使用 make_regression 生成数据
2. **特征工程** - 特征缩放、特征选择
3. **模型训练** - 线性回归、Ridge、Lasso、随机森林
4. **评估** - RMSE, MAE, R²
`,
    starterCode: `# 房价预测实战
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

X, y = make_regression(n_samples=500, n_features=10, noise=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

models = {
    '线性回归': LinearRegression(),
    '岭回归': Ridge(alpha=1.0),
    'Lasso': Lasso(alpha=0.1),
    '随机森林': RandomForestRegressor(n_estimators=100)
}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    print(f"{name}: RMSE={rmse:.2f}, R²={r2:.4f}")
`,
  },
  {
    id: 'proj_pytorch_classifier',
    name: 'PyTorch手写数字分类器',
    difficulty: '中级',
    category: 'pytorch',
    description: '用PyTorch构建神经网络对手写数字分类',
    content: `# 项目: PyTorch手写数字分类器

## 任务步骤

1. **数据准备** - 加载digits数据集，转换为张量
2. **构建网络** - 定义全连接网络
3. **训练循环** - 前向传播、损失计算、反向传播、参数更新
4. **评估** - 测试集准确率
`,
    starterCode: `# PyTorch手写数字分类器
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

digits = load_digits()
X = StandardScaler().fit_transform(digits.data)
y = digits.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
X_train_t = torch.FloatTensor(X_train)
y_train_t = torch.LongTensor(y_train)
X_test_t = torch.FloatTensor(X_test)
y_test_t = torch.LongTensor(y_test)

class DigitNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(64, 128), nn.ReLU(),
            nn.Linear(128, 64), nn.ReLU(),
            nn.Linear(64, 10)
        )
    def forward(self, x):
        return self.net(x)

model = DigitNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(200):
    optimizer.zero_grad()
    loss = criterion(model(X_train_t), y_train_t)
    loss.backward()
    optimizer.step()
    if (epoch + 1) % 40 == 0:
        with torch.no_grad():
            _, pred = torch.max(model(X_test_t), 1)
            acc = (pred == y_test_t).float().mean()
            print(f"Epoch {epoch+1}: Loss={loss.item():.4f}, Acc={acc:.2%}")
`,
  },
];
