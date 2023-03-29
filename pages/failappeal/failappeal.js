const app = getApp()
var globaldata = app.globalData;
var util = require('../../utils/util');
var date = util.formatDate(new Date());
Page({
    data: {
        username: null,
        staffID: null,
        morning_flag: null,
        date: null,
        morning_str: '上班',
        reason: '',
    },
    onLoad(options) {
      var userinfo = wx.getStorageSync('userinfo')
      this.setData({
        morning_flag: options.morning_flag,
        date: date,
        username: userinfo.username,
        staffID: userinfo.staffID
      })
      if(this.data.morning_flag=='false')
        this.setData({
          morning_str: '下班'
        })
      else
        this.setData({
          morning_str: '上班'
        })
    },
    inputRemark:function(option){
      let value = option.detail.value;
      this.setData({
        reason: value
      })
    },
    formSubmit: function(e){
      let vm = this;
      wx.request({
        url:  globaldata.serverHost + 'appeal/submit',
        data: { 
          date: vm.data.date,
          staffID: vm.data.staffID,
          appeal_reason: vm.data.reason,
          morning_flag: vm.data.morning_flag,
          category: 0
        },
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        dataType:'json',
          success: function (res) {
            wx.showToast({
              title: '提交成功',
              duration:2000,
              mask:true,
              icon:'success',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../main/main'
              })
            }, 2000);
          }
        })
    },
})
