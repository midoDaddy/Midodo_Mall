/*
* @Author: midoDaddy
* @Date:   2017-07-10 10:49:18
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-12 10:07:11
*/

'use strict';
'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/header/index.js');
var nav             = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadCart();
    },
    bindEvent: function(){
        var _this = this;
        //商品的选中、取消选中
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showError(errMsg);
                });
            } else {
               _cart.unSelectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showError(errMsg);
                }); 
            }   
        });
        //商品的全选、取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showError(errMsg);
                });
            } else {
               _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showError(errMsg);
                }); 
            }   
        });
        //商品数量的调整
        $(document).on('click', '.count-btn', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id'),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                $pCount = $this.siblings('.count-input'),
                curCount = parseInt($pCount.val(), 10),
                maxCount = parseInt($pCount.data('max'), 10),
                minCount = 1,
                newCount = 0;
            if (type === 'plus') {
                console.log('plus')
                if (curCount >= maxCount) {
                    _mm.errorTips('库存不足');
                    return;
                }
                newCount = curCount + 1;
            } else if (type === 'minus') {
                console.log('minus')
                if (curCount <= minCount) {
                    return;
                }
                newCount = curCount - 1;
            }
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showError(errMsg);
            })
        });
        //单件商品的删除
        $(document).on('click', '.cart-delete', function(){
            var productId = $(this).parents('.cart-table').data('product-id');
            if (confirm('确定删除该商品吗？')) {
                _this.deleteProduct(productId);   
            }     
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if (confirm('确定删除选中的商品吗？')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked').parents('.cart-table');
                for (var i = 0, length = $selectedItem.length; i < length; i++) {
                    arrProductIds.push($($selectedItem[i]).data('product-id'));
                }
                if (arrProductIds.length) {
                    _this.deleteProduct(arrProductIds.join(','));
                } else {
                    _mm.errorTips('您未选中任何商品');
                }              
            }
        });
        //提交订单
        $(document).on('click', '.btn-submit', function(){
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                _mm.errorTips('您选择商品后再提交');
            }
        });
    },
    //加载购物车页面
    loadCart: function(){
        var _this = this;
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showError(errMsg);
        });
    },
    //渲染购物车html
    renderCart: function(data){
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml = _mm.renderHtml(templateIndex, data);
         $('.page-wrapper').html(cartHtml);
        //通知导航的购物车更新数量
        nav.loadCartCount();
    },
    //删除商品
    deleteProduct: function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showError(errMsg);
        })
    },

    filter: function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showError: function(errMsg){
        $('.page-wrapper').html('<p class="err-tip">哪里不对了，刷新下试试吧</p>');
    }

};
$(function(){
    page.init();
});