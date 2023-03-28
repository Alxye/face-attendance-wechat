// pages/register/register.js
const app = getApp()
var globaldata = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentIndex: null,
    idcheck: false,
    departments: [],
    selected: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let vm = this;
    wx.request({
      url:  globaldata.serverHost + 'department/all',
      data: { 
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType:'json',
      success: function (res) {
        vm.setData({
          departments: res.data.list
        })
      }
    })
  },

  formSubmit: function(e){
    let vm  = this;
    var username = e.detail.value.username;
    var staffID = e.detail.value.staffid;
    if(username==""){
      wx.showModal({
        title: '请填写用户姓名',
        showCancel: false
      })
    }
    else{
      if(staffID==""||!vm.data.idcheck){
        wx.showModal({
          title: '请正确填写员工工号',
          showCancel: false
        })
      }
      else{
        if(!vm.data.selected){
          wx.showModal({
            title: '请选择部门',
            showCancel: false
          })
        }
        else{
          var userinfo = wx.getStorageSync('userinfo');
          wx.navigateTo({
            url: '../recordface/recordface?staffID=' + staffID + "&username=" + username+ "&departmentname=" + vm.data.departments[vm.data.departmentIndex] + "&openid=" + userinfo.openid
          })
        }
      }
    } 
  },
  StaffCheck: function(e){
    let vm = this;
    var staffID = e.detail.value;
    if(staffID!=""){
      wx.request({
        url:  globaldata.serverHost + 'user/id_check',
        data: { 
          staffID: staffID
        },
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        dataType:'json',
        success: function (res) {
          if(res.data.code==1){
            vm.setData({
              idcheck: true
            })
          }
          else{
            vm.setData({
              idcheck: false
            })
            wx.showModal({
              title: '填写的工号已被注册，请确认工号',
              showCancel: false
            })
          }
        }
      })
    }
    else{
      this.setData({
        idcheck: false
      })
    }
  },

  bindDepartmentChange: function (e) {
    this.setData({
      departmentIndex: e.detail.value,
      selected: true
    })
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