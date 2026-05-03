export const CERTIFICATES = {
  sklearn_basic: {
    name: '经典机器学习基础证书',
    requirement: '完成所有Scikit-learn课程 (4门)',
    requiredLessons: ['sklearn_01', 'sklearn_02', 'sklearn_03', 'sklearn_04'],
  },
  pytorch_basic: {
    name: '深度学习基础证书',
    requirement: '完成所有PyTorch课程 (3门)',
    requiredLessons: ['pytorch_01', 'pytorch_02', 'pytorch_03'],
  },
  ml_master: {
    name: '机器学习大师证书',
    requirement: '完成所有课程 + 3个实战项目',
    requiredLessons: [
      'sklearn_01', 'sklearn_02', 'sklearn_03', 'sklearn_04',
      'pytorch_01', 'pytorch_02', 'pytorch_03',
    ],
  },
};
