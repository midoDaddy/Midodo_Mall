/*
* @Author: midoDaddy
* @Date:   2017-06-13 09:48:47
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-14 17:33:35
*/
var conf = {
    serverHost: ''
};
var Hogan = require('hogan');
var _mm = {
    //网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'jason',
            data        : param.data    || '',
            success     : function(res) {
                //请求成功
                if (res.status === 0) {
                    typeof param.success === 'funciton' && param.success(res.data, res.msg);
                } 
                // 如果没有登录，强制登录
                else if (res.status === 10) {
                    _this.doLogin();
                }
                //请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'funciton' && param.error(res.msg);
                }
            },
            error       : function(err) {
                typeof param.error === 'funciton' && param.error(error.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function(name) {
        var reg = RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var results = window.location.search.substring(1).match(reg);
        return results ? results[2] : null;
    },
    //渲染html模板
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },  
    //操作成功消息提示
    successTips: function(msg) {
        alert(msg || '操作成功！');
    },
    //操作失败消息提示
    errorTips: function(msg) {
        alert(msg || '出问题啦~');
    },
    //字段验证，支持非空、手机、邮箱的验证
    validate: function(value, type) {
        var value = $.trim(value);
        if (type === 'require') {
            return !!value;
        }
        if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        }
        if (type === 'email') {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    //回到主页
    goHome: function() {
        window.location.href = './index.html';
    },
};
module.exports = _mm;