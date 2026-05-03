export const DATASETS = {
  iris: { name: '鸢尾花 (Iris)', description: '150样本, 4特征, 3类别', task: '分类', load: 'from sklearn.datasets import load_iris' },
  wine: { name: '红酒 (Wine)', description: '178样本, 13特征, 3类别', task: '分类', load: 'from sklearn.datasets import load_wine' },
  digits: { name: '手写数字 (Digits)', description: '1797个8x8图像, 10类别', task: '分类/图像', load: 'from sklearn.datasets import load_digits' },
  make_classification: { name: '合成分类数据', description: '可自定义的分类数据生成器', task: '分类', load: 'from sklearn.datasets import make_classification' },
  make_regression: { name: '合成回归数据', description: '可自定义的回归数据生成器', task: '回归', load: 'from sklearn.datasets import make_regression' },
};
