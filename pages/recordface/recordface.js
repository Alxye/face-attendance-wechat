const app = getApp()
var globaldata = app.globalData;

Page({
  data: {
    devicePosition:'back',
    isAuth: false,
    istaken: false,
    tempImagePath: '',
    staffID: '',
    completed: false
  },
  onLoad(options) {
    this.setData({
      staffID:options.staffID
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
          vm.setData({
            tempImagePath: file,
            istaken: true,
          })
        },
        fail: (res) => {
          //拍摄失败
        },
      })
    }
  },
  rephoto: function(){
    let vm = this;
    vm.setData({
      istaken: false
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

  check_update:function(){
    let vm = this;
    wx.uploadFile({
      url:  globaldata.serverHost + 'user/facerecord',
      filePath: vm.data.tempImagePath,
      name: 'files',
      formData: {
        staffId: vm.data.staffID
      },
      success: function (res){
        var json= JSON.parse(res.data)
        if(json.state==1){
          vm.setData({
            completed: true
          })
          wx.showToast({
            title: '信息上传成功',
            duration:2000,
            mask:true,
            icon:'success',
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../index/index'
            })
          }, 3000);
        }
        else{
          wx.showToast({
            title: '人脸未识别成功，请重新拍照',
            duration:2000,
            mask:true,
            image:'/imgs/error.png',
          })
          vm.setData({
            istaken: false
          })
        }
      }
    })
  },
})
