//获取应用实例
const app = getApp()
const api = require('../../utils/api');
var startPoint;
const min = 0;
const max = 330;
var currentProgress=0;
var maxProgress=100;
var canSlide=true;
var productItem;
var orderNo;
var proId;
var timeNum=0;
var num=0;

function wxPay(param) {
  //console.log(param.timeStamp)
  wx.requestPayment({
    timeStamp: param.timeStamp,
    nonceStr: param.nonceStr,
    package: param.package,
    signType: 'MD5',
    paySign: param.paySign,
    success: function (event) {
      console.log(event);
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      });
      //调用后台用于确认订单状态为已支付状态并发消息推送      
      console.log(wx.getStorageSync('userId') + '|' + orderNo);
      api.sendRequest(app.globalData.url + '/Interface/pay.ashx', 'POST', { "uid": wx.getStorageSync('userId'), "orderno": orderNo }).then(function (response) {        
        console.log(response.data)
      }, function (error) {
        console.log(error);
      })

      
      //弹出订阅消息授权框    
      wx.requestSubscribeMessage({
        tmplIds: ['JPhx5saZjYL9EUqJdgeb1Iaq7ZxxrLEI2MLEu9f1c3M'],
        success(res) {
          wx.switchTab({
            url: '/pages/homepage/homepage',
          })
        }
      })
    },
    fail: function (error) {
      console.log("支付失败");
      console.log(error);
    },
    complete: function () {
      console.log("支付结束");
    }
  })
}

