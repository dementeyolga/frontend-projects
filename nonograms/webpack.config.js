const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[hash][ext]',
		clean: true,
	},
	optimization: {
		moduleIds: 'deterministic',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: 'defaults' }]],
					},
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
};
