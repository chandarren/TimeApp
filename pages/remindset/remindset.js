var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    
  },

  defaultchangeMsgRemind: function (e) {
    if(e.detail.value == false)
    {
      wx.showToast({
        title: '关闭后,所有事项将不会提示您！',
        icon: 'none',
        duration: 2000
      })    
    }
    this.setRemind(0, e.detail.value == true ? 1 : 0)
  },

  changeXcxRemind: function (e) {
    //弹出订阅消息授权框
    wx.requestSubscribeMessage({
      tmplIds: ['JPhx5saZjYL9EUqJdgeb1Iaq7ZxxrLEI2MLEu9f1c3M'],
      success(res) {
        if (res['JPhx5saZjYL9EUqJdgeb1Iaq7ZxxrLEI2MLEu9f1c3M']=="accept"){
          this.setData({
            ckIsXcxRemind: true
          })
        }else{
          this.setData({
            ckIsXcxRemind: false
          })
        }
      }
    })
    this.setRemind(1, e.detail.value == true ? 1 : 0)
  },

  changeWxRemind: function (e) {
    this.setRemind(2, e.detail.value == true ? 1 : 0)
  },

  changeEmailRemind: function (e) {
    this.setRemind(3, e.detail.value == true ? 1 : 0)
  },

  changeWXRemind:function(e){    
    this.setRemind(3, e.detail.value==true?1:0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userifno = wx.getStorageSync("theuserinfo");
    that.setData({
      msg_yue_num: userifno.Msgyue,
      voice_yue_num: userifno.Voiceyue
    })
    wx.getSetting({
      withSubscriptions:true,
      success(res){
        // if(res.subscriptionsSetting.mainSwitch){
        //   that.setData({
        //     ckIsWXRemind: true
        //   })          
        // }else{
        //   console.log('订阅消息未开启');
        // }
      }
    })

    //获取通知方式
    wx.request({
      data: { "action": "getremind", "uid": wx.getStorageSync("userId") },
      url: app.globalData.url + '/Interface/Account.ashx',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success(res) {
        if (res.data.status == 1) {
          /*that.setData({
            isBuyProduct: true,
            productName: resProduct.data.data
          })*/
          if (res.data.data.indexOf("0") != -1) {
            that.setData({
              ckIsOpenRemind: true
            })
          }
          if (res.data.data.indexOf("1") != -1) {
            that.setData({
              ckIsXcxRemind: true
            })
          }
          if (res.data.data.indexOf("2") != -1) {
            that.setData({
              ckIsWxRemind: true
            })
          }
          if (res.data.data.indexOf("3") != -1) {
            that.setData({
              ckIsEmailRemind: true
            })
          }
        }
        else {
          
        }
      }
    })
  },

  setRemind(typeId, isAccpet){    
    //设置通知方式开关
    wx.request({
      data: { "action": "setremind", "uid": wx.getStorageSync("userId"), "type": typeId, "isaccpet": isAccpet },
      url: app.globalData.url + '/Interface/Account.ashx',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '设置成功！',
            icon: 'none',
            duration: 2000
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