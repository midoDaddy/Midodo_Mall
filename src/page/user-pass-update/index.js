/*
* @Author: midoDaddy
* @Date:   2017-06-29 15:43:57
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-30 14:04:46
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');


var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                password          : $.trim($('#password').val()),
                passwordNew       : $.trim($('#password-new').val()),
                passwordConfirm   : $.trim($('#password-confirm').val())
            },
            validateResult = _this.formValidate(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg) {
                    _mm.successTips(msg);
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
        //验证原密码是否为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        //验证新密码
        if (!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码不能少于6位';
            return result;
        }
        //验证新密码确认
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '新密码输入不一致';
            return result;
        }
        //验证通过，返回数据
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
}
$(function() {
    page.init();
});