const merge = require('webpack-merge');
const webpack = require('webpack');

const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.appDist,
    historyApiFallback: true,
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
    new webpack.DefinePlugin(
      {
        'process.env': {
          API_PROTOCOL: JSON.stringify('http'),
          API_HOSTNAME: JSON.stringify('192.168.100.197'),
          API_PORT: JSON.stringify('8080'),
          IS_CORS: true,
        },
      }
    ),
  ],
});
