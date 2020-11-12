// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    globals: {
        "ts-jest": {
            diagnostics: false,
            tsconfig: "<rootDir>/tsconfig.json",
        },
    },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    modulePathIgnorePatterns: ["<rootDir>/dist"],
    preset: "ts-jest",
    restoreMocks: true,
    testEnvironment: "node",
};
