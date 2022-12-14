require("dotenv/config");

const API_ENDPOINT = "https://sanchalit-api.herokuapp.com";
const DEVELOPMENT = "development";
const PRODUCTION = "production";
const WEB = "web";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const workbox = require("workbox-webpack-plugin");
const webpack = require("webpack");
const ExtensionReloader = require("webpack-extension-reloader");

const buildTarget = process.env.BUILD_TARGET || WEB;
const isProduction = process.env.NODE_ENV === PRODUCTION;
const isWeb = buildTarget === WEB;
const version = require("./package.json").version;

const config = {
	entry: {
		main: ["./src/main.js"],
	},
	output: {
		path: path.resolve("dist", buildTarget),
		publicPath: "/",
		filename: isWeb ? "[name].[contenthash:12].js" : "[name].js",
	},
	mode: isProduction ? PRODUCTION : DEVELOPMENT,
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(gif|jpe?g|png)$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: isWeb ? "[name].[contenthash:12].[ext]" : "[name].[ext]",
				},
			},
			{
				test: /\.mjs$/,
				type: "javascript/auto",
			},
			{
				test: /\.sass$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.svg$/,
				loader: "raw-loader",
			},
			{
				test: /\.(js|jsx)$/,
				include: path.resolve("./src"),
				loader: "babel-loader",
			},
			{
				test: /\.(ts|tsx)$/,
				include: path.resolve("./src"),
				loader: "ts-loader",
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "target/shared" },
				{
					from: `target/${buildTarget}`,
					filter: (path) => !path.includes("index.html"),
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: `./target/${buildTarget}/index.html`,
		}),
		new MiniCssExtractPlugin({
			filename: isWeb ? "[name].[contenthash:12].css" : "[name].css",
		}),
		new webpack.EnvironmentPlugin({
			BUILD_TARGET: WEB,
			API_ENDPOINT: API_ENDPOINT,
			VERSION: version,
		}),
	],
	devServer: {
		overlay: true,
	},
	devtool: isWeb ? "source-map" : false,
	stats: {
		warnings: false,
	},
};

if (isProduction) {
	config.plugins.push(
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
		}),
		new workbox.InjectManifest({
			swSrc: "./src/serviceWorker.js",
			swDest: "serviceWorker.js",
		}),
	);
}

if (!isWeb) {
	config.entry.background = "./src/background.js";
}

if (!isWeb && !isProduction) {
	config.plugins.push(
		new ExtensionReloader({
			reloadPage: true,
			entries: {
				background: "background",
				extensionPage: "main",
			},
		}),
	);
}

module.exports = config;
