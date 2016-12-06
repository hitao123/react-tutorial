var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {  //入口
  entry: DEV + "/index.jsx",
  output: {
    path: OUTPUT, //输出
    filename: "myCode.js"
  },
  resolve: {       // resolve 指定可以被 import 的文件后缀                               
    extensions: ['', '.js', '.jsx']
  },
  module: {   //webpack 
    loaders: [
        {
            include: DEV,
            loader: "babel",
        },
        {
            test: /\.js$/, // test 去判断是否为.js,是的话就是进行es6和jsx的编译
            loader: 'babel-loader',
        },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 用!去链式调用loader
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
       
    ]
  },
  plugins: [ //相应的插件
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
      // require文件的时候可以直接使用require('file')，不用使用require('file.js')
      extensions: ['', '.js', '.json']
    }
};

module.exports = config;