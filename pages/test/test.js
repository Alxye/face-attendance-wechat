// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 点击Click me的事件函数
    tapName: function(event) {
        console.log(event)
    },
    // 点击Normal按钮, 跳转到logs页面
    navtologs: function(event) {
        console.log('navtologs-navtologs-navtologs')
        wx.navigateTo({
            url: '../logs/logs?id=1000&name=shirley'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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