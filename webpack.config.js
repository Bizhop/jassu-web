const Path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")

const extractSass = new ExtractTextPlugin({
  filename: "styles.[contenthash].css",
  disable: process.env.NODE_ENV === "development"
})

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body",
  favicon: "./src/favicon.ico"
})

const CleanWebpackPluginConfig = new CleanWebpackPlugin(["dist"], {})

const WebSocketUrlPlugin = new webpack.DefinePlugin({
  WEB_SOCKET_URL: process.env.NODE_ENV === "development" ? JSON.stringify('http://localhost:8181/refresh') : JSON.stringify('https://jassu.herokuapp.com/refresh')
})

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: Path.resolve("dist"),
    filename: "jassu.[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react"]
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[path][name].[hash].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff"
            }
          }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, extractSass, CleanWebpackPluginConfig, WebSocketUrlPlugin],
  devServer: {
    // If you use Vagrant or Cloud9, set
    // host: '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: "0.0.0.0", // Defaults to `localhost`
    port: "8080", // Defaults to 8080
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:8181",
        secure: false
      }
    }
  }
}
