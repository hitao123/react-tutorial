var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

module.exports = {
    //入口文件 可以是数组，字符串，对象。入口不唯一，可能有多入口，数组以最后一个为准，
    //对象的话名称要唯一，输出 '[name].js'
    entry: DEV + "/index.js",
    //输出路径 唯一
    output: {
        path: OUTPUT,
        filename: "bundle.js",
        publicPath: "/output/"
        // publicPath is used as the href or url()
        //,publicPath: ...
    },
    //模块选项
    module: {
        loaders: [
            {
                test: /\.js$/, //满足条件的
                exclude: /node_modules/, //不满足条件的
                loader: 'babel-loader',
                include: DEV
                //loaders: 数组，上面一个使用`！`分隔
            }
        ],
        //插件选项
    //     plugins: [
    //         new webpack.optimize.UglifyJsPlugin({
    //             compress: {
    //                 warnings: false
    //             },
    //             output: {
    //                 comments: true
    //             }
    //         }),
    //     ],
    },
    resolve: {
        // alias: {
        //         xyz: "/absolute/path/to/file.js" //require('xyz')         
        // },
        extensions: ['','.js','.jsx']
    }
};