const exec = require("child_process").exec;
const del = require("del");

describe('Running the command', () => {
    it('Should fail if no name parameter is not passed', async () => {
        const data =  await runModule('', '.');

        expect(data.code).toBe(1);
    });

    it('Should create the directory without errors', async () => {
        const TEST_FOLDER_NAME = 'jest_test';
        const data =  await runModule(TEST_FOLDER_NAME);

        expect(data.code).toBe(0);
        expect(data.stdout).toContain(TEST_FOLDER_NAME);
        del.sync(TEST_FOLDER_NAME);
    });
});

/**
 * Run sass-itcss-generator through node and esm package
 * @param {String} folderName - Arguments from the cli
 * @param {*} cwd - Any options to pass to the exec command 
 */
function runModule(folderName, cwd) {
    return new Promise((resolve) => {
        exec(`node -r esm ./src/cli.js ${folderName}`, { cwd }, (error, stdout, stderr) => {
            resolve({
                code: error && error.code ? error.code : 0,
                error,
                stdout,
                stderr
            });
        })
    })
}
