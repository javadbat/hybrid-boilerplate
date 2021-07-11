import chalk from "chalk";
import {spawn} from "child_process";
import path from "path";
console.log(chalk.green('start running JEST tests') );
const jestScriptPath = path.join('node_modules', 'jest', 'bin', 'jest.js');
const testProcess = spawn(`node`,['--experimental-vm-modules', jestScriptPath],{shell:true,stdio:'inherit'});
