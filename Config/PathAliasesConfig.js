import path from "path";
import { createRequire } from "module";
import { generalConfigServer } from "./GeneralConfigServer.js";

/* replace `require` with `import` after node supports `json` import */
const require = createRequire(import.meta.url);
const jsconfig = require("../jsconfig.json");

const aliases = jsconfig.compilerOptions.paths;

// converts `{path}/*` to `{path}`
const removeStars = (path) => path.slice(-2) === "/*" ? path.slice(0, -2) : path;

/**
 * @return {Record<string, string>}
 */
const getResolvedAliases = () => {
    const result = {};
    for (const key in aliases) {
        const aliasKey = removeStars(key);
        const aliasValue = removeStars(aliases[key][0]);
        const aliasPath = path.resolve(generalConfigServer.basePath, ...aliasValue.split("/"));
        result[aliasKey] = aliasPath;
    }
    return result;
};
export const resolvedAliases = getResolvedAliases();

export const jestAliasMaps = Object.entries(resolvedAliases).reduce((acc, [alias, dir]) => ({ ...acc, ...({ [`^${alias}(.*)$`]: dir + "$1" }) }), {});
