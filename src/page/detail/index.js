/*
* @Author: midoDaddy
* @Date:   2017-07-07 10:45:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-07 17:08:20
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart        = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function(){
        var _this = this;
        //图片预览事件代理
        $(document).on('mouseenter', '.p-img-item', function() {
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        //商品数量增减事件代理
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('btn-plus') ? 'plus' : 'minus',
                $pCountInput = $('.p-count-input'),
                currCount = parseInt($pCountInput.val()),
                minCount = 1,
                maxCount = _this.data.detailData.stock || 1;
            if (type === 'plus') {
                $pCountInput.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            if (type === 'minus') {
                $pCountInput.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        //添加购物车事件代理
        $(document).on('click', '.cart-add', function() {
            _product.addToCart({
                productId : _this.data.productId,
                count : $('.p-count-input').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add'
            }, function(errMsg){
                _mm.errorTips(errMsg)
            })
        });
    },
    loadDetail: function(){
        var _this = this,
            detailHtml = '',
            $pageWrapper = $('.page-wrapper');
        $pageWrapper.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res){
            _this.data.detailData = res;
            _this.filter(res);
            detailHtml =  _mm.renderHtml(templateIndex, res);
            $pageWrapper.html(detailHtml);
        }, function(errMsg){
            $pageWrapper.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        })
    },
    filter: function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})