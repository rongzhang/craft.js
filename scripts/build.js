#!/usr/bin/env node

const { execSync } = require('child_process');
const { resolve } = require('path');
const { statSync } = require('fs');

let isWatchMode = false;
if (process.env.NODE_ENV === 'development') {
  isWatchMode = true;
}

const defaultRollupConfig = resolve(__dirname, '../rollup.config.js');
const privateRollupConfig = resolve(process.cwd(), 'rollup.config.js');
const rollupConfig = hasRollupConfig(privateRollupConfig) ? privateRollupConfig : defaultRollupConfig;

if (isWatchMode) {
  execSync('npx tsc --skipLibCheck --emitDeclarationOnly -w &');
  execSync(`npx rollup -c "${rollupConfig}" -w`);
} else {
  execSync('npx tsc --skipLibCheck --emitDeclarationOnly &');
  execSync(`npx rollup -c "${rollupConfig}"`);
}

function hasRollupConfig() {
  try {
    const stats = statSync(privateRollupConfig);
    return stats.isFile();
  } catch(e) {
    return false;
  }
}
