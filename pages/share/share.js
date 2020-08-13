var app=getApp();
const api = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloadImg:"",
    viewButton:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在生成海报',
    })
    this.downloadBill(this.process_data);    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
  },  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (object) {

  },

  //保存至相册
  saveImg:function(){
    var that=this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.downloadImg,
      success(res){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })    
  },

  process_data:function(data){
    var that = this;
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.downloadImg,
        success: function (res) {
          resolve(res);
        }
      })
    });

    Promise.all([
      promise1
    ]).then(res => {
      var canvas = wx.createCanvasContext('shareCanvas');
      var matrixing = app.globalData.matrixing;
      var rpxTopx = 1 / matrixing;
      var widthPX = (app.globalData.rpxWidth / matrixing) - 100
      var heightPX = (350 * matrixing) * rpxTopx;
      var dw=widthPX/600;
      var dh=heightPX/700;  
      canvas.drawImage(res[0].path, 0, (700 - heightPX / dw) / 2, 600, heightPX / dw, 0, 0, widthPX, heightPX);
      that.setData({
        canvasW: widthPX,
        canvasH: heightPX,
      })
      canvas.save();
      canvas.draw();

    })
    
    
    setTimeout(function(){
      that.setData({
        viewButton: 'block'
      })
      wx.hideLoading();
    },500)
    
    that.setData({
      viewButton: 'block'
    })
  },

  downloadBill:function(cb) {
    var that = this;
    wx.downloadFile({
      url: 'https://shikeji.oss-cn-huhehaote.aliyuncs.com/shikeji.png',
      success: function (res) {
        if(res.statusCode==200){
          that.setData({
            downloadImg: res.tempFilePath
          })
          cb(res.tempFilePath);
        }        
      }, fail: function () {
        console.log('fail');
      }
    })
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
    
    if(userifno!=""){
      //增加免费创建提醒次数
      api.sendRequest(app.globalData.url + '/Interface/Other.ashx', 'POST', { "action": "addcanuse", "uid": userifno.id, "num": 1, "share": 1 }).then(function (response) {
        console.log(response.data);
      }, function (error) {
        console.log(error);
      })
    }
    
    return{
      title:'我有一个重要时刻与你分享',
      path:'/pages/welcome/welcome',
      imageUrl: "/images/icon/eventShare.jpg"
    }    
  }
})