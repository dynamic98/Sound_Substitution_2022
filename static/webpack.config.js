const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // sourcce file location
    entry: {
        abstract: path.resolve(__dirname, "customJS", "main.js"),
        //이런식으로 추가하면 된다 파일 이름을. 그러면 dist 폴더에 concrete.js 가 만들어진다. 위의 경우 abstract.js이 만들어진다. 
        concrete: path.resolve(__dirname, "customJS", "concrete.js"),
    },
    mode: "development",
    target: "web",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename:'[name].js'
    },
};