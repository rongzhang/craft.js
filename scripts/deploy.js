#!/usr/bin/env node

const { execSync } = require('child_process');
const { resolve } = require('path');
const { copy, emptyDir, ensureDir, outputFile } = require('fs-extra');

const pathSite = resolve(__dirname, '../site');
const pathExamples = resolve(pathSite, 'examples');
const pathPackages = resolve(__dirname, '../packages');
const pathDocs = resolve(pathPackages, 'docs/build');
const pathSrcExamples = resolve(pathPackages, 'examples');
const pathNojekyll = resolve(pathSite, '.nojekyll');
const pathCName = resolve(pathSite, 'CNAME');

emptyDir(pathSite)
  .then(() => ensureDir(pathExamples))
  .then(async () => {
    try {
      execSync('yarn clean ');
      execSync('yarn build:all');
      execSync('lerna run export --stream');

      await copy(resolve(pathSrcExamples, 'landing/out'), pathSite);
      await copy(resolve(pathSrcExamples, 'landing/seo'), pathSite);
      await copy(resolve(pathSrcExamples, 'basic/out'), resolve(pathExamples, 'basic'));
      await copy(pathDocs, resolve(pathSite, 'r'));

      await outputFile(pathNojekyll, '');
      await outputFile(pathCName, 'craft.js.org');
    } catch (error) {
      throw error;
    }

  })
  .catch(console.error);
