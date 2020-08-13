var app=getApp();
const api = require('../../utils/api');
var isHaveOpenId=false;
var isFromShare=false;//判断是常规注册还是通过分享页进入
var isFromShareApp = false;//判断是通过分享纪念日还是分享APP进入
var pushCode="";
var eventId;
var shixiao;
var shareType;//enjoy是共享，share是分享
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  bindGetUserInfo:function(e) {
    //const app = getApp();
    if (wx.getStorageSync("openId") == ""){
      app.wxLogin(isFromShare,isFromShareApp,pushCode,app.globalData.url, this.process_data);            
    }else{
      if (wx.getStorageSync("sessionKey") != "") {
        wx.checkSession({
          success() {
            console.log("sessionKey未过期")
            console.log(wx.getStorageSync("openId"))
            wx.switchTab({
              url: '../homepage/homepage',
            })
          },
          fail() {
            console.log("sessionKey已失效");
            //const app = getApp();


            app.wxLogin(false,false,pushCode,app.globalData.url, this.process_data);            
          }
        })
      } 
    }    
  },

  lookxieyi:function (e){
    wx.navigateTo({
      url: '/pages/welcome/zhucexieyi',
    })
  },

  process_data: function (isfromshare, isfromshareapp) {
    wx.hideLoading();    

    if (isfromshare){ 
    if(shareType=="enjoy"){
      wx.navigateTo({
        url: '/pages/event/eventsharelist?shixiao=' + shixiao + '&pushcode=""&eventid=' + eventId + ''        
      })
    } else if (shareType == "share"){
      wx.navigateTo({
        url: '/pages/event/eventsharedetail?shixiao=' + shixiao + '&pushcode=""&eventid=' + eventId + '',
      })
    }                
    } else if (isfromshareapp){
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      })
    }else{
      wx.switchTab({
        url: '../homepage/homepage',
      })
    }    
  },


  /*start:function(){
    if (wx.getStorageSync("openId") == "") {
      wx.navigateTo({
        url: '../guide/guide',
      })
    }else{      
      if(wx.getStorageSync("sessionKey")!=""){
        wx.checkSession({
          success(){
console.log("sessionKey未过期")
console.log(wx.getStorageSync("openId"))
            wx.navigateTo({
              url: '../homepage/homepage',
            })
          },
          fail(){
            console.log("sessionKey已失效");
            //const app = getApp();
            

            app.wxLogin(false, app.globalData.url);                                              
                wx.navigateTo({
                  url: '../homepage/homepage',
                })                                                                                        
          }
        })
      }      
    }
  },*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*if (wx.getStorageSync("openId") != ""){
      isHaveOpenId=true;
    }*/
    
    if (options.pushcode!=null){ 
      console.log('传值:' + options.pushcode);
      if(options.eventid==null){
        console.log('是分享APP');
        pushCode = options.pushcode;
      }else{        
        isFromShare = true;
        pushCode = options.pushcode;
        eventId = options.eventid;
        shixiao = options.shixiao;        
        shareType=options.sharetype;        
      }      
    }else{
      console.log('不是分享来的');
    }
    
      var windowWidth = wx.getSystemInfoSync().windowWidth;
      var windowHeight = wx.getSystemInfoSync().windowHeight;
      var x = windowWidth / 750;
      var x1 = 1 / x;
      var re = 180 * x1;
      this.setData({
        btnWidth: re,
        btnMarginTop: (app.globalData.rpxHeight / 4) * 3
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