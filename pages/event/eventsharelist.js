var app = getApp();
const api = require('../../utils/api');
var pushCode;
var eventId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventList: {},//事件列表
  },

  //一键加入我的提醒
  oneButtonJoin: function () {
    /*wx.navigateTo({
      url: '/pages/welcome/welcome?pushcode=' + pushCode + '&eventid=' + eventId + ''
    })*/

    var that = this;
    //加入到我的事件
    console.log("传的事件id:"+eventId);
    if (eventId!=undefined){
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pushCode = options.pushcode;
    eventId=options.eventid;
    console.log('邀请码:' + pushCode);

    if (options.eventid!=undefined){
      if (wx.getStorageSync("openId") == "") {
        wx.navigateTo({
          url: '/pages/welcome/welcome?sharetype=enjoy&shixiao=' + options.shixiao + '&pushcode=' + pushCode + '&eventid=' + options.eventid + ''
        })
      } else {
        var that = this;
        //获取指定的分享事件列表
        api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "getsharelist", "event": options.eventid }).then(function (response) {
          if (response.data.status == 1) {
            console.log(response.data);
            that.setData({
              eventList: response.data.data
            })
          }
        }, function (error) {
          console.log(error);
        })
      }
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