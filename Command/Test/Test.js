import chalk from "chalk";
import {spawn} from "child_process";
import path from "path";
console.log(chalk.green('start running JEST tests') );
const jestScriptPath = path.join('node_modules', 'jest', 'bin', 'jest.js');
// --detectOpenHandles handle force exists process so only use it in production readmode:https://jestjs.io/docs/cli
const testProcess = spawn(`node`,['--experimental-vm-modules', jestScriptPath, '--detectOpenHandles', '--no-cache'],{shell:true,stdio:'inherit'});