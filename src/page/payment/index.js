/*
* @Author: midoDaddy
* @Date:   2017-07-14 17:31:44
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-14 18:09:58
*/

'use strict';

require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function(){
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrapper');
        $pageWrap.html('<div class=loading></div>');
        _order.getPaymentInfo(this.data.orderNumber, function(res){
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class=err-tip>' + errMsg + '</P>')
        });
    },
    //监听支付状态
    listenOrderStatus: function(){
        var _this = this;
        this.paymentTimer = setInterval(function(){
            _order.getOrderStatus(_this.data.orderNumber, function(res){

            }, function(errMsg){
               _mm.errorTips(errMsg);
            })
        }, 3e3)
    }

}
$(function() {
    page.init();
});