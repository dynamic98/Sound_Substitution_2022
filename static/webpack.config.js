
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
// sourcce file location
    entry: { index: path.resolve(__dirname, "customJS", "main.js") },

    output: { path: path.resolve(__dirname, "dist"), filename: "main.js" }

   
};