var func=require("utils/function.js");
var imgload = require('utils/test.js')
const api = require('utils/api.js');


//app.js
App({ 
  onShow:function(options){
    //let options = JSON.stringify(options);
    var resultScene = this.sceneInfo(options.scene);
    //console.log(resultScene);
    wx.setStorageSync("scene", options.scene);
    if (options.scene == 1011 || options.scene == 1012 || options.scene == 1014 || options.scene == 1047 || options.scene == 1048 || options.scene == 1049) {
      // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      const scenes = decodeURIComponent(options.query.scene);
      if (scenes != undefined && scenes != "") {
        wx.setStorageSync("pushpar", scenes);
        api.sendRequest('https://www.shikeji.net/Interface/recordpush.ashx', 'POST', { "scene": scenes }).then(function (response) {
         
        }, function (error) {
          console.log(error);
        })
      }
      else{
        wx.setStorageSync("pushpar", "");
      }
    }
    else{
      wx.setStorageSync("pushpar", "");
    }
    // //获取accestoken
    // wx.request({
    //   url:  'https://www.shikeji.net/Interface/gethetoken.ashx?type=other',
    //   method: 'GET',
    //   success: function (res) {
    //     wx.setStorageSync("taccestoken", res.data);
    //   }
    // })
  },
  //场景值判断
  sceneInfo:function(s){
    var scene = [];
    switch (s) {      
      case 1011:
        scene.push(s, "扫描二维码");
        break;
      case 1012:
        scene.push(s, "长按图片识别二维码");
        break;
      case 1014:
        scene.push(s, "手机相册选取二维码");
        break;   
      case 1047:
        scene.push(s, "扫描小程序码");
        break;
      case 1048:
        scene.push(s, "长按图片识别小程序码");
        break;
      case 1049:
        scene.push(s, "手机相册选取小程序码");
        break;             
    }
    return scene;    
  },
  onLaunch: function () {  
          
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取当前设备的宽高(单位rpx)并存在全局变量
    let SCREEN_WIDTH = 750;
    let RATE = wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
        
        
    this.globalData.rpxWidth = SCREEN_WIDTH;
    this.globalData.rpxHeight=SCREEN_WIDTH*RATE;


    /*if (wx.getStorageSync("openId") == "") {
      
    }else{
      wx.switchTab({
        url: '/pages/homepage/homepage',
      })
    }*/
    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })*/
    // 获取用户信息
    /*wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  wxLogin:func.wxLogin,
  imageLoad: imgload.imageLoad,
  globalData: {
    userInfo: null,
    rpxWidth:0,
    rpxHeight:0,
    matrixing: 750 / wx.getSystemInfoSync().windowWidth /*px换算rpx (750/屏幕宽度)*/,    
    //url:"https://www.wisefisher.net"
    url:"https://www.shikeji.net"
  }
})