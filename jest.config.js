import path from "path";
import generalConfig from "./Config/GeneralConfigServer.js";

export default async () => {
    return {
        verbose: true,
        testEnvironment:'jsdom',
        transform: {
            '\\.jsx?$': ['babel-jest', { configFile: path.join(generalConfig.basePath, 'Command', 'Test', 'BabelConfig.js') }]
        },
        moduleNameMapper: {
            '.*\\.(css|less|styl|scss|sass)$': path.join(generalConfig.basePath, 'Command', 'Test', 'mocks', 'styleMocks.js'),
            '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            path.join(generalConfig.basePath, 'Command', 'Test', 'mocks', 'mediaMocks.js'),
        },
        setupFiles: ['raf/polyfill', path.join(generalConfig.basePath, 'Command', 'Test', 'EnzymeConfig.js')],
        globals: {
            NODE_ENV: "test"
        },
    };
};