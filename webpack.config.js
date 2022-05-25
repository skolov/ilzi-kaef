const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const globImporter = require('node-sass-glob-importer')
const getLogger = require('webpack-log')
const log = getLogger({ name: 'webpack' })

const EXT = {
    HTML: '.html',
    PUG: '.pug',
}

class Path {
    static root = path.resolve(__dirname)

    static components = path.resolve(Path.root, 'components')
    static nodeModules = path.resolve(Path.root, 'node_modules')
    static layouts = path.resolve(Path.root, 'layouts')
    static js = path.resolve(Path.root, 'js')
    static entry = path.resolve(Path.js, 'main.js')
    static libs = path.resolve(Path.js, 'libs')
    static output = path.resolve(Path.root, 'dist')
    static pages = path.resolve(Path.root, 'pages')

    static assets = path.resolve(Path.root, 'assets')
    static images = path.resolve(Path.assets, 'images')
    static icons = path.resolve(Path.assets, 'icons')
    static fonts = path.resolve(Path.assets, 'fonts')

    static page(file) {
        return path.resolve(Path.pages, file)
    }

    static lib(file) {
        return path.resolve(Path.libs, file)
    }
}

const pages = fs.readdirSync(Path.pages).map((file) => ({
    name: path.parse(file).name + EXT.HTML,
    path: Path.page(file),
}))

if (fs.existsSync(Path.output)) {
    log.info('Чистим dist')
    fs.rmSync(Path.output, {
        recursive: true,
        force: true,
    })
}

log.info(`
    В сборке участвуют следующие страницы:
    - ${pages.map((e) => e.name).join('\n- ')}
`)

module.exports = {
    entry: Path.entry,

    stats: 'errors-only',

    watchOptions: {
        ignored: [Path.nodeModules],
    },

    output: {
        filename: 'js/bundle.js',
        path: Path.output,
    },

    resolve: {
        alias: {
            '@': Path.root,
            images: Path.images,
        },
    },

    devServer: {
        static: false,
        open: true,
        hot: true,
        liveReload: true,
        watchFiles: [Path.components, Path.layouts, Path.pages],
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            sources: {
                                list: [
                                    '...',
                                    {
                                        tag: 'use',
                                        attribute: 'xlink:href',
                                        type: 'src',
                                        filter: () => false,
                                    },
                                ],
                            },
                        },
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            basedir: Path.root,
                            pretty: true,
                        },
                    },
                ],
            },

            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true, // <-- !!IMPORTANT!!
                            sassOptions: {
                                importer: globImporter(),
                            },
                        },
                    },
                ],
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name].[hash][ext]',
                },
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                exclude: Path.icons,
                generator: {
                    filename: '[path][name].[hash][ext]',
                },
            },

            {
                test: /\.svg$/,
                exclude: Path.images,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            outputPath: 'assets/icons/',
                        }
                    },
                    'svg-transform-loader',
                    'svgo-loader',
                ],
            },
        ],
    },

    plugins: [
        new SpriteLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        ...pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    filename: page.name,
                    template: page.path,
                    minify: false,
                })
        ),
        new webpack.ProvidePlugin({
            $: Path.lib('jquery-3.6.0.min.js'),
            jQuery: Path.lib('jquery-3.6.0.min.js')
        })
    ],
}
