/*
* @Author: midoDaddy
* @Date:   2017-06-21 14:35:07
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-21 15:37:30
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    $element.show();
});