Page({  
  data: {
    /**
    * 当前激活的当航索引
    */
    currentTab: 0,
    /**
     * 上一个激活的当航索引
     */
    prevIndex: -1,
    /**
     * scroll-view 横向滚动条位置
     */
    scrollLeft: 0,
    list: [],
    current: 0,
    animationData: {},
    animationData2: {},
    oneyear: false,
    twoyears: false,
    fouryears: false,
    fiveyears: false,
    buttonLeft: 0,
    progress: 0,
    progressText: 0,
    totalAmount:0,
    btnPaymentDis:true,
    youhui:0,
    remark:""
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        progressText: (currentProgress).toFixed(0),
        buttonLeft: currentProgress * (max - min) / maxProgress + min,
        progress: currentProgress * (max - min) / maxProgress
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  
    buttonStart: function (e) {
      startPoint = e.touches[0]
    },
    buttonMove: function (e) { 
      
      /*if (!this.properties.canSlide) {        
        return
      }*/
      var endPoint = e.touches[e.touches.length - 1]
      console.log(endPoint);
      var translateX = endPoint.clientX - startPoint.clientX
      var translateY = endPoint.clientY - startPoint.clientY

      startPoint = endPoint;
      var buttonLeft = this.data.buttonLeft + translateX;
      if (buttonLeft > max) {
        return
      }
      if (buttonLeft < min) {
        return
      }
      console.log(buttonLeft)
      this.setData({
        // buttonTop: buttonTop,
        buttonLeft: buttonLeft,
        progress: buttonLeft - min,
        progressText: ((buttonLeft - min) / (max - min) * maxProgress).toFixed(0)        
      })           
    },
    buttonEnd: function (e) {
      var that = this;
      //产品购买价格计算
      num = that.data.progressText;
      proId = that.data.test[that.data.current].id;

      api.sendRequest(app.globalData.url + '/Interface/PrizeCalc.ashx', 'POST', { "proid": proId, "num": num, "uid": wx.getStorageSync('userId') }).then(function (response) {
        if (response.data.status == 1) {          
          if (that.data.progressText == 0) {
            that.setData({
              totalAmount: response.data.data.paymoney,
              btnPaymentDis: true,
              youhui: response.data.data.youhui,
              remark: response.data.data.remark
            })
          } else {
            that.setData({
              totalAmount: response.data.data.paymoney,
              btnPaymentDis: false,
              youhui: response.data.data.youhui,
              remark: response.data.data.remark
            })
          }

        } else {
          that.setData({            
            btnPaymentDis: true            
          })
          wx.showToast({
            title: response.data.data,
            icon: 'none',
            duration: 2000
          })
        }
                
      }, function (error) {
        console.log(error);
      })
    },

    /**
     * 获取分数
     */
    getScore() {
      return this.data.progressText
    },

    setCurrentProgress(progress) {
      this.setData({
        currentProgress: progress,
        progressText: (progress).toFixed(0),
        buttonLeft: progress * (max - min) / maxProgress + min,
        progress: progress * (max - min) / maxProgress
      })
    },
 
  productChange:function(e){
    console.log(e);    
    this.setData({
      current:e.detail.current,
      oneyear: false,
      twoyears: false,
      fouryears: false,
      fiveyears: false,
      buttonLeft: 0,
      progress: 0,
      progressText: 0,
      totalAmount:0,
      btnPaymentDis: true,
      youhui:0,
      remark:""
    })
  },

  btnProductDurationClick:function(e){    
    var type = e.currentTarget.dataset.type;      
       
    if (type == "oneyear") {
      this.setData({
        oneyear: true,
        twoyears: false,
        fouryears: false,
        fiveyears: false
      })
    } else if (type == "twoyears") {
      this.setData({
        twoyears: true,
        oneyear: false,        
        fouryears: false,
        fiveyears: false
      })
    } else if (type == "fouryears") {
      this.setData({
        fouryears: true,
        twoyears: false,
        oneyear: false,        
        fiveyears: false
      })
    } else if (type == "fiveyears") {
      this.setData({
        fiveyears: true,
        fouryears: false,
        twoyears: false,
        oneyear: false        
      })
    }

    var that=this;
    //产品购买时长计算
    timeNum = parseInt(e.currentTarget.dataset.num);         
    proId = that.data.test[that.data.current].id;

    api.sendRequest(app.globalData.url + '/Interface/PrizeCalc.ashx', 'POST', { "proid": proId, "num": timeNum, "uid": wx.getStorageSync('userId')}).then(function (response) {
      console.log(response.data);
      if (response.data.status==1){
        that.setData({
          totalAmount: response.data.data.paymoney,
          btnPaymentDis: false,
          youhui: response.data.data.youhui,
          remark: response.data.data.remark
        })     
      }else{           
        wx.showToast({
          title: response.data.data,
          icon: 'none',
          duration: 2000
        })
      }             
    }, function (error) {
      console.log(error);
    })
  },

  //确认支付
  btnPayment:function(){
    console.log('userid:' + wx.getStorageSync('userId'));
    if (wx.getStorageSync('userId') == "") {
      /*wx.navigateTo({
        url: '/pages/register/register',
      })*/
    } else {
      console.log(wx.getStorageSync('userId'));
      /*console.log(productItem.id);
      console.log(parseFloat(productItem.prize).toFixed(2));*/

      var that=this;

      api.sendRequest(app.globalData.url + '/Interface/buyproduct.ashx', 'POST', { "user": wx.getStorageSync('userId'), "proid": proId, "buycount": num, "year": timeNum, "money": that.data.totalAmount }).then(function (resBuyProduct) {
        if (resBuyProduct.data.status == 1) {
          orderNo = resBuyProduct.data.data;
          console.log("uid" + wx.getStorageSync('userId') + "|orderNo" + orderNo + '|' + "openid" + wx.getStorageSync("openId"));

          api.sendRequest(app.globalData.url + '/Interface/SendPay.ashx', 'POST', { "uid": wx.getStorageSync('userId'), "openid": wx.getStorageSync("openId"), "orderno": orderNo }).then(function (resSendPay) {
            if (resSendPay.data.status == 1) {
              console.log(resSendPay.data.data);
              wxPay(resSendPay.data.data);
            } else {
              wx.showToast({
                title: resSendPay.data.data,
                icon: 'none',
                duration: 2000
              })
            }
          }, function (error) {
            console.log(error);
          })          
        }
        else {
          wx.showToast({
            title: resBuyProduct.data.data,
            icon: 'none',
            duration: 2000
          })
        }
      }, function (error) {
        console.log(error);
      })      
    }
  },

  wxPay(param) {

  },

  bindTab:function(e){    
    this.setData({
      current: e.currentTarget.dataset.current,
      oneyear: false,
      twoyears: false,
      fouryears: false,
      fiveyears: false,
      buttonLeft: 0,
      progress: 0,
      progressText: 0,
      totalAmount: 0,
      btnPaymentDis: true,
      youhui: 0,
      remark: ""
    })
  },

  onLoad: function (options) {
    /*var _this = this
    _this.setData({
      winWidth: 375,
      winHeight: 667
    })*/
    var matrixing = app.globalData.matrixing;
    var boxSelectWidth = (app.globalData.rpxWidth - (matrixing * 90)) / 2;
    console.log(boxSelectWidth);
    var boxWidth = boxSelectWidth - (matrixing * 30);
    this.setData({            
      boxSelectW: boxSelectWidth,
      boxW:boxWidth,
      boxMarginW:boxWidth/2,
      swiperH: boxSelectWidth,
      progressMaxW: app.globalData.rpxWidth - (matrixing * 32)      
    })

    var that = this;
    //获取所有产品
    api.sendRequest(app.globalData.url + '/Interface/product.ashx', 'POST', { }).then(function (response) {
      if(response.data.status==1){
        console.log(response.data.data.CanBuyList);
        that.setData({
          test: response.data.data.CanBuyList
        })
      }
      

    }, function (error) {
      console.log(error);
    })
    

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作  
   * 下拉刷新
  */
  onPullDownRefresh: function () {
    /*this.data.page = 1
    this.getCouponList('正在刷新数据')*/
  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    /*var _this = this
    if (_this.data.hasMoreData) {
      _this.setData({
        page: _this.data.page + 1
      })
      _this.getCouponList('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }*/
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    /*return {
      title: 'fsfkjsk',
      desc: '自定义分享描述',
      path: '/pages/index/index?id=123'
    }*/
  },

  /**
  * 顶部导航改变事件，即被点击了
  * 1、如果2次点击同一个当航，则不做处理
  * 2、需要记录本次点击和上次点击的位置
  */
  /*topNavChange: function (e) {
    var _this = this, nextActiveIndex = e.currentTarget.dataset.current,
      currentIndex = _this.data.currentTab;
    console.log(currentIndex)
    if (currentIndex != nextActiveIndex) {
      _this.setData({
        currentTab: nextActiveIndex,
        prevIndex: currentIndex
      });
    }
  },*/
  /**
 * swiper滑动时触发
 * 1、prevIndex != currentIndex 表示的是用手滑动 swiper组件
 * 2、prevIndex = currentIndex  表示的是通过点击顶部的导航触发的
 */
  /*swiperChange: function (e) {
    var prevIndex = this.data.currentTab,
      currentIndex = e.detail.current;
    this.setData({
      currentTab: currentIndex
    });
    if (prevIndex != currentIndex) {
      this.setData({
        prevIndex: prevIndex
      });
    }
    this.scrollTopNav();
  },*/
  /**
 * 滚动顶部的导航栏
 * 1、这个地方是大致估算的
 */
  /*scrollTopNav: function () {
    var _this = this
    // 当激活的当航小于4个时，不滚动
    if (_this.data.currentTab <= 3 && _this.data.scrollLeft >= 0) {
      _this.setData({
        scrollLeft: 0
      });
    } else {
      //当超过4个时，需要判断是向左还是向右滚动，然后做相应的处理
      var currentTab = _this.data.currentTab > _this.data.prevIndex ? _this.data.currentTab - _this.data.prevIndex : _this.data.prevIndex - _this.data.currentTab
      var plus = (_this.data.currentTab > _this.data.prevIndex ? 70 : -70) * currentTab;
      console.log(currentTab)
      console.log(_this.data.scrollLeft)
      _this.setData({
        scrollLeft: _this.data.scrollLeft + plus
      });
    }
    console.info(_this.data.currentTab, _this.data.prevIndex, _this.data.scrollLeft);
  }*/

})