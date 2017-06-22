/*
* @Author: midoDaddy
* @Date:   2017-06-21 17:13:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-22 13:02:58
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function() {
       $('.error-item').hide().find('.error-msg').text(''); 
    }
};
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('#btn-login').click(function() {
            _this.submit();
        });
        $('.user-input').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }          
        });
    },   
    submit: function() {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.login(formData, function(res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            });
        } else {
           formError.show(validateResult.msg)
        }       
    },
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证通过，返回数据
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function() {
    page.init();
});