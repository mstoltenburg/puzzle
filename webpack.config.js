const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const config = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const publicPath = resolvePath('public/');
    const exclude = /(node_modules|public|__tests__)/;

    const eslintRules = !isProduction ? {} : {
        'no-console': [2, { allow: ['warn', 'error'] }],
    };

    return {
        resolve: { extensions: ['.js', '.jsx'] },
        context: resolvePath('src'),
        entry: './index.jsx',
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        failOnError: isProduction,
                        rules: eslintRules,
                    },
                },
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
                        'sass-loader'
                    ]
                },
                {
                    exclude,
                    test: /\.(png|jpe*g)$/,
                    use: 'file-loader?name=[path][name].[ext]',
                },
                {
                    test: /\.svg$/,
                    include: resolvePath('src/svg'),
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                            },
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { removeTitle: false },
                                    { removeViewBox: false },
                                    {
                                        removeAttrs: { attrs: '(fill|fill-opacity|stroke|stroke-width)' },
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    exclude,
                    test: /\.json$/,
                    use: 'file-loader?name=data/[name].[ext]',
                },
                {
                    exclude,
                    test: /\.mp3$/,
                    use: 'file-loader?name=sounds/[name].[ext]',
                },
                {
                    exclude: /(public|__tests__)/,
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: 'file-loader?name=fonts/[name].[ext]',
                },
                {
                    exclude,
                    test: /robots\.txt$/,
                    use: 'file-loader?name=robots.txt',
                },
            ],
        },
        output: {
            filename: '[name].js',
            path: publicPath,
            publicPath: '/',
        },
        performance: {
            hints: false,
        },
        plugins: [
            new webpack.DefinePlugin({
                IS_PRODUCTION: JSON.stringify(isProduction),
            }),
            new SpriteLoaderPlugin(),
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
        ],
        devServer: {
            contentBase: publicPath,
            host: '0.0.0.0',
            port: 9001,
            stats: 'minimal',
            historyApiFallback: true,
        },
    };

    function resolvePath(toResolve) {
        return path.resolve(__dirname, toResolve);
    }
};

module.exports = config;
