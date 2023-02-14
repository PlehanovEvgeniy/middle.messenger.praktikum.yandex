const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js",
    },
  },
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.hbs/,
        loader: "handlebars-loader",
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    })
  ],
}
