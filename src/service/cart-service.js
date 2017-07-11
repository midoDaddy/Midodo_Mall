/*
* @Author: midoDaddy
* @Date:   2017-06-18 09:05:25
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-11 13:01:40
*/

'use strict';
var _mm = require('util/mm.js');

var _cart = {
    //获取购物车商品数量
    getCartCount: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    //获取购物车商品列表
    getCartList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 选择商品
    selectProduct: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择商品
    unSelectProduct: function(productId, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 商品的全选
    selectAllProduct: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消商品的全选
    unSelectAllProduct: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    //更新商品数量
    updateProduct: function(productInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    //删除商品
    deleteProduct: function(productIds, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds : productIds
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _cart;