// pages/article/Notice.js
var app = getApp();
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;   
    that.setData({
      viewContainerH: app.globalData.rpxHeight - 220,
      inputBirthdayM: app.globalData.matrixing * 68      
    })

    //获取最新的系统公告
    api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "sysnotice" }).then(function (response) {
      console.log(response.data);
      that.setData({
        notice_content: response.data.data.content,
        datetime: response.data.data.datetime
      })
    }, function (error) {
      console.log(error);
    })
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