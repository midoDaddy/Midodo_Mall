/*
* @Author: midoDaddy
* @Date:   2017-06-18 08:47:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-18 11:15:13
*/

'use strict';
var _mm = require('util/mm.js');

var _user = {
    //登出
    logout: function(resolve, reject){
        _mm.request({
            url: _mm.getSververUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查登录状态
    checkLogin: function(){
        _mm.request({
            url: _mm.getSververUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

module.exports = _user;