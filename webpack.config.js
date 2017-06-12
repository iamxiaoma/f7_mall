var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	context: __dirname,
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name]-[hash].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: path.resolve(__dirname, 'node_modules'),
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!importLoaders=1!postcss-loader'
			}
		]
	},
	postcss: [
		require('autoprefixer')({
			browsers: ['last 5 versions']
		})
	],
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body',
			title: 'webpack is good',
			date: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: false
			},
		})
	]
}