// app.js
App({
  onLaunch: function() {
  },
  globalData: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //版本兼容
    serverHost: 'http://192.168.43.41:5001/',
    token: null,
    userInfo: null,
  }
})
