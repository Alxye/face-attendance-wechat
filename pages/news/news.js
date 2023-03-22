// pages/list/list.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [
            { id: 1, title: '996=ICU', cover: 'https://repository-images.githubusercontent.com/177736533/c6d4cd80-62d2-11e9-89c2-d2c97465e7e3'},
            { id: 2, title: '996=ICU', cover: 'https://repository-images.githubusercontent.com/177736533/c6d4cd80-62d2-11e9-89c2-d2c97465e7e3'},
            { id: 3, title: '996=ICU', cover: 'https://repository-images.githubusercontent.com/177736533/c6d4cd80-62d2-11e9-89c2-d2c97465e7e3'},
            { id: 4, title: '996=ICU', cover: 'https://repository-images.githubusercontent.com/177736533/c6d4cd80-62d2-11e9-89c2-d2c97465e7e3'},
            { id: 5, title: '996=ICU', cover: 'https://repository-images.githubusercontent.com/177736533/c6d4cd80-62d2-11e9-89c2-d2c97465e7e3'},
            { id: 6, title: '996=ICU', cover: 'https://repository-images.githubusercontent.com/177736533/c6d4cd80-62d2-11e9-89c2-d2c97465e7e3'},
          ]
    },
    redirectToSerchPage: function() {
        this.pageRouter.navigateTo({
          url: '../search/search'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('onLoad-onLoad-onLoad....')
        // 发起网络请求
        wx.request({
            url: app.globalData.web_server_base_url + '/news/all',
            header: {'content-type': 'application/json'},
            success: res => {
                console.log('获取公告列表 ---> ', res.data)
                this.setData({
                    dataList: res.data
                })
            }
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