import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const SAFE_MODULES = {
  numpy: 'import numpy as np',
  np: 'import numpy as np',
  pandas: 'import pandas as pd',
  pd: 'import pandas as pd',
  sklearn: 'import sklearn',
  torch: 'import torch',
  matplotlib: 'import matplotlib.pyplot as plt',
  plt: 'import matplotlib.pyplot as plt',
};

function shouldImport(alias, code) {
  const pattern = new RegExp(`(?<![a-zA-Z0-9_])${alias}(?![a-zA-Z0-9_])`);
  return pattern.test(code);
}

export function runCode(code, timeout = 30) {
  return new Promise((resolve) => {
    let preamble = 'import warnings; warnings.filterwarnings(\'ignore\')\n';
    for (const [alias, importStmt] of Object.entries(SAFE_MODULES)) {
      if (shouldImport(alias, code) && !code.includes(importStmt)) {
        preamble += importStmt + '\n';
      }
    }

    const fullCode = preamble + code;

    // Write code to temp file to avoid shell escaping issues
    const tmpFile = path.join(os.tmpdir(), `ml_learn_${Date.now()}.py`);
    fs.writeFileSync(tmpFile, fullCode, 'utf-8');

    let stdout = '';
    let stderr = '';
    let killed = false;

    const proc = spawn('python', [tmpFile]);

    proc.stdout.on('data', (data) => { stdout += data.toString(); });
    proc.stderr.on('data', (data) => { stderr += data.toString(); });

    const timer = setTimeout(() => {
      killed = true;
      proc.kill('SIGTERM');
    }, timeout * 1000);

    proc.on('close', (code) => {
      clearTimeout(timer);
      // Clean up temp file
      try { fs.unlinkSync(tmpFile); } catch {}
      if (killed) {
        stderr += `\n[超时] 代码执行超过 ${timeout} 秒`;
      }
      resolve({
        stdout,
        stderr,
        success: code === 0 && !killed,
      });
    });

    proc.on('error', (err) => {
      clearTimeout(timer);
      try { fs.unlinkSync(tmpFile); } catch {}
      resolve({
        stdout: '',
        stderr: err.message,
        success: false,
      });
    });
  });
}
