const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        faq: "/src/script/index_faq.tsx",
        about: "/src/script/index_about.tsx"
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "./script/[name].js",
        clean: true
    },
    resolve: {
        extensions : [".tsx", ".ts", ".jsx", ".js", ".json"]
    },
    devServer: {
        stats: {
            assets: false,
            children: false,
            moduleAssets: false
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./styles/main.css"
        }),
        new HtmlWebpackPlugin({
            filename: "about.html",
            template: "./about.html"
        }),
        new HtmlWebpackPlugin({
            filename: "faq.html",
            template: "./faq.html"
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
                    publicPath: path.resolve(__dirname, "./build/")
                },
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
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            loader: "file-loader",
            options : {
                name: "[name].[ext]",
                outputPath: "./images",
                esModule: false
            }
            ,
            // type: 'asset/resource',
            // generator: {
            //     filename: './images/[hash][ext][query]'
            // }
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                // publicPath: path.resolve(__dirname, "./fonts/"),
                publicPath: url => `../fonts/${url}`,
                outputPath: "./fonts/",
                esModule: false,
            }
        },
        {
            test: /\.(tsx|ts)$/,
            exclude: "/node_modules",
            // use: "eslint-loader"
            use: "awesome-typescript-loader"
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