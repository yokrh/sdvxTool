const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPlugin = new ExtractTextPlugin({
  filename: './css/app.bundle.css'
});
const HTMLWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HTMLWebpackPlugin({
  template: __dirname + '/src/view/index.html',
  filename: 'index.html',
  inject: 'body'
});
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uglifyJsPlugin = new UglifyJsPlugin();

module.exports = {
  entry: {
    app: __dirname + '/src/app.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'
  },
  externals: {
    'aws-sdk': 'AWS'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({browsers: ['last 2 versions']}),
            require('postcss-nested')(),
            require('cssnano')(),
            require('postcss-assets')()
          ]
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /serviceworker\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'file-loader?name=[name].[ext]'
          }
        ]
      },
      {
        test: /manifest\.json/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /favicon\.ico/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('postcss-nested')(),
                  require('autoprefixer')({browsers: ['last 2 versions']}),
                  require('cssnano')()
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader?publicPath=../&name=css/font/[name].[ext]' // for element-ui/lib/theme-chalk/index.css resolve font path
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    extractTextPlugin,
    htmlWebpackPlugin,
    uglifyJsPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  resolve: {
    alias: {
      'Vue': 'vue/dist/vue.esm.js'
    }
  }
}
