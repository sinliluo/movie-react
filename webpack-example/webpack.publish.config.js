/*
const path = require('path');
const webpack = require('webpack');
// const devServer = require('webpack-dev-server');

// 删除文件夹的
const CleanPlugin = require('clean-webpack-plugin');
// 自动生成html页面的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽取css文件插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
	devtool: 'source-map',// 配置生成Source Maps
	entry: {
		app: path.resolve(__dirname,'src/js/app.js'),
		vendors: ['react','react-dom','react-router']
	},
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js',
		publicPath: '/',// 设置根目录
		chunkFilename: '[name]_[chunkhash:8]_chunk.js',
		sourceMapFilename: '[name].map'
	},
	module: {
		rules: [
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader"
        })
			},
			// 处理图片操作  25000bit ~3kb
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'url-loader?limit=25000&name=images/[name].[ext]'
      },
      // 处理字体文件
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/,
        use: 'url-loader?limit=25000&name=fonts/[name].[ext]'
      }
		]
	},
  plugins: [
    // 删除文件夹的插件
    new CleanPlugin(['dist']),
    // 分离第三方应用的插件
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
    // 压缩混淆js代码插件
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            warnings: false,
            screw_ie8: true
        },
        comments: false
    }),
    new ExtractTextPlugin("app.css"),
    // 自动生成html插件
    new HtmlWebpackPlugin({
        template: './src/template.html',
        htmlWebpackPlugin: {
            "files": {
                "css":["app.css"],
                "js": ["vendors.js", "bundle.js"]
            }
        },
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }

    }),
    // 在构建的过程中删除警告
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:'"production"'
        }
    })
  ]
};*/



/**
 * webpack发布阶段你的配置文件
 */
var path = require('path');
var webpack = require('webpack');

// 删除文件夹的
var CleanPlugin = require('clean-webpack-plugin')
// 自动生成html页面的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽取css文件插件
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js'),
        vendors: ['react', 'react-dom','react-router']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath:'/',
        chunkFilename: '[name]_[chunkhash:8]_chunk.js',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            // 处理js和jsx语法到es5
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            // 处理在js中引用css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader"
                })
            },
            // 处理图片操作  25000bit ~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=25000&name=images/[name].[ext]'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=25000&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        // 删除文件夹的插件
        new CleanPlugin(['dist']),
        // 分离第三方应用的插件
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // 压缩混淆js代码插件
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        new ExtractTextPlugin("app.css"),
        // 自动生成html插件
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }

        }),
        // 在构建的过程中删除警告
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        })

    ]

}
