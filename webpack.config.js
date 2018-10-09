'use strict';

require('dotenv').config();
const path = require('path');
const production = process.env.NODE_ENV === 'production';


const { DefinePlugin, EnvironmentPlugin} = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


let plugins;

console.log("PRODUCTION", production)
if (production){
  plugins = [
    new EnvironmentPlugin(['NODE_ENV']),
    new HTMLPlugin({template: `${__dirname}/src/index.html`}),
    new DefinePlugin({
      __DEBUG__: JSON.stringify(production),
      __API_URL__: JSON.stringify(process.env.API_URL),
      __AUTH0_AUDIENCE__: JSON.stringify(process.env.AUTH0_AUDIENCE),
      __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      __AUTH0_CLIENT_DOMAIN__: JSON.stringify(process.env.AUTH0_CLIENT_DOMAIN),
      __POLLER_APP__: JSON.stringify(process.env.POLLER_APP),
      __AUTH0_REDIRECT_URI__:JSON.stringify(process.env.AUTH0_REDIRECT_URI),
      __ORIGIN__: JSON.stringify(process.env.ORIGIN)

    }),
  ]
} else {
  plugins = [
    new EnvironmentPlugin(['NODE_ENV']),
    new HTMLPlugin({template: `${__dirname}/src/index.html`}),
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to webpack's options.context.
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      // Either a string of object hash function given a webpack config.
      configHash: function(webpackConfig) {
        // node-object-hash on npm can be used to build this.
        return require('node-object-hash')({sort: false}).hash(webpackConfig);
      },
      // Either false, a string, an object, or a project hashing function.
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: [
          'package-lock.json', 
          // 'yarn.lock'
        ],
      },
      // An object.
      info: {
        // 'none' or 'test'.
        mode: 'none',
        // 'debug', 'log', 'info', 'warn', or 'error'.
        level: 'debug',
      },
      // Clean up large, old caches automatically.
      cachePrune: {
        // Caches younger than `maxAge` are not considered for deletion. They must
        // be at least this (default: 2 days) old in milliseconds.
        maxAge: 2 * 24 * 60 * 60 * 1000,
        // All caches together must be larger than `sizeThreshold` before any
        // caches will be deleted. Together they must be at least this
        // (default: 50 MB) big in bytes.
        sizeThreshold: 50 * 1024 * 1024
      },
    }),
    
    new DefinePlugin({
      __DEBUG__: JSON.stringify(production),
      __API_URL__: JSON.stringify(process.env.API_URL),
      __AUTH0_AUDIENCE__: JSON.stringify(process.env.AUTH0_AUDIENCE),
      __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      __AUTH0_CLIENT_DOMAIN__: JSON.stringify(process.env.AUTH0_CLIENT_DOMAIN),
      __POLLER_APP__: JSON.stringify(process.env.POLLER_APP),
      __AUTH0_REDIRECT_URI__:JSON.stringify(process.env.AUTH0_REDIRECT_URI),
      __ORIGIN__: JSON.stringify(process.env.ORIGIN)
    }),
  ]
}

if (production==='production')
  plugins = plugins.concat([new CleanPlugin(), new UglifyPlugin()])

module.exports = {
  // target: 'node',
  mode:'production',
  plugins,
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'bundle-[hash].js',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/ ,
        loader: 'babel-loader',
      },
      {
        test: /\.(pdf|jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.icon.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 60000,
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'sass-loader',
            options: {
              fallbackLoader: "style-loader",
              sourceMap: true,
              includePaths: [`${__dirname}/src/style`],
            },
          },
      ]          
      },
      {
        test: /\.icon.svg$/,
        loader: 'raw-loader',
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.ejs$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[hash:8].[ext]',
        },
      },
      // { test: /node_modules/ecstatic/lib/ecstatic.js/,
      //   loaders: ['shebang-loader'] }
      
    ],
  },
}