/*
* @Author: midoDaddy
* @Date:   2017-06-28 16:23:54
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-30 14:04:30
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
        this.bindEvent();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone   : $.trim($('#phone').val()),
                email   : $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer  : $.trim($('#answer').val())
            },
            validateResult = _this.formValidate(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function(res) {
                    _mm.successTips(res.msg);
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }          
        })
    },
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        //验证手机号
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式有误';
            return result;
        }
        //验证邮箱
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式有误';
            return result;
        }
        //验证提示问题是否为空
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //验证提示问题答案是否为空
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //验证通过，返回数据
        result.status = true;
        result.msg = '验证通过';
        return result;
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