const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app/index.js",
    module: {
        rules: [
            // JavaScript can not load SVGs directly so we'll use someone's written code in 
            // svg-inline-loader [installed via npm]
            // more about svg-loader:- https://www.npmjs.com/package/svg-inline-loader
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            // Similar to svg-loader, we are using css-loader to load the css and style-loader to inject css into 
            // our files
            // more about css-loader:- https://www.npmjs.com/package/css-loader 
            // Note:- css-loader is dependent on style-loader
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // Babel makes our modern JS (JS having features
            // like arrow functions etc) run on old browsers that donot support new JS.
            {
                // This is a Regex which says any js file having js, jsx will be loaded by babel
                test: /\.(js)$/,
                use: "babel-loader"
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    // After creating bundle.js file, to inject into our index.html file we need HTMLInjection that is provided
    // by the below plugin.
    // Note:- As written above, Loaders do work before generating the output and plugins do after the output...
    
    // It will generate index.html and will take bundle.js to inject into html
    // More:- https://webpack.js.org/plugins/html-webpack-plugin/
    plugins: [new HtmlWebpackPlugin()],
    
    // Two modes are there:- development, production. Production is more optimized and do minimize the code more
    mode: process.env.NODE_ENV == "production" ? "production" : "development"
};