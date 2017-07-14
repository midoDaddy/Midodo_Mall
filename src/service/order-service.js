/*
* @Author: midoDaddy
* @Date:   2017-07-12 14:07:50
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-14 00:38:13
*/

'use strict';
var _mm = require('util/mm.js');
var _order = {
    //用户登录
    getProductList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    createOrder: function(orderInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    getOrderList: function(orderInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
}

module.exports = _order;