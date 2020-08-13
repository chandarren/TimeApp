var app=getApp();
const api = require('../../utils/api');
var sessionk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null
  },

  bindPhone:function(){
    wx.navigateTo({
      url: '../bindphone/bindphonedetail',
    })
  },
  wxlogin:function(){
    wx.login({
      success: function (res_login) {
        if (res_login.code) {
          api.sendRequest(app.globalData.url + '/Interface/WeChat.ashx', 'POST', { "action": "getopenid", "code": res_login.code}).then(function (response) {
            if (response.data.status == 1) {
              sessionk=response.data.data.session_key;
            } 
          }, function (error) {
            console.log(error);
          })
        }
      }
    })
  },

  getPhoneNumber: function (e) {//点击获取手机号码按钮
    var _this = this;
    _this.wxlogin();
    wx.checkSession({
      success:function(){
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        if(e.detail.errMsg != 'getPhoneNumber:fail user deny'){//同意授权
          api.sendRequest(app.globalData.url + '/Interface/WeChat.ashx', 'POST', { "action": "getphone","sessionKey":sessionk,"iv":iv,"encrypData":ency}).then(function (response) {
            if (response.data.status == 1) {
              //同步到数据库
              api.sendRequest(app.globalData.url + '/Interface/WeChat.ashx', 'POST', { "action": "savephone","userid":wx.getStorageSync("userId"),"mobile":response.data.data}).then(function (res) {
                if (res.data.status == 1) {
                  var userifno = wx.getStorageSync("theuserinfo");
                  userifno.mobile=response.data.data;
                  wx.setStorageSync('theuserinfo', userifno);
                  wx.showToast({
                    title: res.data.data,
                    icon: 'none',
                    duration: 2000
                  })
                  wx.navigateTo({
                    url: '/pages/userinformation/userinformation',
                  })
                } 
              })
            } 
          })
        }
      },
      fail: (res) => {
        console.log("session_key 已经失效，需要重新执行登录流程");
        wxlogin(); //重新登录  
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync("theuserinfo");
    var _this = this;
    _this.setData({
      phone: userinfo.mobile
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