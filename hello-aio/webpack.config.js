const path = require('path');

module.exports = {
    entry: './actions/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'spin.js',
        library: 'spin'
    },
    optimization: {
        minimize: false
    },
};
