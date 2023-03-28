const app = getApp();
const util = require('../../utils/util.js');
var globaldata = app.globalData;
Page({
  data: {
    currentDate: util.getNowDate(new Date()),
    currentDate2: util.getNowDate(new Date()),
    todayInfo_late: 0,
    todayInfo_leaveEarly: 0,
    todayInfo_lackCount: 0,
    avatarUrl: "/imgs/cus.png",
    subscribe_state: '',
    notice: '11ddd11'
  },
  onLoad: function (e) {
    let a = this;

  },
  onShow() {
    this.get_today_attendence();

  },
  get_today_attendence: function () {
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo');
    wx.request({
      url: globaldata.serverHost + 'my/today_record',
      data: {
        staffID: userinfo.staffID,
        departmentID: userinfo.departmentID,
        date: this.data.currentDate,
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.data.code == 1) {
          vm.setData({ 
            todayInfo_late: res.data.am_type == 2 ? 1 : 0,
            todayInfo_leaveEarly: res.data.pm_type == 2 ? 1 : 0,
            todayInfo_lackCount: res.data.am_type == 0 && res.data.pm_type == 0 ? 2 : res.data.am_type == 0 || res.data.pm_type == 0 ? 1 : 0,
            notice: res.data.notice
          })
        }
      }
    })
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl: avatarUrl,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      currentDate: e.detail.value
    }),
    this.get_today_attendence();
  },
  getTodayInfo: function () {
    var e = this;

  },
  subscribe: function (e){
    let vm = this;
    vm.setData({
      subscribe_state: ''
    })
    wx.requestSubscribeMessage({
      tmplIds: [globaldata.templateID],
      success(res) {
        console.log(res);
        wx.getSetting({
          
          withSubscriptions: true,
          success (resp) {
            if(resp.subscriptionsSetting.itemSettings!=undefined){
              if(resp.subscriptionsSetting.itemSettings[globaldata.templateID]!=undefined)
                vm.setData({
                  subscribe_state: resp.subscriptionsSetting.itemSettings[globaldata.templateID]
                })
            }
            vm.subscribe_message(res);
          }
        })
        }
      })
  },
  subscribe_message: function(res){
    console.log(res)
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo');
    // console.log('subscribe_state:'+vm.data.subscribe_state);
    if(vm.data.subscribe_state!='accept'){
      // console.log('没有长期订阅');
      wx.request({
        url:  globaldata.serverHost + 'message/cancel_subscription',
        data: { 
          openid: userinfo.openid
        },
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        dataType:'json',
        success: function (res) {
          // console.log('job clear')
        }
      })
      if(res[globaldata.templateID]=='accept'){
        wx.request({
          url:  globaldata.serverHost + 'message/subscription',
          data: { 
            departmentid: userinfo.departmentID,
            openid: userinfo.openid
          },
          header: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          dataType:'json',
          success: function (res) {
            wx.showModal({
              title: '温馨提示',
              content: '订阅成功',
              showCancel: false,
              success(res) {},
              fail(res) {}
            })
          }
        })
      }
    }
    else{
      // console.log('长期订阅');
      wx.request({
        url:  globaldata.serverHost + 'message/subscription_state_search',
        data: { 
          openid: userinfo.openid
        },
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        dataType:'json',
        success: function (resp) {
          if(resp.data.code=='1'){
            wx.showModal({
              title: '温馨提示',
              content: '已订阅,无需重复订阅',
              showCancel: false,
              success(res) {},
              fail(res) {}
            })
          }
          else{
            if(res[globaldata.templateID]=='accept'){
              wx.request({
                url:  globaldata.serverHost + 'message/subscription_longtime',
                data: { 
                  departmentid: userinfo.departmentID,
                  openid: userinfo.openid
                },
                header: {
                  "Content-Type": "application/json"
                },
                method: 'POST',
                dataType:'json',
                success: function (res) {
                  wx.showModal({
                    title: '温馨提示',
                    content: '订阅成功',
                    showCancel: false,
                    success(res) {},
                    fail(res) {}
                  })
                }
              })
            }
          }
        }
        })
      }
  }
});