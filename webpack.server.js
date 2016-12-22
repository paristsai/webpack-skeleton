const path = require('path'),
	fs = require('fs'),
	webpack = require('webpack')

const nodeModules = fs.readdirSync('./node_modules').filter(d => d != '.bin')
// console.log(nodeModules)
function ignoreNodeModules(context, request, callback) {
	if (request[0] == '.')
		return callback()

	const module = request.split('/')[0]
	// don't include the bundle, instead normal require
	if (nodeModules.indexOf(module) !== -1) {
		return callback(null, 'commonjs ' + request)
	}

	return callback()
}

function createConfig(isDebug) {
	// Webpack config
	const plugins = []

	if (!isDebug) {
		plugins.push(new webpack.optimize.UglifyJsPlugin())
	}
	return {
		target: 'node',
		devtool: 'source-map',
		entry: './src/server/server.js',
		output: {
			path: path.join(__dirname, 'build'),
			filename: 'bundle.js'
		},
		resolve: {
			alias: {
				shared: path.join(__dirname, 'src', 'shared')				
			}
		},
		module: {
			loaders: [
				{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
				{ test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
			]
		},
		externals: [ignoreNodeModules],
		plugins: plugins
	}
}



module.exports = createConfig(true)
module.exports.create = createConfig