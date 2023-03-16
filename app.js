// var n = require("D3AF777737F758DFB5C91F7092EB5DF1.js").default


// app.js
App({
    globalData: {
        web_server_base_url: 'http://127.0.0.1:5001',
        avatarUrl: ''
    }
//   onLaunch() {
//     wx.checkSession({
//         // success: res => {
//         //   console.log('success: checkSession ----> ')
//         // },
//         success: res => {
//             // 登录
//             console.log('fail: login ----> ')
//             wx.login({
//                 success: res => {
//                     console.log(res)  // 获取code
//                     // 发送 res.code 到后台获取openId
//                     if (res.code) {
//                         // 发起网络请求
//                         wx.request({
//                             url: web_server_base_url + '/wxuser/wxlogin',
//                             data: { code: res.code },
//                             header: {'content-type': 'application/json'},
//                             success: res => {
//                                 console.log('------', res.data)
//                                 console.log('--&&&&&----', res)
//                                 // 缓存open_id小程序本地
//                                 // wx.setStorageSync('open_id', res.data.open_id); //把名字存到缓存
//                                 wx.navigateTo({
//                                     url: '/pages/index/index',
//                                 })
//                             }
//                         })
//                     } else {
//                         console.log('登录失败！' + res.errMsg)
//                     }
//                 }
//             })
//         }
//       })
//   }
})
