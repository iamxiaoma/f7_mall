var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js',
		b: './src/script/b.js',
		c: './src/script/c.js',
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name]-[hash].bundle.js',
		publicPath: 'http://cdn.com/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, 'node_modules'),
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['latest']
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: false,
			title: 'webpack is good',
			date: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: false
			},
			chunks: ['main', 'a']
		}),
		new htmlWebpackPlugin({
			filename: 'a.html',
			template: 'index.html',
			inject: false,
			title: 'this is a.html',
			date: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: false
			},
			//chunks: ['main', 'a']
			excludeChunks: ['b', 'c']
		}),
		new htmlWebpackPlugin({
			filename: 'b.html',
			template: 'index.html',
			inject: false,
			title: 'this is b.html',
			date: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: false
			},
			//chunks: ['b']
			excludeChunks: ['a', 'c']
		}),
		new htmlWebpackPlugin({
			filename: 'c.html',
			template: 'index.html',
			inject: false,
			title: 'this is c.html',
			date: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: false
			},
			chunks: ['main', 'c']
		})
	]
}