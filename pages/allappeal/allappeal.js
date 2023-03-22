var app = getApp();
const util = require('../../utils/util.js');
var globaldata = app.globalData;

Page({

  data: {
    total: 0,
    list: []

  },

  onLoad(options) {

  },

  onShow() {
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo');
    wx.request({
      url: globaldata.serverHost + 'my_approve/get',
      data: {
        staffID: userinfo.staffID
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        vm.setData({
          list: res.data.List,
          total: res.data.len
        })
      }
    })

  },

})