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
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
