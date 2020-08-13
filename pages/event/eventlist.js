var app = getApp();
const api = require('../../utils/api');
//var dropdown=false;
var where="";
var week=0;

var order="asc";
var shixiao=0;
var eventType=0;
var zhouqi=0;
var selectAllList=[];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //isShow:true,
    timeSortType:'时间升序',
    isEventList:false,//事件列表是否为空
    eventList:{},//事件列表
    all:true,
    oneWeek:false,
    oneMouth:false,
    halfYear:false,
    oneYear:false,
    isQuanXuanShow:true,
    cbSelectAll:false,
    isNullShare:""
  },

  //选择时间排序
  timeDropdown:function(){
    var that=this;
    if (this.data.timeSortType =="时间升序"){
      this.setData({
        timeSortType: "时间降序"        
      })
      order = "desc";
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }

      }, function (error) {
        console.log(error);
      })
    }else{
      this.setData({
        timeSortType: "时间升序"
      })
      order = "asc";
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        console.log(response.data);
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }

      }, function (error) {
        console.log(error);
      })
    }        
  },

  //触发搜索
  startSearch:function(e){
    where = e.detail.value['search-input'] ? e.detail.value['search-input']:e.detail.value;
    var that=this;
    //通过关键词搜索用户设置的纪念日事件集合
    api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": zhouqi, "order": order, "type": eventType, "shixiao": shixiao }).then(function (response) {
      if (response.data.status == 1) {        
        that.setData({
          isEventList: true,
          eventList: response.data.data
        })
      }else{
        that.setData({
          isEventList: false,
          eventList: {}
        })
      }
    }, function (error) {
      console.log(error);
    })
  },

  //选择提醒周期
  txtQueryCycleClick:function(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    if (type == "all") {      
        this.setData({
          all: true,
          oneWeek: false,
          oneMouth: false,
          halfYear: false,
          oneYear: false
        }) 
        week=0; 
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }

      }, function (error) {
        console.log(error);
      })           
    } else if (type == "oneWeek") {
      this.setData({        
        oneWeek: true,
        oneMouth: false,
        halfYear: false,
        oneYear: false,
        all: false,
      })
      week = 7;
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }

      }, function (error) {
        console.log(error);
      })
    } else if (type == "oneMouth") {
      this.setData({        
        oneMouth: true,
        halfYear: false,
        oneYear: false,
        all: false,
        oneWeek: false,
      })
      week = 30;
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }

      }, function (error) {
        console.log(error);
      })
    } else if (type == "halfYear") {
      this.setData({        
        halfYear: true,
        oneYear: false,
        all: false,
        oneWeek: false,
        oneMouth: false,
      })
      week = 180;
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }
      }, function (error) {
        console.log(error);
      })
    } else if (type == "oneYear") {
      this.setData({        
        oneYear: true,
        all: false,
        oneWeek: false,
        oneMouth: false,
        halfYear: false,
      })
      week = 365;
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": week, "order": order }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }

      }, function (error) {
        console.log(error);
      })
    } 
  },

  //事件详情
  eventDetail: function (e) {    
    var eventId = e.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: '/pages/event/eventdetail?type=normal&shixiao='+shixiao+'&eventid=' + eventId + '',
    })
  },

  shixiaofun: function (e) {
    shixiao = e.detail.shixiaokey;
    var that=this;
    api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": zhouqi, "order": order,"type":eventType,"shixiao":shixiao }).then(function (response) {
      if (response.data.status == 1) {
        that.setData({
          isEventList: true,
          eventList: response.data.data
        })
      } else {
        that.setData({
          isEventList: false,
          eventList: {}
        })
      }

    }, function (error) {
      console.log(error);
    })
  },
  typefun: function (e) {
    eventType = e.detail.typekey;
    var that = this;
    api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": zhouqi, "order": order, "type": eventType, "shixiao": shixiao }).then(function (response) {
      if (response.data.status == 1) {
        that.setData({
          isEventList: true,
          eventList: response.data.data
        })
      } else {
        that.setData({
          isEventList: false,
          eventList: {}
        })
      }

    }, function (error) {
      console.log(error);
    })
  },
  zhouqifun: function (e) {
    zhouqi = e.detail.zhouqikey;
    var that = this;
    api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": zhouqi, "order": order, "type": eventType, "shixiao": shixiao }).then(function (response) {
      if (response.data.status == 1) {
        that.setData({
          isEventList: true,
          eventList: response.data.data
        })
      } else {
        that.setData({
          isEventList: false,
          eventList: {}
        })
      }

    }, function (error) {
      console.log(error);
    })
  },
  orderfun: function (e) {
    order = e.detail.orderkey;
    var that = this;
    api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": where, "week": zhouqi, "order": order, "type": eventType, "shixiao": shixiao }).then(function (response) {
      if (response.data.status == 1) {
        that.setData({
          isEventList: true,
          eventList: response.data.data
        })
      } else {
        that.setData({
          isEventList: false,
          eventList: {}
        })
      }

    }, function (error) {
      console.log(error);
    })
  },

  //多选操作
  multipleOperations:function(){
    var that=this;
    if (Object.keys(that.data.eventList).length===0){
      wx.showToast({
        title: '没有纪念日',
        icon: 'none',
        duration: 2000
      })
    }else{      
      that.setData({
        isQuanXuanShow: false,
        cbSelectAll: false,
        multipleOperationsMB:55,
        isNullShare:""
      })
      selectAllList = [];//清空"全选"集合
      that.data.eventList.forEach(function (item, index) {       
        that.selectAllComponents(".eventg")[index].tttt();
        that.selectAllComponents(".eventg")[index].unSelectAll();
        that.selectAllComponents(".eventg")[index].selfAdaption();
      })      
    }    
  },

  cancel:function(){
    var that = this;
    that.setData({
      isQuanXuanShow: true,
      multipleOperationsMB:16
    })    
    that.data.eventList.forEach(function (item, index) {      
      that.selectAllComponents(".eventg")[index].yyyy();
      that.selectAllComponents(".eventg")[index].selfAdaptionCancel();
    })
  },

  //全选
  selectAll:function(e){        
    var that = this;   
    if (that.data.cbSelectAll==false){
      that.setData({
        cbSelectAll:true,
        isNullShare:""
      })
      selectAllList = [];//初始化"全选"集合
      that.data.eventList.forEach(function (item, index) {
        that.selectAllComponents(".eventg")[index].selectAll();
        console.log(item);        
        selectAllList.push(item.id);
        that.setData({
          isNullShare:"share"
        })
      })
    }else{
      that.setData({
        cbSelectAll: false,
        isNullShare:""
      })
      selectAllList = [];//清空"全选"集合
      that.data.eventList.forEach(function (item, index) {
        that.selectAllComponents(".eventg")[index].unSelectAll();
      })
    }
  },

  //用户多选选择的项（组件）
  selectItem:function(e){    
    selectAllList.push(e.detail);
    this.setData({
      isNullShare:"share"
    })
  },

  //用户多选取消选择的项（组件）
  delSelectItem:function(e){    
    var index=selectAllList.indexOf(e.detail);
    selectAllList.splice(index,1);
    if (Object.keys(selectAllList).length === 0){
      this.setData({
        isNullShare: ""
      })
    }
  },

  //删除选中的纪念日
  delEvent:function(){
    if (Object.keys(selectAllList).length === 0){
      wx.showToast({
        title: '请选择需要删除的纪念日',
        icon: 'none',
        duration: 2000
      })
    }else{
      var that = this;     
      wx.showModal({
        title: '删除',
        content: '确认删除吗？',
        success(res) {
          if (res.confirm) {
            //删除纪念日事件
            api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "remove", "sid": selectAllList.join(",") + "," }).then(function (response) {
              if (response.data.status == 1) {
                wx.showToast({
                  title: response.data.data,
                  icon: 'none',
                  duration: 2000
                })
                that.cancel();
                that.onLoad();
              } else {
                wx.showToast({
                  title: response.data.data,
                  icon: 'none',
                  duration: 2000
                })
              }
            }, function (error) {
              console.log(error);
            })
          } else if (res.cancel) {
          }
        }
      })
    }
  },

  shuaxin:function(e){
    this.cancel();
    this.onLoad();
  },

  //条件清除按钮
  cleanSearch:function(){    
    where="";
    week=0;
    order="asc";
    eventType=0;
    shixiao=0;
    this.selectAllComponents("#selectCom")[0].clean();
    this.onLoad();
  },

  //共享按钮
  shareEvent:function(){
    if (Object.keys(selectAllList).length === 0) {
      wx.showToast({
        title: '请选择想要共享的纪念日',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var matrixing = app.globalData.matrixing;
    var recentlyRemindItemContentW=app.globalData.rpxWidth - (matrixing * 167);
    this.setData({      
      recentlyRemindItemContentW:recentlyRemindItemContentW, 
      recentlyRemindItemEndW: app.globalData.rpxWidth - recentlyRemindItemContentW-(matrixing * 116),
      multipleOperationsMB:16      
    })
    var that=this;
    if(wx.getStorageSync("userId")==''){
      
    }else{
      //获取用户设置的纪念日事件集合
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "get", "userid": wx.getStorageSync("userId"), "where": "", "week": 0, "order": "asc", "type": eventType, "shixiao": shixiao }).then(function (response) {
        if (response.data.status == 1) {
          that.setData({
            isEventList: true,
            eventList: response.data.data
          })
        } else {
          that.setData({
            isEventList: false,
            eventList: {}
          })
        }
      }, function (error) {
        console.log(error);
      })
    }    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.test=this.selectComponent("#test");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    this.onLoad(); 
    if (wx.getStorageSync("userId") == '') {
      wx.showModal({
        title: '提示',
        content: '您还未登录，是否现在去登录？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          }
        }
      })
    }
    if (this.data.isQuanXuanShow==false){
      this.setData({
        multipleOperationsMB: 55
      })
    }       
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
    
    this.cancel(); 

    console.log(selectAllList);
    if (Object.keys(selectAllList).length === 0) {
      wx.showToast({
        title: '请选择想要共享的纪念日',
        icon: 'none',
        duration: 2000
      })
    }else{
      if (userifno.id != undefined) {
        //增加免费创建提醒次数
        api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "addcanuse", "uid": userifno.id, "num": 1, "share": 1 }).then(function (response) {
          //console.log(response.data);
        }, function (error) {
          console.log(error);
        })
      }

      return {
        title: "我有一个重要时刻与你分享",
        path: "/pages/event/eventsharelist?shixiao=" + shixiao + "&pushcode=" + userifno.pushCode + "&eventid=" + selectAllList.join(",") + "",
        imageUrl: "/images/icon/eventShare.jpg"
      }
    }    
  },
  
  onTap:function(e){
    
  }
})