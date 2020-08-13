var app = getApp();
const api = require('../../utils/api');
var flag= true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgyue:0,
    voiceyue:0,
    msguse:0,
    voiceuse:0,
    IsIos:'',
    flag:true,//遮罩层是否打开，默认关闭，只有在初次进入的时候打开
    showone:true,
    showtwo:false,
    showthree:false
  },
  openedituser:function(){
    if(wx.getStorageSync("userId")==''){
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/userinformation/userinformation',
      })
    }    
  },
  buyVip:function(){
    if(wx.getStorageSync("userId")==''){
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/product/buyproduct',
      })
    }    
  },
  openremindset:function(){
    if(wx.getStorageSync("userId")==''){
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/remindset/remindset',
      })
    }    
  },
  openuserrights:function(){
    wx.navigateTo({
      url: '/pages/personal/rights',
    })
  },
  openpushcode:function(){
    if(wx.getStorageSync("userId")==''){
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/personal/pushcode',
      })
    }    
  },
  openconectus:function(){
    wx.navigateTo({
      url: '/pages/personal/aboutus',
    })
  },
  helpinfo:function(){
    wx.navigateTo({
      url: '/pages/helpword/helpinfo',
    })
  },
  //点击登录
  clickLogin:function(){    
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    var matrixing = app.globalData.matrixing;
    var _that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.platform == "ios") {
          _that.setData({
            IsIos: 'display:none'
          })
        }
      }
    })

    var HasNewUserHelp = wx.getStorageSync("hasnewuserhelpme");//新手指引是否提示过
    //console.log('新手指引是否提示过:'+HasNewUserHelp)
    if(HasNewUserHelp != undefined && HasNewUserHelp != "" && HasNewUserHelp == "true"){
      this.setData({
        flag:false,
        showone:false,
        showtwo:false,
        showthree:false
      })
    }
    else{
      //遮罩层数据展示相关
      this.setData({
        flag:true,
        showone:true,
        showtwo:false,
        showthree:false
      })
      // 获取元素的坐标信息
      wx.createSelectorQuery().in(this).select('.view-head-middle').boundingClientRect(res => {          
        this.selectComponent('#popover').onDisplay(res);
      }).exec();
    }
    var userId=wx.getStorageSync("userId");
    if (userId != "" ){      
      //获取用户信息并更新缓存
      api.sendRequest(app.globalData.url + '/Interface/WeChat.ashx', 'POST', { "action": "getuserinfo", "uid": wx.getStorageSync("theuserinfo").id }).then(function (response) {
        if (response.data.status == 1) {
          wx.setStorageSync("theuserinfo", response.data.data);
        }
      })

      var userifno = wx.getStorageSync("theuserinfo");
      
      _that.setData({
        lineXW: app.globalData.rpxWidth - (matrixing * 51),
        userAvator: userifno.avatar,
        userNickname: userifno.nickName,
        expireTime: userifno.expireTime,
        productName: userifno.proName
      });

      //获取用户剩余次数信息
      api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "getxiaofei", "uid": wx.getStorageSync("theuserinfo").id }).then(function (response) {
        if (response.data.status == 1) {
          _that.setData({
            msgyue: response.data.data.MsgYue,
            msguse: response.data.data.MsgYueUse,
            voiceyue: response.data.data.VoiceYue,
            voiceuse: response.data.data.VoiceYueUse
          })
        }
      })
    }
  },
  //新手指引相关
  guanbizhezao:function (e){
    this.setData({
      flag:false
    })
    wx.setStorageSync("hasnewuserhelpme","true");
  },
  myCatchTouch:function(){
    return;
  },
  one: function() {
    this.setData({
      showone: false,
      showtwo: true,
      showthree:false
    })
    wx.createSelectorQuery().in(this).select('.txt-remind-set').boundingClientRect(res => {          
      this.selectComponent('#popovertwo').onDisplay(res);
    }).exec();
  },
  two: function() {
    this.setData({
      showone: false,
      showtwo: false,
      showthree:true
    })
    wx.createSelectorQuery().in(this).select('.txt-promo-code').boundingClientRect(res => {          
      this.selectComponent('#popoverthree').onDisplay(res);
    }).exec();
  },
  three: function() {
    this.setData({
      showone: false,
      showtwo: false,
      showthree:false,
      flag:false
    })
    wx.setStorageSync("hasnewuserhelpme","true");
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
    this.onLoad();
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