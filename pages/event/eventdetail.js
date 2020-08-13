// pages/event/eventdetail.js
var app = getApp();
const api = require('../../utils/api');
//var eventItem;
var eventId;
var shixiao;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ""
  },
  /*eventedit:function (options) {
    wx.navigateTo({
      url: '/pages/event/addreminder?type=edit&data=' + JSON.stringify(eventItem) + '',
    })
  },*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shixiao=options.shixiao;
    /*var decodeItem = decodeURIComponent(options.data);
    var item = JSON.parse(decodeItem);*/        
    var that = this;
    //获取事件详情
    api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "getdetail", "event": options.eventid, "shixiao": options.shixiao == -1 ? 1 : 0  }).then(function (response) {      
      eventId = response.data.data.id;
      var matrixing = app.globalData.matrixing;
      that.setData({
        contentInfoMH: app.globalData.rpxHeight - 800,
        btnShareMT: app.globalData.rpxHeight - 400,
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
    /*var item = JSON.stringify(eventItem);
    var encodeItem = encodeURIComponent(item);*/
    var userifno = wx.getStorageSync("theuserinfo");
    console.log(eventId);

    console.log('準備加提醒次數');
    //增加免费创建提醒次数
    api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "addcanuse", "uid": userifno.id, "num": 1,"share":1 }).then(function (response) {
      console.log(response.data);
    }, function (error) {
      console.log(error);
    })
    
    return {
      title: "我有一个重要时刻与你分享",
      path: "/pages/event/eventsharedetail?shixiao="+shixiao+"&pushcode="+userifno.pushCode+"&eventid=" + eventId + "",
      imageUrl: "/images/icon/eventShare.jpg"
    }

     
  }
})