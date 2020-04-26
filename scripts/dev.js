#!/usr/bin/env node

const { execSync } = require('child_process');
const { resolve } = require('path');

const cwd = resolve(__dirname, '..');

console.log('clean');
execSync('npx lerna run clean --stream', { cwd });

console.log('build type definitons for utils');
execSync('npx tsc --p packages/utils --skipLibCheck --emitDeclarationOnly', { cwd });

console.log('build type definitons for core')
execSync('npx tsc --p packages/core --skipLibCheck --emitDeclarationOnly', { cwd });

console.log('start');
execSync('npx lerna run start --parallel --ignore docs', { cwd });
