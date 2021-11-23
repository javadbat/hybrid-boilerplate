
import path from "path";
import jsConfig from "../jsconfig.json";
import generalConfig from "./GeneralConfigServer.js";

export const resolvedAliases = Object.fromEntries(Object.entries(jsConfig.compilerOptions.paths).map(([key, value]) => [key, path.resolve(generalConfig.basePath, value[0])]));
