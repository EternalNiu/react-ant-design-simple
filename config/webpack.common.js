const path = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: path.appSrc,
  },

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    path: path.appDist,
  },

  module: {
    rules: [
      {
        test: /\.(less)$/,
        exclude: [/node_modules/],
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]_[hash:base64:5]',
          },
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        }],
      },

      {
        test: /\.(less)$/,
        include: /node_modules|antd\.less/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        }],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /(\.js|\.jsx)$/,
        include: path.appSrc,
        loader: 'babel-loader',
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.appPath,
      verbose: true,
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),

      title: '数据质量',
      appMountId: 'app',
    }),
  ],

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    },
  },
  resolve: {
    alias: {
      'Util': path.utilPath,
      'Common': path.commonPath,
    },
  },
};
