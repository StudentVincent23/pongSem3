// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/path/to/your/test.setup.js'], // replace with the actual path to your setup file
    testEnvironment: 'jsdom',
};

const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;