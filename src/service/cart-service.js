/*
* @Author: midoDaddy
* @Date:   2017-06-18 09:05:25
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-18 11:14:57
*/

'use strict';
var _mm = require('util/mm.js');

var _cart = {
    //获取购物车数量
    getCartCount: function(resolve, reject){
        _mm.request({
            url: _mm.getSververUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
}

module.exports = _cart;