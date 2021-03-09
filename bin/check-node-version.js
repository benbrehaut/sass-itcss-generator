#! /usr/bin/env node

'use strict'

const fs = require('fs');
const path = require('path');

const nvmFile = '../.nvmrc';

fs.readFile(path.join(__dirname, nvmFile), 'utf8', function (err, content) {
  if (err) {
    throw Error;
  }

  const nodeVerison = process.version.replace('v', '');
  const nvmVersion = content;

  // If Node JS version is exactly or higher than the nvm file
  if (nodeVerison >= nvmVersion) {
    process.exit();
  }
  
  // If Node JS version is less than the nvm file
  if (nodeVerison < nvmVersion) {
    console.log(`Warning: You are using a Node JS version which is not supported. Please install a version that is or higher than ${nvmVersion}`);
    process.exit(1);
  }
});
