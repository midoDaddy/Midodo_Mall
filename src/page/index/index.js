/*
* @Author: midoDaddy
* @Date:   2017-06-09 12:28:17
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-05 15:14:23
*/
require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./index.string');

$(function() {
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    //前一张、后一张的事件绑定
    $('.banner-arrow').on('click', function() {
       var direction = $(this).hasClass('prev') ? 'prev' : 'next';
       $slider.data('unslider')[direction]();
    });
});

