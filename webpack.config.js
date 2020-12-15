const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const publicPath = resolvePath('public/');
    const exclude = /(node_modules|public|__tests__)/;

    return {
        resolve: { extensions: ['.js', '.jsx'] },
        context: resolvePath('src'),
        entry: './index.jsx',
        module: {
            rules: [
                {
                    exclude,
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                },
                {
                    exclude: /(public|__tests__)/,
                    test: /\.s*css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        // Compiles Sass to CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [ 'src/styles/' ]
                                }
                            }
                        }
                    ]
                },
                {
                    exclude,
                    test: /\.(png|jpe*g)$/,
                    type: 'asset/resource',
                },
                {
                    exclude,
                    test: /\.json$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'data/[name][ext]'
                    },
                },
                {
                    exclude,
                    test: /\.mp3$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'sounds/[name][ext]'
                    },
                },
                {
                    exclude: /(public|__tests__)/,
                    test: /\.(eot|ttf|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]'
                    },
                },
                {
                    exclude,
                    test: /robots\.txt$/,
                    type: 'asset/resource',
                    generator: {
                        filename: '[name][ext]'
                    },
                },
            ],
        },
        output: {
            filename: '[name].js',
            path: publicPath,
            publicPath: '/',
            assetModuleFilename: '[path][name][ext]'
        },
        performance: {
            hints: false,
        },
        plugins: [
            new webpack.DefinePlugin({
                IS_PRODUCTION: JSON.stringify(isProduction),
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: resolvePath('src/index.html'),
                favicon: resolvePath('src/images/favicon.ico'),
                hash: true,
            }),
            new ESLintPlugin({
                extensions: ['js', 'jsx'],
                fix: true,
                failOnError: isProduction,
            }),
        ],
        devServer: {
            contentBase: publicPath,
            host: '0.0.0.0',
            port: 9001,
            stats: 'minimal',
            historyApiFallback: true,
            disableHostCheck: true,
        },
    };

    function resolvePath(toResolve) {
        return path.resolve(__dirname, toResolve);
    }
};

module.exports = config;
