const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: "./src/script/index.tsx",
        // faq: "./src/script/index_faq.tsx",
        // about: "./src/script/index_about.tsx",
        // reg: "./src/script/index_reg.tsx"
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        publicPath: path.resolve(__dirname, "./build"),
        filename: "./script/[name].js",
        clean: true
    },
    resolve: {
        extensions : [".tsx", ".ts  ", ".jsx", ".js", ".json"]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./build",
        stats: {
            assets: false,
            children: false,
            moduleAssets: false,
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./styles/[name].css",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
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
                    publicPath: (resourcePath, context) => {
                        return path.relative(path.dirname(resourcePath), context) + '/build/';
                    }
                },
                },
                "css-loader",
                "postcss-loader",
                {
                loader: "resolve-url-loader",
                options: {
                    sourceMap: true,
                }
                },
                {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    implementation: require("sass")
                },
                
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            loader: "file-loader",
            options : {
                // publicPath: path.resolve(__dirname, "./build/"), // убрал пока-что т.к. картинки в css неверно прогружались
                name: "[name].[ext]",
                outputPath: "./images",
                esModule: false
            }
            ,
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
        },
        {
            test: /\.(jsx|js)$/,
            exclude: "/node_modules",
            use: "babel-loader"
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