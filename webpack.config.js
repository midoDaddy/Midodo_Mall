/*
* @Author: midoDaddy
* @Date:   2017-06-09 12:40:00
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-21 15:10:22
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin的方法
var getHtmlConfig = function(name, title) {
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        inject      : 'true',
        hash        : 'true',
        chunks      : ['common', name],
        title       : title
    }
};
var config = {
    entry: {
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/index/login.js'],
        'common': ['./src/page/common/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output: {
        path        : './dist',
        filename    : 'js/[name].js',
        publicPath  : '/dist'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {test: /\.(png|jpg|gif|woff|ttf|svg|eot)\??.*$/, loader: 'url-loader?limit=100&name=../resource/[name].[ext]'},
            {test: /\.string$/, loader: 'html-loader'}    
       ]
    },
    resolve: {
        alias: {
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image',
            node_modules    : __dirname + '/node_modules',
        }
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //css单独打包
        new ExtractTextPlugin('css/[name].css'),
        //html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ],

};
if (WEBPACK_ENV === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;