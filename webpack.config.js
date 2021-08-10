const webpack = require('webpack');

// ファイルとして抽出してlinkでcssを出力する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// CSSを最適化して最小化する
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// HTMLを最適化して最小化する
const HtmlWebpackPlugin = require('html-webpack-plugin');
// ビルド先のフォルダをcleanする
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// jsからcosole.logやコメントを削除
const TerserPlugin = require('terser-webpack-plugin');
// favicon
// const WebappWebpackPlugin = require('webapp-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// CSS JSをインライン化する
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = (env, argv) => {
  // [定数] webpack の出力オプションを指定します
  // 'production' か 'development' を指定
  // const MODE = 'production';
  const MODE = argv.mode || 'development';
  // ソースマップの利用有無(productionのときはソースマップを利用しない)
  const enabledSourceMap = (MODE === 'development');

  //画像を取り込む
  const enableIncludeImage = true
  //htmlをminimizeする
  const enabledHTMLMinimize = (MODE === 'production');

  return {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
      contentBase: 'dist',
      open: true,
      host: "0.0.0.0"
    },

    // source-map 方式でないと、CSSの元ソースが追跡できないため
    devtool: (MODE === 'development') ? 'source-map' : 'none',
    module: {
      rules: [
        {
          // 対象となるファイルの拡張子
          test: /\.(sa|sc|c)ss$/,
          // Sassファイルの読み込みとコンパイル
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                // CSS内のurl()メソッドの取り込み
                url: enableIncludeImage,
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,
                // Sass+PostCSSの場合は2を指定
                importLoaders: 2
              }
            },
            // PostCSSのための設定
            {
              loader: "postcss-loader",
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: enabledSourceMap,
                plugins: () => [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require("autoprefixer")({
                    grid: "autoplace" // trueは no-autoplace を表す。 autoplace に変更
                  })
                ]
              }
            },
            // Sassをバンドルするための機能
            {
              loader: "sass-loader",
              options: {
                // ソースマップの利用有無
                sourceMap: enabledSourceMap
              }
            },
          ]
        },
        /*
        {
          // 対象となるファイルの拡張子
          test: /\.(gif|png|jpg|eot|wof|woff|woff2|otf|ttf|svg)$/,
          // 画像をBase64として取り込む
          loader: "url-loader"
        },
        */
        {
          // 対象となるファイルの拡張子
          test: /\.(gif|png|jpg)$/i,
          // 画像をBase64として取り込む
          use: [
            "webp-loader?{quality: 50}",
            {
              loader: 'url-loader',
              options: {
                limit: 100 * 1024, // 100KB以上だったら埋め込まずファイルとして分離する
                name: './img/[name].[ext].webp'
              }
            }
          ]
        },
        {
          test: /\.(mov|mp4|eot|wof|woff|woff2|otf|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[ext]'
              }  
            }
          ]
        },
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          use: [
            {
              // Babel を利用する
              loader: "babel-loader",
              
              // Babel のオプションを指定する
              options: {
                presets: [
                  // プリセットを指定することで、ES2019 を ES5 に変換
                  '@babel/preset-env',
                ]
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: enabledHTMLMinimize
              }
            }
          ],
        },
      ]
    },
    entry: {
      'index': './src/index.js',
      'input': './src/input.js'
    },
    output: {
      path: __dirname + '/docs',
      // filename: '[name].js?[hash]'
      filename: '[name].js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ja/),
      new webpack.ProvidePlugin({
        moment: "moment"
      }),
      new webpack.ProvidePlugin({
        Velocity: 'velocity-animate'
      }),
      new MiniCssExtractPlugin({
        // filename: '[name].css?[hash]',
        filename: '[name].css',
        // filename: 'style.css?[hash]',
        // chunkFilename: '[id].css?[hash]',
      }),
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$',
        inject: true,
        filename: "index.html",
        chunks: ['index'],
        template: "src/index.html",
        minify: true,
      }),
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$',
        inject: true,
        filename: "input.html",
        chunks: ['input'],
        template: "src/input.html",
        minify: true,
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
      // new HtmlWebpackInlineSourcePlugin(),
      
      // new FaviconsWebpackPlugin('src/img/favicon.png'),
      // new WebappWebpackPlugin({
      //   logo: './src/img/favicon.png',
      //   prefix: 'assets/',
      //   publicPath: './',
      // }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      // splitChunks: {
      //   // cacheGroups内にバンドルの設定を複数記述できる
      //   cacheGroups: {
      //     // 今回はvendorだが、任意の名前で問題ない
      //     vendor: {
      //       // node_modules配下のモジュールをバンドル対象とする
      //       test: /node_modules/,
      //       name: 'vendor',
      //       chunks: 'initial',
      //       enforce: true,
      //     }
      //   }
      // },

      // minimizer: [
      //   new OptimizeCSSAssetsPlugin({}),
      //   new TerserPlugin({
      //     extractComments: 'all',
      //     terserOptions: {
      //       compress: {
      //         drop_console: true,
      //       },
      //     },
      //   }),
      // ],
    },
  }
};