var app=getApp();
var phone;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nextDisabled:true,//下一步按钮初始为禁用
    phone: null
  },

  //取消
  cancel:function(){
    wx.navigateTo({
      url: '/pages/userinformation/userinformation',
    })
  },

  //下一步
  next:function(){
    //请求获取验证码接口
    wx.request({
      data: { "action": "getcode","phone":phone,"type":2},
      url: app.globalData.url+'/Interface/Account.ashx',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success(res) {
        console.log(res.data);
        if (res.data.status == 1) {
          wx.navigateTo({
            url: '../bindphone/writecode?phone='+phone+'',
          })
        }
        else {
          wx.showToast({
            title: res.data.data,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

//监听输入手机号
  watchPhone:function(event){
    phone = event.detail.value;
    if (event.detail.value!=""){
      this.setData({
        nextDisabled:false
    })
    }else{
      this.setData({
        nextDisabled: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userifno = wx.getStorageSync("theuserinfo");
    var _this = this;
    _this.setData({
      phone: userifno.mobile
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