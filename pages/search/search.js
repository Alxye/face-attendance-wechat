// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      navHeight: 0,
      hotTopic: [
        { id: 1, title: '中国会成为下一个强国吗?' },
        { id: 2, title: '鬼灭之刃第二季更新' },
        { id: 3, title: '华为的员工会失业吗?' },
        { id: 4, title: '苏州有哪些值得去的景点?' },
        { id: 5, title: '就业形势越来越严峻了吗?' },
        { id: 6, title: '为什么IT外包永远在招人?' },
        { id: 7, title: '有哪些是你去江苏才知道的事?' },
        { id: 8, title: '为什么年轻人不愿意去银行工作?' },
      ],
      isSearching: true,
      searchVal: '',
      relationList: ['MySQL', '就业', '苏州', 'IT', '寒山寺'],
      resultList: [
        { id: 1, title: 'MySQL HeatWave', support: 30, remark: 41, time: '4月前', content: 'MySQL数据库服务是一个完全托管的数据库服务，可使用世界上最受欢迎的开源数据库来部署云原生应用程序。 它是百分百由MySQL原厂开发，管理和提供支持。' },
        { id: 2, title: 'MySQL Cluster CGE', support: 30, remark: 41, time: '4月前', content: '凭借无可比拟的扩展能力、正常运行时间和灵活性，MySQL Cluster 使用户能够应对下一代 Web、云及通信服务的数据库挑战。' },
      ],
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        navHeight: wx.getStorageSync('navInnerHeight')
      })
    },
    onInputChange: function (e) {
      this.setData({
        searchVal: e.detail.value,
        isSearching: true,
      })
    },
    onViewResult: function (e) {
      let currSearchVal = this.data.searchVal
      if (e.currentTarget.dataset && e.currentTarget.dataset.value) {
        currSearchVal = e.currentTarget.dataset.value
      }
      this.setData({
        isSearching: false,
        searchVal: currSearchVal
      })
    },
    redirectToHome: function() {
      this.pageRouter.switchTab({
        url: '../index/index'
      })
    },
    redirectToBack: function() {
      this.pageRouter.navigateBack()
    }
  })