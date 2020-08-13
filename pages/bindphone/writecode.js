var app=getApp();
var code;
var phone;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subDisabled: true,//提交按钮初始为禁用
    phone:null
  },

//监听输入验证码
  watchcode:function(event){
    code = event.detail.value;
    if (event.detail.value != "") {
      this.setData({
        subDisabled: false
      })
    } else {
      this.setData({
        subDisabled: true
      })
    }
  },


  submit:function(){
    //请求微信小程序手机号码绑定接口
    wx.request({
      data: { "action": "bindmobile", "uid": wx.getStorageSync("userId"), "mobile": phone,"code":code },
      url: app.globalData.url+'/Interface/Account.ashx',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success(res) {
        if (res.data.status == 1) {
          var userifno = wx.getStorageSync("theuserinfo");
          userifno.mobile=phone;
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
        else {

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    phone = options.phone;
    var _this=this;
    _this.setData({
      phone:options.phone
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