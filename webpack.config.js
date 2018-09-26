/* eslint-disable */
"use strict";

const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: [
    './frontend/webpack-public-path.js',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'frontend/index.js')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc.js',
          emitWarning: true,
          fix: true
        }
      },
      {test: /\.js?$/,
       loader: 'babel-loader',
       exclude: /node_modules/,
       options: {
         presets: ['@babel/preset-env','@babel/preset-react'],
         plugins: ['babel-plugin-transform-class-properties', 'react-hot-loader/babel']
       }
      },
      {test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
      {test: /\.css/, loader: 'style-loader!css-loader' },
      {test:/\.png$/,loader:'url-loader',query:{mimetype:'image/png',name:'./public/css/semantic/themes/default/assets/images/flags.png'}},
      {test:/\.svg$/,loader:'url-loader',query:{mimetype:'image/svg+xml',name:'./public/css/semantic/themes/default/assets/fonts/icons.svg'}},
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
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './public',
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  plugins: [
    new Dotenv({path: './.env.frontend'}),
    new CleanWebpackPlugin(['public']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'frontend/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ]
};
