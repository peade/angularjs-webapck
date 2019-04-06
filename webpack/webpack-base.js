const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'js/[name]-[contentHash:8].js',
    chunkFilename: 'js/[name]-[contentHash:8].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(scss|css)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',

            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100, // 10000 2k以下
          name: 'images/[name]-[hash:10].[ext]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 50000, // 10000 2k以下
          name: 'font/[name]-[hash:10].[ext]'
        }

      },
      {
        test: /\.htm$/,
        use: [
          // {
          //   loader: 'raw-loader'
          // },
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              attrs: ['img:src', 'audio:src']
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(['../dist'], {
      allowExternal: true
    }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static'
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.htm',
      chunks: ['app'],
      title: 'angularjs',
      template: path.join(__dirname, '../src/index.htm'),
      minify: true
    }),
    // ...HtmlWebpackPluginList,
    // new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      chunkFilename: 'css/[name]-[hash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 3,
          priority: 10,
          name: 'vendors'
        },
        default: {
          minChunks: 3,
          priority: -10,
          name: 'commons',
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    contentBase: path.join(__dirname, '../', 'dist'),
    compress: true,
    port: 3045,
    inline: true,
    open: true,
    host: '0.0.0.0',
    useLocalIp: true,
    disableHostCheck: true,
    openPage: '/index.htm',
    proxy: {
      '/services': 'http://localhost:8080'
    }
  }
}