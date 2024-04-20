import path from "path";
import fs from "fs";

function process(sourceText, sourcePath, options) {
  const code  = `module.exports = \`${sourceText}\`;`
  return {
    code,
  };
  // return {
  //   code: `module.exports = \`${fs.readFileSync(sourcePath)}\`;`,
  // };
}

const transformer = {
  process,
};

export default transformer;