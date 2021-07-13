import path from "path";
import generalConfig from "./Config/GeneralConfigServer.js";

export default async () => {
    return {
        verbose: true,
        testEnvironment:'jsdom',
        transform: {
            '\\.js$': ['babel-jest', { configFile: path.join(generalConfig.basePath, 'Command', 'Test', 'BabelConfig.js') }]
        },
        moduleNameMapper: {
            "^.+\\.(css|less|scss)$": "babel-jest"
        },
        setupFiles: [path.join(generalConfig.basePath, 'Command', 'Test', 'EnzymeConfig.js')],
        globals: {
            NODE_ENV: "test"
        },
    };
};