import path from "path";
import { createRequire } from "module";
import { generalConfigServer } from "./general-config-server.js";
// WARNIING: do not use this file iinsiide client code
/* replace `require` with `import` after node supports `json` import */
const require = createRequire(import.meta.url);
const jsconfig = require("../jsconfig.json");

const aliases = jsconfig.compilerOptions.paths;

// converts `{path}/*` to `{path}`
const removeStars = (path) => path.slice(-2) === "/*" ? path.slice(0, -2) : path;

/**
 * convert jsconfig paths to webpack aliases
 * @return {Record<string, string>}
 */
const getResolvedAliases = () => {
    const result = {};
    // eslint-disable-next-line guard-for-in
    for (const key in aliases) {
        const aliasKey = removeStars(key);
        const aliasValue = removeStars(aliases[key][0]);
        const aliasPath = path.resolve(generalConfigServer.basePath, ...aliasValue.split("/"));
        result[aliasKey] = aliasPath;
    }
    return result;
};
export const resolvedAliases = getResolvedAliases();

/**
 * convert jsconfig paths to jest path aliases
 */
export const jestAliasMaps = Object.entries(resolvedAliases).reduce((acc, [alias, dir]) => ({ ...acc, ...({ [`^${alias}(.*)$`]: dir + "$1" }) }), {});
