var conf = {
    serverHost: ''
};
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
    //统一登录处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    },
};
module.exports = _mm;