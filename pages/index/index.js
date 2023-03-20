// index.js
// 获取应用实例
const app = getApp()
var globaldata = app.globalData;
Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  autoLogin: function(){
    wx.login({
      success: resp => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(resp);
        var that = this;
        // 获取用户信息
        wx.getSetting({
          success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
            success: userResult => {
              var platUserInfoMap = {}
              platUserInfoMap["encryptedData"] = userResult.encryptedData;
              platUserInfoMap["iv"] = userResult.iv;
              wx.request({
                    url:  globaldata.serverHost + 'user/wxlogin',
                    data: { 
                      platCode: resp.code,
                      platUserInfoMap: platUserInfoMap,
                    },
                    header: {
                      "Content-Type": "application/json"
                    },
                    method: 'POST',
                    dataType:'json',
                      success: function (res) {
                      console.log(res)
                      wx.setStorageSync("userinfo", res.data.userinfo) //设置本地缓存
                      if(res.data.code==10000)
                        wx.switchTab({
                          url: '../main/main',
                        })
                      if(res.data.code==10001)
                        wx.showModal({
                          title: '温馨提示',
                          content: '注册未审核，请耐心等待',
                          showCancel: false,
                          success(res) {},
                          fail(res) {}
                        })
                      if(res.data.code==10002)
                        wx.showModal({
                          title: '温馨提示',
                          content: '用户未注册，请注册后使用',
                          showCancel: false,
                          success(res) {
                            wx.navigateTo({
                              url: '../register/register'
                            })
                          },
                          fail(res) {}
                        })
                    }
                    })
              }
            })
          } 
          }
        })
        }
      })
  },
  getUserInfo(e){
    this.setData({
      avatarUrl: e.detail.avatarUrl
    })  
  }
})
