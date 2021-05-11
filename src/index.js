'use strict';

import { existsSync, mkdir, mkdirSync, writeFile, copyFile } from 'fs';
import { FOLDERS } from './constants.js';

/**
 * Create the folders and files
 * @param {string} folderName - The folder name to output to, comes from cli
 */
export function sassItcssGenerator(folderName) {
    // If folder already exists, throw error.
    if (existsSync(folderName)) {
        throw new Error('❌ Directory already exists.');
    }

    console.log(`🔨 Creating ${folderName} folder`);

    // Create directory passed by user
    createRootFolder(folderName);

    console.log(`🔨 Creating sub folders`);

    // Create all of the sub folders from constants
    FOLDERS.forEach(folder => {
        createFolder(folderName, folder);
    });

    // Copy the template file to the user defined folder
    createIndexFile(folderName);

    // Console out completion
    console.log(`✅ Completed`);
}

/**
 * Create the root folder which contains all of the sub folders
 * @param {String} rootFolder - The name of the root folder
 */
function createRootFolder(rootFolder) {
    mkdir(rootFolder, { recursive: true }, (errorHandler));
}

/**
 * Create a folder
 * @param {String} rootFolder - The name of the root folder that contains the folder
 * @param {String} folder - The name of the folder
 */
function createFolder(rootFolder, folder) {
    mkdirSync(`${rootFolder}/${folder}`);
    writeFile(`${rootFolder}/${folder}/_index.scss`, '', errorHandler);  
}

/**
 * Create the index Sass file that are in each folder
 * @param {String} rootFolder - The folder where the file should be created in
 */
function createIndexFile(rootFolder) {
    copyFile(new URL('./templates/_index.scss', import.meta.url), `./${rootFolder}/_index.scss`, errorHandler);
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
