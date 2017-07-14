/*
* @Author: midoDaddy
* @Date:   2017-07-13 22:51:43
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-14 10:16:45
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
var Pagination      = require('util/pagination/index.js');


var page = {
    data: {
        listParam : {
            pageNum : 1,
            pageSize : 1
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderList();
    },
    loadOrderList: function(){
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class=loading></div>');
        _order.getOrderList(this.data.listParam, function(res){
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage     : res.hasPreviousPage,
                prePage             : res.prePage,
                hasNextPage         : res.hasNextPage,
                nextPage            : res.nextPage,
                pageNum             : res.pageNum,
                pages               : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class=err-tip>加载订单失败，请刷新后重试</P>')
        });
    },
    //加载分页信息
    loadPagination: function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
                container : $('.pagination'),
                onSelectPage : function(pageNum) {
                    _this.data.listParam.pageNum = pageNum;
                    _this.loadOrderList();
                }
            })
        );
    }
}
$(function() {
    page.init();
});