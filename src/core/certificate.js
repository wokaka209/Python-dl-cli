import { CERTIFICATES } from '../data/certificates.js';
import { addCertificate, getCertificates, getUsername, _loadProgress } from './tracker.js';
import chalk from 'chalk';

export function checkCertificates() {
  const data = _loadProgress();
  const completed = new Set(data.completed_lessons || []);
  const completedProjects = new Set(data.completed_projects || []);
  const existingIds = (data.certificates || []).map(c => c.id);

  const newCerts = [];
  for (const [certId, cert] of Object.entries(CERTIFICATES)) {
    if (existingIds.includes(certId)) continue;
    const required = new Set(cert.requiredLessons);
    const isSubset = [...required].every(id => completed.has(id));
    if (!isSubset) continue;
    if (certId === 'ml_master' && completedProjects.size < 3) continue;
    addCertificate(certId, cert.name);
    newCerts.push(cert.name);
  }
  return newCerts;
}

export function showCertificates() {
  const username = getUsername() || '学员';
  const certs = getCertificates();

  if (!certs.length) {
    console.log(chalk.yellow('还没有获得任何证书。完成课程和项目后自动颁发！'));
    return;
  }

  for (const cert of certs) {
    const date = (cert.date || '未知').slice(0, 10);
    renderCertificate(username, cert.name, date);
  }
}

function renderCertificate(username, certName, date) {
  console.log();
  console.log(chalk.cyan.bold('╔══════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('║                    ') + chalk.white.bold('荣 誉 证 书') + chalk.cyan.bold('                       ║'));
  console.log(chalk.cyan.bold('║                    ') + chalk.dim('CERTIFICATE OF COMPLETION') + chalk.cyan.bold('            ║'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('║    兹证明 ') + chalk.yellow.bold(username) + chalk.cyan.bold(' 同学                       ║'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('║    已完成 ') + chalk.green.bold(certName) + chalk.cyan.bold('            ║'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('║    的全部学习要求，特发此证。                             ║'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('║    颁发日期: ') + chalk.white(date) + chalk.cyan.bold('                               ║'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('║    ') + chalk.dim('Python 机器学习学习软件 - 研究生版') + chalk.cyan.bold('               ║'));
  console.log(chalk.cyan.bold('║                                                          ║'));
  console.log(chalk.cyan.bold('╚══════════════════════════════════════════════════════════╝'));
  console.log();
}

export function showCertificateProgress() {
  const data = _loadProgress();
  const completed = new Set(data.completed_lessons || []);
  const completedProjects = new Set(data.completed_projects || []);

  console.log();
  console.log(chalk.cyan.bold('═══ 证书获取进度 ═══'));
  console.log();

  for (const [certId, cert] of Object.entries(CERTIFICATES)) {
    const required = new Set(cert.requiredLessons);
    const done = [...required].filter(id => completed.has(id));
    const pct = required.size > 0 ? (done.length / required.size * 100) : 0;
    let status = pct === 100 ? '已获得' : `${Math.round(pct)}%`;

    let extra = '';
    if (certId === 'ml_master') {
      const projCount = completedProjects.size;
      extra = ` | 项目: ${projCount}/3`;
      if (pct === 100 && projCount < 3) {
        status = `课程完成 | 项目: ${projCount}/3`;
      }
    }

    console.log(`  ${chalk.bold(cert.name)}`);
    console.log(`    要求: ${cert.requirement}`);
    console.log(`    进度: ${status}${extra}`);
    console.log();
  }
}
