/*
* @Author: midoDaddy
* @Date:   2017-07-14 11:16:35
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-14 12:32:54
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderDetail();
    },
    bindEvent: function(){
        var _this = this;
        $(document).on('click', '.btn-cancel', function() {
            if (confirm('确定要取消订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _mm.successTips('订单取消成功');
                    _this.loadOrderDetail();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }           
        });
    },
    loadOrderDetail: function(){
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class=loading></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res){
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg){
            $content.html('<p class=err-tip>' + errMsg + '</P>')
        });
    },
    dataFilter: function(data){
        data.needPay = (data.status === 10);
        data.isCancelable = (data.status === 10);
    }
}
$(function() {
    page.init();
});