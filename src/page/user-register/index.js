/*
* @Author: midoDaddy
* @Date:   2017-06-23 10:39:59
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-27 16:28:28
*/

'use strict';
require('./index.css');
require('page/common/simple-nav/index.js');
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
        //验证用户名
        $('#username').blur(function() {
            var username = $.trim($(this).val());
            if (!username) {
                return;
            }
            _user.checkUsername(username, function(res) {
                formError.hide();
            }, function(errMsg) {
                formError.show(errMsg);
            });
        });
        // 提交事件
        $('#submit-btn').click(function() {
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
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register';
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
        //验证用户名是否为空
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        //验证密码是否为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码不能少于6位';
            return result;
        }
        //验证两次输入的密码，是否一致
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
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
    }
}
$(function() {
    page.init();
});