var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        index: './index.js',
    },
    module: {
        loaders: [
            { test: /\.hbs$/, loader: "handlebars-loader" }
        ]
    },
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "[name].min.js"
    },

};