/*
* Webpack configuration. For more information visit
* http://webpack.github.io/docs/configuration
* https://github.com/petehunt/webpack-howto
*/

'use strict';

var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    FOLDERS = {
        APP   : path.join(__dirname, '..', 'app'),
        BUILD : path.join(__dirname, '..', 'build'),
        BOWER : path.join(__dirname, '..', 'app', 'bower_components'),
        NPM   : path.join(__dirname, '..', 'node_modules')
    };


module.exports = {

    profile: false,
    cache: false,
    debug: false,
    devtool: false,
    context: FOLDERS.APP,

    entry: {
        main: [
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
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            compress: {
                dead_code: (process.env.NODE_ENV !== 'development'),
                drop_console: (process.env.NODE_ENV !== 'development'),
                drop_debugger: (process.env.NODE_ENV !== 'development')
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin('vendor.[hash].js'),
        new webpack.ProvidePlugin({
            'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin('styles.[hash].css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            publicPath: '/',
            // favicon: 'app/assets/favicon.ico',
            inject: true
        })
    ],


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
                loader: 'url?limit=10000&image?bypassOnDebug&optimizationLevel=8&+progressive&-interlaced',
                exclude: /(node_modules|bower_components|assets\/external)/
            },
            {
                test: /\.s*css$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass?' + [
                    'imagePath=' + path.join(FOLDERS.APP, 'assets'),
                    'includePaths[]=' + path.join(FOLDERS.BOWER, 'bourbon', 'dist'),
                    'outputStyle=compressed'
                ].join('&')),
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.ejs$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ejs'
            },
            { test: /\.json$/, loader: 'json' }
        ]
    }

};
