import {resolve} from "jsr:@std/path";
import { serverConfig } from "@config/server-config.ts";
// WARNING: do not use this file inside client code
//TODO: change alias source from tsconfig to deno config
const tsconfig = await import("../tsconfig.json",{with: { type: "json" }}) ;

const aliases:Record<string,string[]> = tsconfig.default.compilerOptions.paths;

// converts `{path}/*` to `{path}`
const removeStars = (path:string) => path.slice(-2) === "/*" ? path.slice(0, -2) : path;

/**
 * @description convert jsconfig paths to webpack aliases
 */
const getResolvedAliases = (): Record<string, string> => {
    const result:Record<string,string> = {};
    // eslint-disable-next-line guard-for-in
    for (const key in aliases) {
        const aliasKey = removeStars(key);
        const aliasValue = removeStars(aliases[key][0]);
        const aliasPath = resolve(serverConfig.basePath, ...aliasValue.split("/"));
        result[aliasKey] = aliasPath;
    }
    return result;
};
export const resolvedAliases = getResolvedAliases();

/**
 * convert jsconfig paths to jest path aliases
 */
export const jestAliasMaps = Object.entries(resolvedAliases).reduce((acc, [alias, dir]) => ({ ...acc, ...({ [`^${alias}(.*)$`]: dir + "$1" }) }), {});
