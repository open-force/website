const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    root: path.resolve(__dirname, '..'),
    nodeModules: path.resolve(__dirname, '../node_modules'),
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    styles: path.resolve(__dirname, '../src/styles'),
};


//for ant overrides
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(PATHS.styles, './ant-theme-vars.less'), 'utf8'));


const DEV_SERVER = {
    historyApiFallback: true,
    overlay: true,
    hot: true,
    hotOnly: true,
    port: 8080, //should match ./config/sfdc-cors-enable
    proxy: {
        '/api/**': {
            target: 'http://localhost:5000/',
            secure: false,
        }
    }
};

module.exports = (env = {}) => {
    console.log({ env });
    const isBuild = !!env.build;
    const isDev = !env.build;
    const isLocal = env.local;
    const isSourceMap = !!env.sourceMap || isDev;

    let orgInfo;
    let instanceUrl;

    let GLOBAL_DEFINES =
        {
            'process.env': {
                NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
            }
        }

    return {
        mode: isDev ? 'development' : 'production',
        cache: true,
        devtool: isDev ? 'eval-source-map' : 'source-map',
        devServer: DEV_SERVER,

        context: PATHS.root,

        entry: {
            app: [
                'babel-polyfill',
                './src/index.tsx',
            ],
        },
        output: {
            path: PATHS.dist,
            filename: '[name].js',
            publicPath: '/',
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    }
                }
            }
        },

        resolve: {
            alias: { '@src': PATHS.src },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            modules: ['src', 'node_modules'],
        },

        // externals: {
        // },

        module: {
            rules: [
                // typescript
                {
                    test: /\.(ts|tsx)$/,
                    include: PATHS.src,
                    use:
                        [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    useBabel: true,
                                    transpileOnly: true,
                                    useTranspileModule: false,
                                    sourceMap: isSourceMap,
                                },
                            },
                        ]
                },
                // css
                {
                    test: /\.css$/,
                    include: PATHS.styles,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                    ]
                },
                //antd
                {
                    test: /\.less$/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        {
                            loader: "less-loader",
                            options: {
                                modifyVars: themeVariables
                            }
                        }
                    ]
                },
                // json
                {
                    test: /\.json$/,
                    include: [PATHS.src],
                    use: { loader: 'json-loader' },
                },
                // // images
                // {
                //   test: /\.(jpg|jpeg|png|gif|svg)$/,
                //   include: [PATHS.IMAGES],
                //   use: {
                //     loader: 'url-loader',
                //     options: {
                //       name: 'images/[hash].[ext]',
                //       limit: 1000, // inline file data until size
                //     },
                //   },
                // },
                // // fonts
                // {
                //   test: /\.(woff|woff2|ttf|eot)$/,
                //   include: [
                //     PATHS.ASSETS,
                //   ],
                //   use: {
                //     loader: 'file-loader',
                //     options: {
                //       name: 'fonts/[name].[hash].[ext]',
                //     },
                //   },
                // },
            ],
        },

        plugins: [
            ...(isDev ? [
                new DashboardPlugin(),
                new webpack.NamedModulesPlugin(),
                new webpack.DefinePlugin(GLOBAL_DEFINES),
            ] : []),
            ...(isBuild ? [
                new webpack.DefinePlugin(GLOBAL_DEFINES),
                new HtmlWebpackPlugin({
                    template: './index.html',
                    inject: false,
                }),
            ] : []),
        ]
    };

};
