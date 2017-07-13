/*
* @Author: midoDaddy
* @Date:   2017-07-12 16:22:18
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-13 18:14:37
*/

'use strict';
var _mm = require('util/mm.js');
var _address = {
    //用户登录
    getAddressList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //保存收件人信息
    saveAddress: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //更新收件人信息
    updateAddress: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //删除收件人信息
    deleteAddress: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //获取收件人信息
    getSelectedAddress: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
}

module.exports = _address;