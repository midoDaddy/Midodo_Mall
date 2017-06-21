/*
* @Author: midoDaddy
* @Date:   2017-06-18 08:47:33
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-20 00:02:06
*/

'use strict';
var _mm = require('util/mm.js');

var _user = {
    //登出
    logout: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查登录状态
    checkLogin: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

module.exports = _user;