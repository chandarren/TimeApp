// pages/personal/myinvited.js
var app = getApp();
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList:false,//列表是否为空
    myList:{}//列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取用户设置的纪念日事件集合
    api.sendRequest(app.globalData.url + '/Interface/Account.ashx', 'POST', { "action": "getmyinvited", "pushcode": wx.getStorageSync("theuserinfo").pushCode}).then(function (response) {
      if (response.data.status == 1) {
        that.setData({
          hasList: true,
          myList: response.data.data
        })
      }
    }, function (error) {
      
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