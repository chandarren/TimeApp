var app = getApp();
const api = require('../../utils/api');
var flag= true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,//遮罩层是否打开，默认关闭，只有在初次进入的时候打开
    isRecentReminder:false,//近7天提醒是否有数据
    isHotArticleList:false,//是否有热门文章
    hotArticleList:{},//热门文章
    recentReminderList: {},//近7天提醒
    showone:true,
    showtwo:false,
    showthree:false
  },

  //系统公告
  systemNotice:function(){
    wx.navigateTo({
      url: '/pages/article/Notice',
    })
  },

  //添加提醒
  addEvent:function(){
    if(wx.getStorageSync("userId")==''){
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          } 
        }
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/event/addreminder?type=add',
      })
    }
  },
  openshareview:function (){
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },
  opensssview:function(){
    wx.switchTab({
      url: '/pages/event/eventlist',
    })
  },
  openinvitedview:function(){
    wx.navigateTo({
      url: '/pages/personal/pushcode',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = wx.getLaunchOptionsSync()
    if(obj.scene==undefined || obj.scene==""){
      wx.setStorageSync("scene", "0000");
    }else{
      wx.setStorageSync("scene", obj.scene);
    }
    
    var matrixing = app.globalData.matrixing;  
    var recentlyRemindW = app.globalData.rpxWidth - (matrixing * 163);
    this.setData({
      //viewExplainW: app.globalData.rpxWidth-(matrixing*40)
      cumulativeReminderW: (app.globalData.rpxWidth-(matrixing*44.2))/3,
      recentlyRemindItemContentW: recentlyRemindW,
      recentlyRemindItemEndW: app.globalData.rpxWidth - (matrixing * 116) - recentlyRemindW,
      guideContentItemW: (app.globalData.rpxWidth - (matrixing * 44)) / 2,
      hotPostsItemContentW: app.globalData.rpxWidth - (matrixing * 48)
    })
    var HasNewUserHelp = wx.getStorageSync("hasnewuserhelp");//新手指引是否提示过
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
      wx.createSelectorQuery().in(this).select('.view-add-event').boundingClientRect(res => {          
        this.selectComponent('#popover').onDisplay(res);
      }).exec();
    }
    var userinfo = wx.getStorageSync("theuserinfo");
    if(userinfo.HasShare==undefined){
      this.setData({
        isShareMoments: false
      })
    }
    else{
      this.setData({
        isShareMoments: userinfo.HasShare//是否完成了分享到朋友圈的任务      
      })
    }
    var that = this;
    //记录用户最近登陆时间
    var theuid = wx.getStorageSync("userId");
    if(theuid==""){
      theuid = 0;
      this.setData({
        systemNoticeCount:0,
        reminderEventsCount:0
      })
    }
    else{
      //记录最后登陆时间
      api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "lastlogin", "uid": theuid }).then(function (response) {
      }, function (error) {
        console.log(error);
      })
         
      //获取用户累计提醒次数总数
      api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "remindcount", "uid": theuid }).then(function (response) {           
        that.setData({
          systemNoticeCount: response.data.data
        })
      }, function (error) {
        console.log(error);
      })

      //获取用户所创建的纪念日数量总数
      api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "sjcount", "uid": theuid }).then(function (response) {      
        that.setData({
          reminderEventsCount: response.data.data
        })
      }, function (error) {
        console.log(error);
      })

      //获取用户设置的最近7天纪念日事件集合
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get_zuijin", "userid": theuid }).then(function (response) {
        if (response.data.status==1){
          that.setData({
            isRecentReminder:true,
            recentReminderList: response.data.data
          })
        }
              
      }, function (error) {
        console.log(error);
      })
    }
    //获取最新的系统公告
    api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "sysnotice" }).then(function (response) {
      that.setData({
        systemNoticeTitle: response.data.data.title
      })
    }, function (error) {
      console.log(error);
    })
     //获取用户活跃量
     api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "activeuser" }).then(function (response) {      
      that.setData({
        activeUserCount: response.data.data
      })
    }, function (error) {
      console.log(error);
    })
    //获取公众号文章列表
    api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "getarticl" }).then(function (response) {
      if(response.data.status==1){              
        that.setData({
          isHotArticleList:true,
          hotArticleList: response.data.data
        })
      }      
    }, function (error) {
      console.log(error);
    })
  },

  //事件详情
  eventDetail:function(e){
    /*var item = JSON.stringify(e.currentTarget.dataset.item);
    var encodeItem = encodeURIComponent(item);*/
    var eventId= e.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: '/pages/event/eventdetail?type=normal&shixiao=0&eventid=' + eventId + '',
    })
  },

  //文章详情
  hotArticleDetail:function(e){
    var urls = JSON.stringify(e.currentTarget.dataset.item.url);
    var encodeUrls = encodeURIComponent(urls);
   
    wx.navigateTo({
      url: '/pages/article/articledetail?urls=' + encodeUrls + ''
    })
  },
  //邀请好友
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
  //帮助文档
  helpinfo:function(){
    wx.navigateTo({
      url: '/pages/helpword/helpinfo',
    })
  },
  //新手指引相关
  guanbizhezao:function (e){
    this.setData({
      flag:false
    })
    wx.setStorageSync("hasnewuserhelp","true");
  },
  myCatchTouch:function(){
    return;
  },
  one: function() {
    this.setData({
      showone: false,
      showtwo: true,
      showthree: false
    })
    wx.createSelectorQuery().in(this).select('.txt-recently-remind-title').boundingClientRect(res => {          
      this.selectComponent('#popovertwo').onDisplay(res);
    }).exec();
  },
  two: function() {
    this.setData({
      showone: false,
      showtwo: false,
      showthree: true
    })
    wx.createSelectorQuery().in(this).select('.txt-task-list-title').boundingClientRect(res => {          
      this.selectComponent('#popoverthree').onDisplay(res);
    }).exec();
  },
  three:function (){
    this.setData({
      showone: false,
      showtwo: false,
      showthree: false,
      flag:false
    })
    wx.setStorageSync("hasnewuserhelp","true");
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