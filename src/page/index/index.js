/*
* @Author: midoDaddy
* @Date:   2017-06-09 12:28:17
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-13 10:46:05
*/
var _mm = require('util/mm.js');
_mm.request({
    url: '/product/list.do?keyword=1',
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err)
    }
})
