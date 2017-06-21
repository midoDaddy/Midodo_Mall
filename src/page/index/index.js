/*
* @Author: midoDaddy
* @Date:   2017-06-09 12:28:17
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-21 11:49:12
*/
require('./index.css');
require('node_modules/font-awesome/css/font-awesome.min.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
navSide.init({
    name: 'about'
});

