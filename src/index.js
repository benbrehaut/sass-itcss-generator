#! /usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const args = require('yargs').argv;
const name = args._[0].toString();
const CONSTANTS = require('./constants');

// if name parameter is not passed, throw error.
if (!name) {
    throw new Error('❌ Please include the directory name');
}

init(name);

console.log(`✅ Completed`);

/**
 * Initialise the function
 * @param {string} folderName - the folder name to output to
 */
function init(folderName) {
    // If folder already exists, throw error.
    if (fs.existsSync(folderName)) {
        throw new Error('❌ Directory already exists.');
    }

    console.log(`🔨 Creating ${name} folder`);

    // Create directory passed by user
    createRootFolder(folderName);

    console.log(`🔨 Creating sub folders`);

    // Create all of the sub folders from constants
    CONSTANTS.FOLDERS.forEach(folder => {
        createFolder(folderName, folder);
    });

    // Copy the template file to the user defined folder
    createIndexFile(folderName);
}

function createRootFolder(rootFolder) {
    fs.mkdir(rootFolder, { recursive: true }, (errorHandler));
}

function createFolder(rootFolder, folder) {
    fs.mkdirSync(`${rootFolder}/${folder}`);
    fs.writeFile(`${rootFolder}/${folder}/_index.scss`, '', errorHandler);  
}

function createIndexFile(rootFolder) {
    fs.copyFile(path.resolve(__dirname, './templates/_index.scss'), `./${rootFolder}/_index.scss`, errorHandler);
}

function errorHandler(error) {
    if (error) {
        throw error;
    }
}

// Create folders inside directory
const createSubFolders = new Promise((resolve, reject) => {
});

// createSubFolders
//     .then(() => {
//     });
    

