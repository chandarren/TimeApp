// pages/event/eventdetail2.js
//var eventItem;
var app = getApp();
const api = require('../../utils/api');
var pushCode;
var eventId;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //一键加入我的提醒
  oneButtonJoin:function(){
    /*wx.navigateTo({
      url: '/pages/welcome/welcome?pushcode=' + pushCode + '&eventid=' + eventId + ''
    })*/
    
      var that = this;
      //加入到我的事件
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "joinevent", "userid": wx.getStorageSync("userId"), "event": eventId }).then(function (response) {
        if (response.data.status == 1) {
          wx.showToast({
            title: response.data.data,
            icon: 'none',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/event/eventlist',
          })
        } else {
          wx.showToast({
            title: response.data.data,
            icon: 'none',
            duration: 2000
          })
        }
      }, function (error) {
        console.log(error);
      })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {        
    pushCode = options.pushcode;    
    console.log('邀请码:'+pushCode);
    
    if (wx.getStorageSync("openId") == "") {
      wx.navigateTo({
        url: '/pages/welcome/welcome?sharetype=share&shixiao='+options.shixiao+'&pushcode=' + pushCode + '&eventid=' + options.eventid+''
      })
    } else {
      var that = this;
      //获取事件详情
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "getdetail", "event": options.eventid, "shixiao": options.shixiao == -1 ? 1 : 0 }).then(function (response) {
        eventId = response.data.data.id;
        that.setData({
          day: response.data.data.date_remark == -1 ? '--' : (response.data.data.date_remark == 0 ? '今天' : (response.data.data.date_remark == 1 ? '明天' : (response.data.data.date_remark == 2 ? '后天' : response.data.data.date_remark))),
          dayTxt: response.data.data.date_remark == -1 ? '' : (response.data.data.date_remark == 0 ? '' : (response.data.data.date_remark == 1 ? '' : (response.data.data.date_remark == 2 ? '' : '天后'))),
          gongli: response.data.data.gongli_date,
          nongli: response.data.data.nongli_date,
          theme: response.data.data.theme,
          describe: response.data.data.describe,
          fromshare: response.data.data.fromshare,
          eventTitle: response.data.data.title,
          eventDescribe: response.data.data.describe
        })
      }, function (error) {
        console.log(error);
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