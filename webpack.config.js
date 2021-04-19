const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "production",
    experiments: {asset: true},
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
                options: { esModule: true, },
            },
                "css-loader",
                "resolve-url-loader",
                "postcss-loader",
            {
                loader: "sass-loader",
                options: {
                    implementation: require("sass")
                }
            }
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[hash][ext][query]'
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            // type: 'asset/resource',
            // generator: {
                // filename: 'fonts/[hash][ext][query]'
            // }
            use: [
                {loader: "url-loader",
                // options: {
                //     limit: 100000,
                //     name: "fonts/[hash].[ext]"
                //     }
                }
            ],
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