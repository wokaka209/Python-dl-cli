import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadProgress() {
  ensureDataDir();
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return {
    user_name: '',
    start_date: new Date().toISOString(),
    completed_lessons: [],
    completed_projects: [],
    quiz_scores: {},
    playground_runs: 0,
    total_study_minutes: 0,
    last_active: new Date().toISOString(),
    certificates: [],
  };
}

function saveProgress(data) {
  ensureDataDir();
  data.last_active = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function setUsername(name) {
  const data = loadProgress();
  data.user_name = name;
  saveProgress(data);
}

export function getUsername() {
  return loadProgress().user_name || '';
}

export function completeLesson(lessonId) {
  const data = loadProgress();
  if (!data.completed_lessons.includes(lessonId)) {
    data.completed_lessons.push(lessonId);
  }
  saveProgress(data);
}

export function isLessonCompleted(lessonId) {
  return loadProgress().completed_lessons.includes(lessonId);
}

export function saveQuizScore(lessonId, score, total) {
  const data = loadProgress();
  data.quiz_scores[lessonId] = { score, total, date: new Date().toISOString() };
  saveProgress(data);
}

export function completeProject(projectId) {
  const data = loadProgress();
  if (!data.completed_projects.includes(projectId)) {
    data.completed_projects.push(projectId);
  }
  saveProgress(data);
}

export function incrementPlaygroundRuns() {
  const data = loadProgress();
  data.playground_runs = (data.playground_runs || 0) + 1;
  saveProgress(data);
}

export function addStudyTime(minutes) {
  const data = loadProgress();
  data.total_study_minutes = (data.total_study_minutes || 0) + minutes;
  saveProgress(data);
}

export function getProgressSummary() {
  const data = loadProgress();
  return {
    '用户名': data.user_name || '未设置',
    '已完成课程': (data.completed_lessons || []).length,
    '已完成项目': (data.completed_projects || []).length,
    '测验记录': Object.keys(data.quiz_scores || {}).length,
    '代码运行次数': data.playground_runs || 0,
    '总学习时长(分钟)': data.total_study_minutes || 0,
    '获得证书': (data.certificates || []).length,
    '开始日期': data.start_date || '未知',
    '最后活跃': data.last_active || '未知',
  };
}

export function addCertificate(certId, certName) {
  const data = loadProgress();
  const existingIds = (data.certificates || []).map(c => c.id);
  if (!existingIds.includes(certId)) {
    data.certificates.push({ id: certId, name: certName, date: new Date().toISOString() });
  }
  saveProgress(data);
}

export function getCertificates() {
  return loadProgress().certificates || [];
}

export function _loadProgress() {
  return loadProgress();
}
