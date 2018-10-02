'use strict';

require('dotenv').config();
const path = require('path');
// const env = require('firebase-functions').config().env
const production = process.env.NODE_ENV === 'production';


const ExtractTextPlugin =require('extract-text-webpack-plugin');
const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

let plugins;

if (production === 'production'){
  plugins = [
    new EnvironmentPlugin(['NODE_ENV']),
    new HTMLPlugin({template: `${__dirname}/src/index.html`}),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async'
    // }),
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
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async'
    // }),
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

console.log('PRODUCTION ENVIRONMENT', 'production?', production, process.env.FIREBASE_CONFIG)

if (production==='production')
  plugins = plugins.concat([new CleanPlugin(), new UglifyPlugin()])

module.exports = {
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
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/ ,
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