/*
* @Author: midoDaddy
* @Date:   2017-07-05 21:45:18
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-05 22:39:38
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
    //用户登录
    getProductList: function(listParam, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
}

module.exports = _product;