/*
* @Author: midoDaddy
* @Date:   2017-07-05 21:45:18
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-07 17:09:20
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
    //用户登录
    getProductList: function(listParam, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    //获取商品详情信息
    getProductDetail: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //加入购物车
    addToCart: function(productInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
}

module.exports = _product;