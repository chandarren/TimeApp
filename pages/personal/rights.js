// pages/mine/rights.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //点击登录
  clickLogin: function () {
    wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
  },

  login:function(){
    if(wx.getStorageSync("userId")==''){
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userifno = wx.getStorageSync("theuserinfo");
    if(userifno!=""){      
      this.setData({
        userAvator: userifno.avatar,
        userNickname: userifno.nickName,
        expireTime: userifno.expireTime,
        productName: userifno.proName
      })
    }    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})