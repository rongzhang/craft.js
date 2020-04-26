#!/usr/bin/env node

const { execSync } = require('child_process');
const { resolve } = require('path');
const { mkdirSync } = require('fs');
const rimraf = require('rimraf');

const pathSite = resolve(__dirname, '../site');

rimraf(pathSite,
  { glob: false },
  err => {
    if (err) throw err;

    execSync('yarn clean ');
    execSync('yarn build:all');
    execSync('lerna run export --stream');

    mkdirSync(pathSite);
  }
)

/*
mkdir site
cp -r ./packages/examples/landing/out/* site/
cp -r ./packages/examples/landing/seo/* site/
cp -r ./packages/docs/build site/r
mkdir site/examples
cp -r ./packages/examples/basic/out/ site/examples/basic

touch site/.nojekyll
touch site/CNAME
echo "craft.js.org" >> site/CNAME
*/