/*
* @Author: midoDaddy
* @Date:   2017-06-21 09:50:01
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-06-29 17:24:44
*/

'use strict';
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            { name: 'user-center', desc: '个人中心', href: './user-center.html' },
            { name: 'order-list', desc: '我的订单', href: './order-list.html' },
            { name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html' },
            { name: 'about', desc: '关于MMall', href: './about.html' }
        ]
    },
    init: function(option){
        $.extend(this.option, option);       
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function() {
        //计算active数据
        for (var i = 0, length = this.option.navList.length; i < length; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        //渲染list数据
        var template = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        //html放入容器
        $('.nav-side').html(template);
    }
};
module.exports = navSide;