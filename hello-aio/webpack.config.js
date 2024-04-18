const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './actions/index.js',
	plugins: [
		new webpack.node.NodeTargetPlugin(),
	],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'spin.js',
        library: 'spin'
    },
    optimization: {
        minimize: false
    },
};
