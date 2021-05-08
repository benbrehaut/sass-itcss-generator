#! /usr/bin/env node
'use strict'

import { readFile } from 'fs';

const nvmFile = '../.nvmrc';

readFile(new URL(nvmFile, import.meta.url), 'utf8', function (err, content) {
  if (err) {
    throw Error;
  }

  const nodeVersion = process.version.replace('v', '');
  const nvmVersion = content;

  // If Node JS version is exactly or higher than the nvm file
  if (nodeVersion >= nvmVersion) {
    process.exit();
  }
  
  // If Node JS version is less than the nvm file
  if (nodeVersion < nvmVersion) {
    console.log(`Warning: You are using a Node JS version which is not supported. Please install a version that is or higher than ${nvmVersion}`);
    process.exit(1);
  }
});
