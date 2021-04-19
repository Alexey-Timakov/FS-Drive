const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "/src/script/faq.js",
    output: {
        path: __dirname + "/dist/",
        filename: "index.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
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
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[hash][ext][query]'
            }
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