var util = require('../../utils/util');
const app = getApp()
var globaldata = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    staffID: '',
    date: '',
    time: '',
    formatted_addresses: '',
    devicePosition:'back',
    isAuth: false,
    istaken: false,
    tempImagePath: '',
    morning_flag: true,
    check_failure: false
  },
  rephoto: function(){
    let vm = this;
    vm.setData({
      istaken: false
    })
  },
  to_appeal: function(){
    let vm = this;
    vm.setData({
      isAuth: false
    })
    wx.navigateTo({
      url: '../failappeal/failappeal?morning_flag=' + vm.data.morning_flag,
    })
  },

  onLoad(options) {
    this.setData({// 把从index页面获取到的属性值赋给详情页的my，供详情页使用
      staffID:options.staffID,
      date:options.date,
      formatted_addresses:options.formatted_addresses,
      morning_flag: options.morning_flag
    })
    const _this = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          _this.setData({
            isAuth: true
          })
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              _this.setData({
                isAuth: true
              })
            },
            fail() { // 用户不同意授权
              _this.openSetting().then(res => {
                _this.setData({
                  isAuth: true
                })
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
      }
    })
  },
  // 打开授权设置界面
  openSetting() {
    const _this = this
    let promise = new Promise((resolve, reject) => {
      wx.showModal({
        title: '授权',
        content: '请先授权获取摄像头权限',
        success(res) {
          console.log(res)
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.camera']) { // 用户打开了授权开关
                  resolve(true)
                } else { // 用户没有打开授权开关， 继续打开设置页面
                  _this.openSetting().then(res => {
                    resolve(true)
                  })
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          } else{
            reject()
          }
        }
      })
    })
    return promise;
  },
  reverseCamera:function(){
    this.setData({
      devicePosition: "back" === this.data.devicePosition ? "front" : "back"
  });
  },
  takePhoto:function() {
    //拍摄照片
    var that = this;
    if(that.data.isAuth==false){
      that.openSetting().then(res => {
        that.setData({
          isAuth: true
        })
      })
    }
    else{
      let vm = this;
      wx.createCameraContext().takePhoto({
        quality: 'high',//拍摄质量(high:高质量 normal:普通质量 low:高质量)
        success: (res) => {
          var file = res.tempImagePath;
          var time = util.formatonlytime(new Date());
          vm.setData({
            tempImagePath: file,
            istaken: true,
            time: time,
          })
          vm.check_update()
        },
        fail: (res) => {
          //拍摄失败
        },
      })
    }
  },
  check_update:function(){
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo')
    var morning = 0;
    if(vm.data.morning_flag=='true')
      morning = 1;
    else
      morning = 0;
    wx.uploadFile({
      url:  globaldata.serverHost + 'attendance/update_info',
      filePath: vm.data.tempImagePath,
      name: 'files',
      formData: {
        staffId: vm.data.staffID,
        morning_flag: morning,
        date: vm.data.date,
        time: vm.data.time,
        address: vm.data.formatted_addresses,
        departmentID: userinfo.departmentID
      },
      success: function (res){
        var json= JSON.parse(res.data)
        if(json.code==1||json.code==2){
          wx.showModal({
            title: '打卡成功',
            content: '',
            showCancel: false,
            success(res) {},
            fail(res) {}
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../main/main'
            })
          }, 2000);
          
        }
        else{
          if(json.code==0){
            wx.showToast({
              title: '人脸识别失败',
              duration:3000,
              mask:true,
              image:'/imgs/error.png',
            })
          }
          else{
            wx.showToast({
              title: '超出打卡时间段',
              duration:3000,
              mask:true,
              image:'/imgs/error.png',
            })
          }
          vm.setData({
            istaken: false,
            check_failure: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})