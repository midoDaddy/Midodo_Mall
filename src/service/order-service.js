/*
* @Author: midoDaddy
* @Date:   2017-07-12 14:07:50
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-14 18:12:48
*/

'use strict';
var _mm = require('util/mm.js');
var _order = {
    //获取商品列表
    getProductList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    //创建订单
    createOrder: function(orderInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    //获取订单列表
    getOrderList: function(orderInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    //获取商品详情信息
    getOrderDetail: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //取消订单
    cancelOrder: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //获取支付信息
    getPaymentInfo: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //获取订单状态
    getOrderStatus: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _order;