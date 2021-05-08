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

// Create the folders and files
init(name);

// Console out completion
console.log(`✅ Completed`);

/**
 * Initialise the function
 * @param {string} folderName - the folder name to output to, comes from cli
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

/**
 * Create the root folder which contains all of the sub folders
 * @param {String} rootFolder - The name of the root folder
 */
function createRootFolder(rootFolder) {
    fs.mkdir(rootFolder, { recursive: true }, (errorHandler));
}

/**
 * Create a folder
 * @param {String} rootFolder - The name of the root folder that contains the folder
 * @param {String} folder - The name of the folder
 */
function createFolder(rootFolder, folder) {
    fs.mkdirSync(`${rootFolder}/${folder}`);
    fs.writeFile(`${rootFolder}/${folder}/_index.scss`, '', errorHandler);  
}

/**
 * Create the index Sass file that are in each folder
 * @param {String} rootFolder - The folder where the file should be created in
 */
function createIndexFile(rootFolder) {
    fs.copyFile(path.resolve(__dirname, './templates/_index.scss'), `./${rootFolder}/_index.scss`, errorHandler);
}

/**
 * Handle any errors that come from trying to create the folders and files
 * @param {Error} error - The error that comes from Node
 */
function errorHandler(error) {
    if (error) {
        throw error;
    }
}
