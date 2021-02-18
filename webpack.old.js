const ENTRY = require('./config/config.pages');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const configureResolveAlias = () => {
	return {
		alias: {
			'assets': path.resolve(__dirname, './src/images')
		}
	}
};

const configureCopy = () => {
	return [
		{from: "src/images/favicon.ico", to: "./"},
		{from: "src/images/", to: "images/"},
		{from: 'src/fonts/', to: 'fonts/'}
	]
};

module.exports = {
	resolve: configureResolveAlias(),
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
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]',
						outputPath: 'images/',
						publicPath: '../'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]',
							outputPath: 'fonts/',
							publicPath: '../'
						}
					}
				]
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
	plugins: [
		new CopyWebpackPlugin(
			configureCopy()
		),
		new HtmlWebPackPlugin({
			template: './src/components/pages/index.pug',
			filename: 'index.html',
			file: require('./src/data/index.json')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
			chunkFilename: '[id].css'
		})
	]
};
