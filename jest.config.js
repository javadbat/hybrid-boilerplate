import path from "path";
import { jestAliasMaps } from "./config/path-aliases-config.js";
import { generalConfigServer } from "./config/general-config-server.js";

export default async () => {
    return {
        verbose: true,
        testEnvironment:'jsdom',
        transform: {
            "^.*\.html$":path.join(generalConfigServer.basePath,'command','test','mocks','html-transform.js'),
            '^(?!.*web-components).*\.(js|jsx|tsx|ts)?$': ['babel-jest', { configFile: path.join(generalConfigServer.basePath, 'config', 'babel.config.json') }],
            '^.*web-components.*\.(js|jsx|tsx|ts)?$': ['ts-jest', { tsconfig: path.join(generalConfigServer.basePath, 'tsconfig-modules.json' ) ,useESM:true}],
        },
        moduleNameMapper: {
            // '.*\\.(css|less|styl|scss|sass)$': path.join(generalConfigServer.basePath, 'command', 'test', 'mocks', 'style-mocks.js'),
            '.*\\.(css|less|styl|scss|sass)$': ['babel-jest', { configFile: path.join(generalConfigServer.basePath, 'config', 'babel.config.json') }],
            '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            path.join(generalConfigServer.basePath, 'command', 'test', 'mocks', 'media-mocks.js'),
            ...jestAliasMaps,
        },
        setupFiles: ['raf/polyfill'],
        globals: {
            NODE_ENV: "test"
        },
        injectGlobals: false
    };
};