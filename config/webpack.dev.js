/*
* Webpack configuration. For more information visit
* http://webpack.github.io/docs/configuration
* https://github.com/petehunt/webpack-howto
*/

'use strict';

var fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FOLDERS = {
        APP   : path.join(__dirname, '..', 'app'),
        BUILD : path.join(__dirname, '..', 'build'),
        BOWER : path.join(__dirname, '..', 'app', 'bower_components'),
        NPM   : path.join(__dirname, '..', 'node_modules')
    };


module.exports = {

    profile: true,
    cache: true,
    debug: true,
    devtool: 'eval-source-map',
    context: FOLDERS.APP,

    entry: {
        main: [
            'webpack/hot/dev-server',
            './application.js'
        ]
    },

    output: {
        path: FOLDERS.BUILD,
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js'
    },

    resolve: {
        // modulesDirectories: [FOLDERS.NPM, FOLDERS.BOWER],
        alias: {

        }
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            webpackDevServer: '/webpack-dev-server.js',
            publicPath: '/',
            // favicon: 'app/assets/favicon.ico',
            inject: true
        }),
        new webpack.ProvidePlugin({
            'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    optional: ['runtime'],
                    stage: 2
                }
            },
            {
                test: /\.(gif|jpg|png)$/,
                loader: 'file?name=[path][name].[ext]?[hash]',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.s*css$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 2 version',
                    'sass?imagePath=' + path.join(FOLDERS.APP, 'assets') + '&includePaths[]=' + path.join(FOLDERS.BOWER, 'bourbon', 'dist')
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.ejs$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ejs'
            },
            { test: /\.json$/, loader: 'json' }
        ]
    },

    devServer: {
        inline : true,
        hot    : true,
        quiet  : false,
        noInfo : false,
        colors : true,
        lazy   : false,
        host   : 'localhost',
        https  : false,
        historyApiFallback : true
    }

};
