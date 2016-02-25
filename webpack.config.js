module.exports = {
    entry: "./scripts/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    stats: {
        colors: true,
        reasons: true
    },
    debug: true,
    devtool: 'source-map'
};