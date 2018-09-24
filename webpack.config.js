const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([{
      from: 'public/favicon.ico', to: './',
    }], {}),
  ],
};
