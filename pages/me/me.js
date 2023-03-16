// pages/user/user.js
// 获取应用单例
const app = getApp()
// 默认头像
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    /**
     * 页面的初始数据
     */
    data: {
      avatarUrl: defaultAvatarUrl,
      userInfo: {},
      userProfileConfig: [
        { text: '创作', key: 'articlesCount' },
        { text: '赞同', key: 'followCount' },
        { text: '喜欢', key: 'likeCount' },
        { text: '收藏', key: 'collectionCount' },
      ],
      navHeight: 0,
      visible: false,
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.setData({
        avatarUrl: avatarUrl
      })
    },
    getUserInfo: function () {
      this.setData({
        userInfo: {
          id: 1,
          articlesCount: 2,
          followCount: 7,
          likeCount: 1,
          collectionCount: 6,
        }
      })
    },
  
    handleBack: function () {
      this.pageRouter.switchTab({
        url: '../list/list'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getUserInfo();
      this.setData({
        navHeight: wx.getStorageSync('navInnerHeight')
      })
    },
    handleOpen: function () {
        this.setData({
            visible: true
        })
    },
    handleClose: function () {
      this.setData({
        visible: false
      })
    },
  })