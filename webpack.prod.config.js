"use strict";

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './frontend/index'
    ],
    module: {
        rules: [
            { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test:/\.svg$/,loader:'url-loader',query:{mimetype:'image/svg+xml',name:'./public/css/semantic/themes/default/assets/fonts/icons.svg'}},
            {test:/\.png$/,loader:'url-loader',query:{mimetype:'image/png',name:'./public/css/semantic/themes/default/assets/images/flags.png'}},
            {test:/\.woff$/,loader:'url-loader',query:{mimetype:'application/font-woff',name:'./public/css/semantic/themes/default/assets/fonts/icons.woff'}},
            {test:/\.woff2$/,loader:'url-loader',query:{mimetype:'application/font-woff2',name:'./public/css/semantic/themes/default/assets/fonts/icons.woff2'}},
            {test:/\.[ot]tf$/,loader:'url-loader',query:{mimetype:'application/octet-stream',name:'./public/css/semantic/themes/default/assets/fonts/icons.ttf'}},
            {test:/\.eot$/,loader:'url-loader',query:{mimetype:'application/vnd.ms-fontobject',name:'./public/css/semantic/themes/default/assets/fonts/icons.eot'}},
            {test: /\.json$/,loader: 'json-loader'}
        ],
    },
    resolve: {
        extensions: ['.js', '.less', '.css']
    },
    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: './public',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
