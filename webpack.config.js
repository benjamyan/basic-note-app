const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
// const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default; // Require the plugin

module.exports = {
    entry: "./src/index.tsx",
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css', '.jsx'],
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ],
        fallback: {
            'react/jsx-runtime': 'react/jsx-runtime.js',
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "src")
        },
        compress: false,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(scss|sass)$/,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(css)$/,
                // loader: "style-loader!css-loader",
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' },
            //         // CHANGE HERE
            //         {
            //             loader: 'resolve-url-loader',
            //             options: {
            //               root: '/', // considering all your images are placed in specified folder. Note: this is just a string that will get as prefix to image path
            //               includeRoot: true,
            //               absolute: true,
            //             },
            //         },
            //         {
            //             loader: 'sass-loader',
            //             options: {
            //                 sourceMap: true,
            //                 // sourceMapContents: false,
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.(jpg|jpeg|svg|gif|png|svg)$/,
                use: "file-loader"
            },
            // {
            //     test: /\.(jpg|jpeg|svg|gif|png)$/,
            //     loader: "file-loader",
            //     options: {
            //         // name: '[path][name].[ext]',
            //         name(resourcePath, resourceQuery) {
            //             return `${resourcePath.split(__dirname + '/')[1]}`
            //         //   if (process.env.NODE_ENV === 'development') {
            //         //     return '[path][name].[ext]';
            //         //   }
           
            //         //   return '[contenthash].[ext]';
            //         },
            //     }
            // }, 
            // {
            //     test: /\.svg$/,
            //     use: [
            //         {
            //             loader: 'svg-url-loader',
            //             options: {
            //                 limit: 10000,
            //             },
            //         },
            //     ],
            // },
            // {
            //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {
            //         name: '[name].[ext]',
            //         outputPath: 'fonts/'
            //       }
            //     }
            //   ]
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin ({
            favicon: path.resolve(__dirname, "public/favicon.ico"),
            // filename: path.resolve(__dirname, "public/index.html"),
            template: path.join(__dirname, "public", "index.html"),
            manifest: path.resolve(__dirname, "public/manifest.json")
        })
        // new HtmlWebpackPlugin ({ // 2
        //     favicon: "./public/favicon.ico",
        //     filename: "./public/index.html",
        //     manifest: "./public/manifest.json"
        // })
        // new HtmlWebpackPlugin({ // 1
        //     template: path.join(__dirname, "public", "index.html"),
        // }),
    ],
};