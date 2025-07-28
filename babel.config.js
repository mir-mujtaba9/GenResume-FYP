// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env', // For compiling modern JavaScript down
        ['@babel/preset-react', { runtime: 'automatic' }] // For compiling JSX
    ]
};