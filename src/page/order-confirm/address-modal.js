/*
* @Author: midoDaddy
* @Date:   2017-07-13 11:05:34
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-07-13 17:50:20
*/

'use strict';

var _mm                     = require('util/mm.js');
var _address                = require('service/address-service.js');
var _cities                 = require('util/cities/index.js')
var templateAddressModal    = require('./address-modal.string');

var addressModal = {
    show: function(option){
        this.option = option;
        this.option.data = option.data || {};
        this.modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //省份城市二级联动
        $('#receiver-province').change(function(){
            var provinceName = $(this).val();
            _this.loadCities(provinceName);
        });
        //保存收件人信息
        $('.address-confirm-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            if (!isUpdate && receiverInfo.status) {
                _address.saveAddress(receiverInfo.data, function(res){
                    _mm.successTips('信息添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg)
                });
            } else if (isUpdate && receiverInfo.status) {
                 _address.updateAddress(receiverInfo.data, function(res){
                    _mm.successTips('信息更新成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg)
                });
            } else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
            }
        });
        //关闭弹窗
        $('.close').click(function() {
            _this.hide();
        });
        //点击弹窗内元素时组织冒泡，不关闭弹窗
        $('.modal-con').click(function(e) {
            e.stopPropagation();
        });       
    },
    hide: function(){
        this.modalWrap.empty();
    },
    loadModal: function(){
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate    : this.option.isUpdate,
            data        : this.option.data
        });
        this.modalWrap.html(addressModalHtml);
        this.loadProvince();
    },
    loadProvince: function(){
        var provinceList = _cities.getProvinces() || [];
        $('#receiver-province').html(this.getSelectOptions(provinceList));
        if (this.option.isUpdate) {
            $('#receiver-province').val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function(provinceName){
        var cityList = _cities.getCities(provinceName);
        $('#receiver-city').html(this.getSelectOptions(cityList));
        if (this.option.isUpdate) {
            $('#receiver-city').val(this.option.data.receiverCity);
        }
    },
    //获取select选项
    getSelectOptions: function(arr){
        var html = '<option value="">请选择</option>';
        for(var i = 0, length = arr.length; i < length; i++){
            html += '<option value="' + arr[i] + '">' + arr[i] + '</option>';
        }
        return html;
    },
    //获取收件人信息
    getReceiverInfo: function(){
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim($('#receiver-name').val());
        receiverInfo.receiverProvince = $('#receiver-province').val();
        receiverInfo.receiverCity = $('#receiver-city').val();
        receiverInfo.receiverPhone = $.trim($('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim($('#receiver-address').val());
        receiverInfo.receiverZip = $.trim($('#receiver-zip').val());
        if (this.option.isUpdate) {
            receiverInfo.id = this.option.data.id;
        }      
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人地址';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
};
module.exports = addressModal;