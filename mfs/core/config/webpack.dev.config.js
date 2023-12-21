const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: './dist',
    }
};

module.exports = merge(common, devConfig);