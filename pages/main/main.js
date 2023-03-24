var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');//引入SDK文件
var qqmapsdk;
var util = require('../../utils/util');
var date = util.formatDate(new Date());
var DATE = util.formatonlytime(new Date());
var Weekday = util.getWeekByDate(new Date());
const app = getApp()
var globaldata = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    district: '',
    distance: 0,
    formatted_addresses: '',
    location_icon: 'gray',
    morning_flag: true,
    date: date,
    myTime:DATE,
    get_addressed: false,
    weekday: Weekday,
    spot1_color: 'orange',
    spot2_color: 'gray',
    morning_attendence_state: 0,
    morning_attandence_time: '',
    morning_attandence_address: '',
    afternoon_attendence_state: 0,
    afternoon_attandence_time: '',
    afternoon_attandence_address: '',
    morning_state_list: ['未打卡','已打卡','迟到'],
    afternoon_state_list: ['未打卡','已打卡','早退']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    qqmapsdk = new QQMapWX({
      key: globaldata.mapkey
    });
  },
  get_today_attendence: function(){
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo')
    wx.request({
      url:  globaldata.serverHost + 'attendance/today_record',
      data: { 
        staffID: userinfo.staffID,
        date: date,
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType:'json',
        success: function (res) {
          if(res.data.code!=0){
            vm.setData({
              morning_attendence_state: res.data.am_type,
              morning_attandence_time: '',
              morning_attandence_address: '',
              afternoon_attendence_state: res.data.pm_type,
              afternoon_attandence_time: '',
              afternoon_attandence_address: '',
            })
            if(res.data.am_type!=0){
              vm.setData({
                morning_attandence_time: res.data.clock_in_time,
                morning_attandence_address: res.data.am_address,
              })
            }
            if(res.data.pm_type!=0){
              vm.setData({
                afternoon_attandence_time: res.data.clock_out_time,
                afternoon_attandence_address: res.data.pm_address,
              })
            }
          }
        }
      })
  },
  getaddress: function(){
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) 
        {//如果没有授权就提示需要授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        // var speed = res.speed
        // var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  calc_distance: function (latitude, longitude) {
    var weidu2 = 31.270157;
    var jingdu2 = 120.745253;
    var radweidu1 = this.Rad(latitude);
    var radweidu2 = this.Rad(weidu2);
    var a = radweidu1 - radweidu2;
    var b = this.Rad(longitude) - this.Rad(jingdu2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radweidu1) * Math.cos(radweidu2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10;
    s = s.toFixed(1) //保留两位小数
    let vm = this;
    vm.setData({
      distance: s,
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      // get_poi: 1,
      // poi_options: 'radius=2000',
      success: function (res) {
        console.log(res);
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        let formatted_addresses = res.result.formatted_addresses.recommend
        vm.setData({
          get_addressed: true,
          city: city,
          district: district,
          formatted_addresses: formatted_addresses,
        })
        if(vm.data.morning_flag){
          vm.setData({
            location_icon: 'orange',
          })
        }
        else{
          vm.setData({
            location_icon: '#0080FF',
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
    vm.calc_distance(latitude, longitude);
  },
  // 计算距离函数
  Rad(d) { 
    // console.log(d,'这里是D');
    //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  

  onReady() {

  },
  attandence_request: function(event){
    let vm = this;
    if(!vm.data.get_addressed){
      wx.showModal({
        title: '温馨提示',
        content: '打卡请先获取当前位置',
        showCancel: false,
        success(res) {},
        fail(res) {}
      })
    }
    else{
      if(vm.data.distance>250.0){
        wx.showModal({
          title: '温馨提示',
          content: '距离打卡点过远',
          showCancel: false,
          success(res) {},
          fail(res) {}
        })
      }
      else{
        if((vm.data.morning_flag==true&&vm.data.morning_attendence_state!=0)||(vm.data.morning_flag==false&&vm.data.afternoon_attendence_state!=0)){
          wx.showModal({
            title: '温馨提示',
            content: '已打卡，请勿重复打卡',
            showCancel: false,
            success(res) {},
            fail(res) {}
          })
        }
        else{
          var userinfo = wx.getStorageSync('userinfo')
          var staffID = userinfo.staffID;
          wx.navigateTo({ 
            url: '../facecheck/facecheck?staffID=' + staffID + "&date=" + vm.data.date+ "&formatted_addresses=" + vm.data.formatted_addresses + "&morning_flag=" + vm.data.morning_flag
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let vm = this;
    var userinfo = wx.getStorageSync('userinfo');
    wx.request({
      url:  globaldata.serverHost + 'attendance/judge_morning_flag',
      data: { 
        departmentID: userinfo.departmentID,
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType:'json',
        success: function (res) {
          if(res.data.code==1){
            vm.setData({
              morning_flag: true,
              spot1_color: 'orange',
              spot2_color: 'gray'
            })
          }
          else{
            vm.setData({
              morning_flag: false,
              spot1_color: 'gray',
              spot2_color: '#0080FF'
            })
          }
        }
    })
    vm.timer=setInterval(() => {
          var DATE = util.formatonlytime(new Date());
          this.setData({
              myTime: DATE
          })
    }, 1000);
    vm.get_today_attendence();
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
    var vm = this;
    if (vm.timer) {
      clearInterval(vm.timer); // 在Vue实例销毁前，清除我们的定时器
    }
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