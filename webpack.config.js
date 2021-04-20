const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "production",
    entry: "/src/script/faq.js",
    output: {
        // path: __dirname + "/build",
        path: path.resolve(__dirname, "./build"),
        filename: "./script/index.js",
        clean: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./styles/main.css"
        }),
        new HtmlWebpackPlugin({
            filename: "about.html",
            template: "about.html"
        }),
        new HtmlWebpackPlugin({
            filename: "faq.html",
            template: "faq.html"
        }),
    ],
    module: {
        rules: [{
            test: /\.(scss)$/,
            exclude: "/node_modules",
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: { 
                    esModule: true,
                    publicPath: path.resolve(__dirname, "./build"),
                },
            },
                "css-loader",
                "postcss-loader",
                {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                },
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './images',
                esModule: false,
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './fonts',
                esModule: false,
            },
        },
        {
            test: /\.js$/,
            exclude: "/node_modules",
            use: "eslint-loader"
        }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ]
    }
};