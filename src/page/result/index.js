/*
* @Author: midoDaddy
* @Date:   2017-06-21 14:35:07
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-17 10:07:17
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    $element.show();
    if (type === 'payment') {
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
});