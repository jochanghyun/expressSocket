'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: [
    './src/views/ts/index.ts',
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ],
        exclude: ["/node_modules"]
      }
    ]
  },
  plugins: [
    /**
     * Remove build folder before building.
     * @see https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin(),
    /**
     * Simplifies creation of HTML files to serve your webpack bundles.
     * @see https://github.com/jantimon/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      filename: './src/views/index.html',
      template: './src/index.ejs'
    }),
    /**
     * This plugin extracts CSS into separate files.
     * It creates a CSS file per JS file which contains CSS.
     * @see https://github.com/webpack-contrib/mini-css-extract-plugin
     */
    new MiniCssExtractPlugin({
      chunkFilename: 'static/css/[name].[hash].css',
      filename: 'static/[name].[hash].css'
    })
  ]
}