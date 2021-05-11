#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { sassItcssGenerator } from './index';
const argv = yargs(hideBin(process.argv)).argv;
const name = argv._[0].toString();

// if name parameter is not passed, throw error.
if (!name) {
    throw new Error('❌ Please include the directory name');
}

// Run the code
sassItcssGenerator(name);