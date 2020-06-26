const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          // 実行順番は逆である

          // HTMLに、style-loaderで変換したcssのスタイルが記述された<style>タグに追加
          'style-loader',
          // cssをモジュールに変換
          'css-loader',
          // sassをcssにコンバイル
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gis)$/i,
        include: path.resolve(__dirname, 'src/images'),
        loader: 'url-loader',
        options: {
          limit: 8192, // 8KB(8 * 1024)
          name: '[name].[ext]',
          outputPath: '../images/',
          // public/index.htmlからpublic/imagesの画像を読み込み
          publicPath: path => './images/' + path
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // 外部モジュールであるjqueryを、全てのファイル上で変数$として利用できるようになる
      $: 'jquery'
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin()
  ]
};
