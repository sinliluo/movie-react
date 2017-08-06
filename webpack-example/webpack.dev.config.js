const path = require('path');
const webpack = require('webpack');
// const devServer = require('webpack-dev-server');


module.exports = {
	devtool: 'eval',// 配置生成Source Maps
	entry: path.resolve(__dirname,'src/js/app.js'),
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js'
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
				use: ['style-loader','css-loader']
			}
		]
	},
	devServer: {
    contentBase: __dirname + '/dist',
    // hot: true, // 加了报错
    inline:true, // 默认是true
    port:8080,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false
    // stats: 'minimal',
    // publicPath: publicPath
	}
};