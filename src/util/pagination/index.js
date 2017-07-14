/*
* @Author: midoDaddy
* @Date:   2017-07-06 15:27:03
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-06 18:13:54
*/

'use strict';

require('./index.css');
var templatePage = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    }
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        if ($this.hasClass('disabled') || $this.hasClass('active')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
            _this.option.onSelectPage($this.data('value')) : null;
    })
};
//渲染分页组件
Pagination.prototype.render = function(userOption){
    this.option = $.extend({}, this.defaultOption, userOption);
    //判断容器是否合法
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    //判断是否只有一页
    if (this.option.pages <= 1) {
        return;
    }
    this.option.container.html(this.getPaginationHtml())
}

Pagination.prototype.getPaginationHtml = function(){
    var pageHtml = '',
        option = this.option,
        pageArray = [],
        start = option.pageNum > option.pageRange ? (option.pageNum - option.pageRange) : 1,
        end = option.pageNum + option.pageRange < option.pages ? 
            (option.pageNum + option.pageRange) : option.pages;
    pageArray.push({
        name        : '上一页',
        value       : option.prePage,
        disabled    : !option.hasPreviousPage
    });
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name    : i,
            value   : i,
            active  : (i === option.pageNum)
        });
    }
    pageArray.push({
        name        : '下一页',
        value       : option.nextPage,
        disabled    : !option.hasNextPage
    });
    pageHtml = _mm.renderHtml(templatePage, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return pageHtml;
};

module.exports = Pagination;