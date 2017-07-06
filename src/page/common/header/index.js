/*
* @Author: midoDaddy
* @Date:   2017-06-19 17:50:22
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-05 21:51:11
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
    init: function(){
        this.bindEvent();
        this.onLoad();
        return this;
    },
    onLoad: function() {
        var keyword = _mm.getUrlParam('keyword');
        if (keyword) {
           $('#search-input').val(keyword); 
        }       
    },
    bindEvent: function() {
        var _this = this;
        $('#search-btn').click(function(event) {
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(event) {
            if (event.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            //如果提交有keyword，跳转到list页面
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _mm.goHome();
        }
    }
};
header.init();
