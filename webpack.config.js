const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');




module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename : '[name].[contenthash].js'
    },
    resolve: {
        extensions : ['.js'],
        alias : {
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        }
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'stylus-loader'
                ]
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/images/[name].[contenthash][ext]'
                }
            },
        ]
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename : '/index.html'
        }),        
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src', 'assets', 'images'),
                to: 'assets/images',
                globOptions: {
                  ignore: ['*/*.png'],
                },
              },
            ],
          }),
        new DotenvPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
    ]
}