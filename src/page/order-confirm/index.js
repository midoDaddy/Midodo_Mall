/*
* @Author: midoDaddy
* @Date:   2017-07-12 10:10:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-13 21:17:25
*/

'use strict';

require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm                 = require('util/mm.js');
var _order              = require('service/order-service.js');
var _address            = require('service/address-service.js');
var templateProduct     = require('./product-list.string');
var templateAddress     = require('./address-list.string');
var addressModel        = require('./address-modal.js');

var page = {
    data: {
        selectedAddressId: null
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function(){
        var _this = this;
        //地址的选择
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //提交订单
        $(document).on('click', '.btn-submit', function(){
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId : shippingId
                }, function(res){
                    window.location.href = './payment.html?orderNumer=' + res.orderNo;
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                })
            } else {
                _mm.errorTips('请选择地址后再提交')
            }
        });
        //添加新收件人信息
        $(document).on('click', '.address-new', function(){
            addressModel.show({
                isUpdate: false,
                onSuccess: function(){
                    _this.loadAddressList();
                }
            })
        });
        //编辑收件人信息
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getSelectedAddress({
                shippingId : shippingId
            }, function(res){
                addressModel.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg){
                _mm.errorTips(errMsg)
            });           
        });
        //删除收件人信息
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (confirm('确定要删除该收件人吗')) {
                 _address.deleteAddress({
                    shippingId : shippingId
                }, function(res){
                    _this.loadAddressList();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });  
             }           
        });
    },
    //加载地址信息
    loadAddressList: function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            var data = _this.addressFilter(res);
            var addressHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressHtml);
        }, function(errMsg){
            $('.address-con').html('<p class=err-tip>地址信息加载失败，请刷新后重试<p>');
        })
    },
    //加载订单商品信息
    loadProductList: function(){
        $('.product-co').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            var productHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productHtml);
        }, function(errMsg){
            $('.product-con').html('<p class=err-tip>商品信息加载失败，请刷新后重试<p>');
        })
    },
    //处理列表项的选中状态
    addressFilter: function(data){
        var selectedIdFlag = false;
        if (this.data.selectedAddressId) {
            for (var i = 0, length = data.list.length; i < length; i++){
                if (data.list[i].id === this.data.selectedAddressId) {
                    selectedIdFlag = true;
                    data.list[i].isActive = true;
                }
            }
            if (!selectedIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    }
};
$(function(){
    page.init();
})