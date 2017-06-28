/*
* @Author: midoDaddy
* @Date:   2017-06-27 17:34:53
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-28 12:25:12
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        //输入用户名下一步按钮的点击
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                })
            } else {
                formError.show('请输入用户名');
            }
        });
        //输入密码提示问题答案下一步按钮的点击
        $('#submit-question').click(function() {
            var answer = $.trim($('#answer').val());
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                })
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });

        //输入新密码后按钮的点击
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                }, function(res) {
                   window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                })
            } else {
                formError.show('请输入新密码');
            }
        });
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    //加载第一步：输入用户名
    loadStepUsername: function() {
        $('.step-username').show();
    },
    //加载第二步：输入提示问题答案
    loadStepQuestion: function() {
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //加载第三步：输入新密码
    loadStepPassword: function() {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    },  
}
$(function() {
    page.init();
});