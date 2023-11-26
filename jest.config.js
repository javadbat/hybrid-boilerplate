import path from "path";
import { jestAliasMaps } from "./config/path-aliases-config.js";
import { generalConfigServer } from "./config/general-config-server.js";

export default async () => {
    return {
        verbose: true,
        testEnvironment:'jsdom',
        transform: {
            '\\.jsx?$': ['babel-jest', { configFile: path.join(generalConfigServer.basePath, 'command', 'test', 'babel-config.js') }]
        },
        moduleNameMapper: {
            '.*\\.(css|less|styl|scss|sass)$': path.join(generalConfigServer.basePath, 'command', 'test', 'mocks', 'style-mocks.js'),
            '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            path.join(generalConfigServer.basePath, 'command', 'test', 'mocks', 'media-mocks.js'),
            ...jestAliasMaps,
        },
        setupFiles: ['raf/polyfill', path.join(generalConfigServer.basePath, 'command', 'test', 'enzyme-config.js')],
        globals: {
            NODE_ENV: "test"
        },
        injectGlobals: false
    };
};