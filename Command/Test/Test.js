import chalk from "chalk";
import {spawn} from "child_process";
import path from "path";
console.log(chalk.green('start running JEST tests') );
const jestScriptPath = path.join('node_modules', 'jest', 'bin', 'jest.js');
//show test coverage results at the end
const showCovarageReportParam = "--collect-coverage";
//bailing mean test exit when 1 number of fail happen --bail or -b
const bailParam = `--bail`;
// --detectOpenHandles handle force exists process so only use it in production readmode:https://jestjs.io/docs/cli
const detectOpenHandle = '--detectOpenHandles';
// only test tests that affect in the last commit
const LastCommitParam = "--lastCommit";
//watch for changes and dont stop the test after running
const watchParam = "--watch";
// 
const NoCache = '--no-cache';

const userArgs = process.argv.slice(2);
const params = [showCovarageReportParam, bailParam];
const testProcess = spawn(`node`,['--experimental-vm-modules', jestScriptPath, ...params, ...userArgs],{shell:true,stdio:'inherit'});
