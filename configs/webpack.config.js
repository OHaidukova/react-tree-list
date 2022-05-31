const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction =
    process.argv.some((arg) => arg === '-p' || arg === '--production') ||
    process.env.NODE_ENV === 'production';

const entryFile = isProduction ? '../src/index.ts' : '../demo/index.tsx';
const outputPath = isProduction ? '../dist' : '../demo/dist';
const tsconfigFile = isProduction ? 'tsconfig.json' : 'tsconfig.demo.json';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: path.resolve(__dirname, entryFile),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, outputPath),
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: tsconfigFile,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },

    plugins: isProduction
        ? []
        : [
              new HtmlWebpackPlugin({
                  template: path.resolve(__dirname, '../demo/index.html'),
              }),
          ],
};
