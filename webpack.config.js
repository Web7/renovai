const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PAGES = fs.readdirSync('./src/components/pages/').filter(fileName => fileName.endsWith('.pug'));

const configureCopy = () => {
	return [
		// {from: "src/video/", to: "video/"},
		{from: 'src/images/', to: 'images/'},
		// {from: 'src/fonts/', to: 'fonts/'},
		{from: 'src/js/', to: 'js/'},
		{from: path.resolve('node_modules/jquery/dist/jquery.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/popper.js/dist/popper.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/bootstrap/dist/js/bootstrap.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/bootstrap-datepicker/js/locales/bootstrap-datepicker.uk.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/dotdotdot-js/dist/dotdotdot.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/slick-carousel/slick/slick.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('node_modules/intl-tel-input/build/js/intlTelInput-jquery.min.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('src/js/button-scroll-to-top.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('src/js/scroll-toggle-menu.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('src/js/select-js.js'), to: path.resolve('docs/js/')},
		{from: path.resolve('src/js/common.js'), to: path.resolve('docs/js/')},
	]
};

module.exports = {
	mode: 'development',

	entry: {
		index: './src/index.js'
	},

	output: {
		path: path.resolve(__dirname, 'docs')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(svg|png|jpg|gif|jpeg)$/,
				exclude: /src\/fonts/,
				// use: [{
				//     loader: 'file-loader',
				//     options: {
				//         name: '[name].[ext]',
				//         outputPath: 'images/'
				//     }
				// }]
				generator: {
					filename: 'images/[name][ext]'
				},
			},
			{
				test: /\.(mp4)$/,
				type: 'asset/resource',
				generator: {
					filename: 'video/[name][ext]'
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /src\/images/,
				// use: [{
				//     loader: 'file-loader',
				//     options: {
				//         name: '[name].[ext]',
				//         outputPath: 'fonts/'
				//     }
				// }]
				// type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				}
			},
			{
				test: /\.pug$/,
				use: {
					loader: 'pug-loader',
					options: {
						pretty: true,
						self: true
					}
				}
			},
			{
				test: /\.sass$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader', // style nodes from js strings
					'css-loader',
					'sass-loader'
				]
			}
		]
	},

	devServer: {
		port: 8080,
		hot: true,
		open: true,
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: configureCopy()
		}),
		new MiniCssExtractPlugin({
			filename: 'css/stylesheet.css',
			chunkFilename: '[id].css'
		}),
		...PAGES.map(page => new HtmlWebPackPlugin({
				template: `./src/components/pages/${page}`,
				filename: `${page.replace(/\.pug/, '.html')}`,
				file: require('./src/data/index.json'),
				cache: false
			})
		)
	],

	optimization: {
		minimizer: [new TerserPlugin()],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	}
};
