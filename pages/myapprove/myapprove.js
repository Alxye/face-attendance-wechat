require("../../@babel/runtime/helpers/Arrayincludes");
const util = require('../../utils/util.js');
var app = getApp();
var globaldata = app.globalData;
Page({
  data: {
    amPms: ["上班", "下班"],
    startAmPm: "上班",
    endAmPm: "下班",
    startAmPmIndex: 0,
    endAmPmIndex: 1,
    currentDate: util.getNowDate(new Date()),
    startDate: util.getNowDate(new Date()),
    endDate: util.getNowDate(new Date()),
    remark: ''
  },
  onLoad: function () {

  },
  bindDateChangeStart: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindDateChangeEnd: function (e) {
    this.setData({
      endDate: e.detail.value
    });
  },
  pickedAmPm: function (a) {
    "startAmPm" == a.currentTarget.dataset.flag ? this.setData({
      startAmPmIndex: a.detail.value,
      startAmPm: this.data.amPms[a.detail.value]
    }) : this.setData({
      endAmPmIndex: a.detail.value,
      endAmPm: this.data.amPms[a.detail.value]
    });
  },
  inputRemark: function (a) {
    this.data.remark = a.detail.value;
  },

  save: function (e) {
    wx.showLoading({
      title: "提交中...",
      mask: true
    })
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo');
    wx.request({
      url: globaldata.serverHost + 'my_approve/apply',
      data: {
        staffID: userinfo.staffID,
        appeal_reason: vm.data.remark,
        startDate: vm.data.startDate,
        startAmPm: vm.data.startAmPm,
        endDate: vm.data.endDate,
        endAmPm: vm.data.endAmPm,
        category: 1
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          mask: true,
          icon: 'success',
        })
        wx.navigateBack();
      }
    })
  }
});