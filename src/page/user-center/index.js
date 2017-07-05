/*
* @Author: midoDaddy
* @Date:   2017-06-28 16:00:41
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-30 14:04:24
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');


var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function() {
        var userInfoHtml = '';
        _user.getUserInfo(function(res) {
            userInfoHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userInfoHtml);
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        })
    }
}
$(function() {
    page.init();
});