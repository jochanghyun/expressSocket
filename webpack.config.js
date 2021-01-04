const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const context = path.join(__dirname, '');
module.exports = {

  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    publicPath: '/dist',
    contentBase: path.resolve(__dirname, '/src'),
    disableHostCheck: true,
    host: 'localhost',
    port: 3001,
    watchOptions: {
      poll: true
    },

    proxy: {
      "**": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ignorePath: false,
        secure: false
      },
    }
  },
  mode: 'development',
  devtool: 'eval',
  resolve: {

    modules: ['node_modules'],
    extensions: ['.ts', 'json', '.jsx', '.scss', '.css', '.js'],
    aliasFields: ['browser', 'browser.esm'],
    alias: {
      'socket.io-client': path.join(__dirname, 'node_modules/socket.io.client/socket.io.js')
    }
  },
  entry: {
    main: [path.join(context, 'src/views/ts/index.ts')],
    chat: [path.join(context, 'src/views/ts/chat.ts')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: ["/node_modules"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

        ]
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './[path][hash].[ext]',
            limit: 10 * 1024
          }
        }
      },
    ],
    noParse: [/socket.io-client/]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(context, 'src/index.html'),
      filename: './index.html',
      showErrors: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  externals: {
    'socket.io-client': 'io',
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
  },

}