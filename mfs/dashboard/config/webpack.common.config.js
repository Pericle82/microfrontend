const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const federationConfig  = require('./federation.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const isDevelopment = process.env.NODE_ENV === 'development';

// For our css modules these will be locally scoped
const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
    modules: {
        localIdentName: isDevelopment ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]',
    },
    importLoaders: 2,
    sourceMap: false, // turned off as causes delay
   }
 }
 // For our normal CSS files we would like them globally scoped
 const CSSLoader = {
    loader: 'css-loader',
    options: {
    modules: "global",
    importLoaders: 2,
    sourceMap: false, // turned off as causes delay
   }
 }
 // Our PostCSSLoader

 const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: false, // turned off as causes delay
    }
 }

 // Standard style loader (prod and dev covered here)
const styleLoader = isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
    entry: {
        app: ['./src/index.ts']    
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'auto'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [styleLoader, CSSLoader, PostCSSLoader, "sass-loader"]
               },
               {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [styleLoader, CSSModuleLoader, PostCSSLoader, "sass-loader"]
               }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        }),
        require('autoprefixer'),
        new ModuleFederationPlugin(federationConfig)
    ]
};