var app = getApp();
const util = require('../../utils/util.js');
var globaldata = app.globalData;
var date = util.formatDate(new Date());
Page({
  data: {
    list: [],
    lack_num: 0,
    late_num: 0,
    early_num: 0
  },
  onLoad: function (e) {

  },
  onShow() {
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo');
    wx.request({
      url: globaldata.serverHost + 'my_attendance/all_record',
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
          lack_num: res.data.lack_num,
          late_num: res.data.late_num,
          early_num: res.data.early_num
        })
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },

});