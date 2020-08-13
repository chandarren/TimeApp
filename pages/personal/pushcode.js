// pages/mine/pushcode.js
var app = getApp();
const api = require('../../utils/api');
Page({
  sendinvited:function (e){
    /*wx.showModal({
      title: '点击按钮分享页面出去',
      content: '记得带上我自己的邀请码参数额',
      success: function (res) {
        
      }
    })*/
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  showmyinvited:function (){
    wx.navigateTo({
      url: '/pages/personal/myinvited',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var pushcode = wx.getStorageSync("theuserinfo").pushCode;
    var arraylist = pushcode.match(/./g);
    //console.log(arraylist);
    //获取用户设置的纪念日事件集合
    api.sendRequest(app.globalData.url + '/Interface/Account.ashx', 'POST', { "action": "getmyinvited", "pushcode": wx.getStorageSync("theuserinfo").pushCode}).then(function (response) {
      if (response.data.status == 1) {
        that.setData({
          myinvitedperson:response.data.data.length,
          pushcodeList:arraylist
        })
      }
      else{
        that.setData({
          myinvitedperson:0,
          pushcodeList:arraylist
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
    var userifno = wx.getStorageSync("theuserinfo");
    
    return {
      title: "重要事情时刻记",
      path: "/pages/welcome/welcome?pushcode=" + userifno.pushCode + "",
      imageUrl: "/images/icon/share-app.png"
    }
  }
})