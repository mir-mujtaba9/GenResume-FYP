// jest.config.js
module.exports = {
    testEnvironment: 'jsdom', // Simulate browser environment
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Runs after Jest environment is set up
    moduleNameMapper: {
        // Handle CSS imports (if you import CSS directly into components)
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // Handle static asset imports (images, etc.)
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    transform: {
        // Use babel-jest to transpile tests with Babel
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    // Optional: collect coverage
    // collectCoverage: true,
    // coverageDirectory: "coverage",
    // coverageReporters: ["html", "text"],
};