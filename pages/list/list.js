// pages/list/list.js
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [
            { id: 1, views: 4532, title: '江歌母亲称将把赔偿款捐给失学儿童，接下来将继续起诉诋毁女儿名誉的人，事件后续可能会如何发展？', cover: 'https://pic2.zhimg.com/80/v2-72cf26124463eee13e3f6407cb6f3972_400x224.png'},
            { id: 2, views: 3334, title: '车位被占用，锁住占用我车位的车侵权吗', cover: 'https://pic1.zhimg.com/50/v2-d56fa055f0d49e8d6310b8203bc3cd33_400x224.jpg'},
            { id: 3, views: 3001, title: '我才 24 岁，现在每月 7000 工资，朝九晚五，无所事事混日子，不知道该不该辞职出去闯一闯?', cover: 'https://pica.zhimg.com/80/v2-ca8afa5472255ae34162dfe6812c337d_400x224.png'},
            { id: 4, views: 2348, title: '「百亿票房」演员中前十位中没有女演员，是因为女演员的票房号召力不如男演员吗？', cover: 'https://pic2.zhimg.com/80/v2-990ed136cc42d63a5b8352db7029214d_400x224.png'},
            { id: 5, views: 1873, title: '1月10日西安公布解除封控管理相关政策，封控区管控区调整需满足三个条件，还有哪些信息值得关注？', cover: 'https://pica.zhimg.com/80/v2-815e9da7e7c41a67fc5d06e6ff7ae53d_400x224.png'},
            { id: 6, views: 1501, title: '如果你是《步步惊心》里的若曦，你会在哪件事情上做出跟原著中不同的操作？', cover: 'https://pic2.zhimg.com/50/v2-9ffc1b5ecbef6278b1653b19f543af6a_400x224.jpg'},
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
                console.log('获取新闻列表 ---> ', res.data)
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