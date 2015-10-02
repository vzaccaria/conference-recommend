module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/assets',
        filename: 'bundle.js',
        publicPath: 'http://localhost:8090/assets/'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
