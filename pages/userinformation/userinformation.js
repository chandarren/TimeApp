var app = getApp();
var date = new Date;
var dateType;
//获取当前时间
function currentDate() {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  month = month + 1;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

function dateCompare(currentDate, selectDate) {
  var currentDateArr = currentDate.split("-");
  var currentTime = new Date(currentDateArr[0], currentDateArr[1], currentDateArr[2]).getTime();

  var selectDateArr = selectDate.split("-");
  var selectTime = new Date(selectDateArr[0], selectDateArr[1], selectDateArr[2]).getTime();

  if (selectTime > currentTime) {
    return false;
  } else {
    return true;
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    currentDate: currentDate(),
    manChecked:false,
    womanChecked:false
  },
  openbindphone:function(){
    wx.navigateTo({
      url: '/pages/bindphone/bindphone',
    })
  },
  bindDateChange: function (e) {
    if (dateCompare(currentDate(), e.detail.value)) {
      this.setData({
        currentSelectDate: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请选择今日之前（含今日）的日期',
        icon: 'none',
        duration: 2000
      })
    }
  },
  updatePhone:function  (e){
    wx.navigateTo({
      url: '/pages/bindphone/bindphone',
    })
  },
  informationForm:function(data){    
    if (data.detail.value.nickName == "") {
      wx.showToast({
        title: '请填写昵称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (data.detail.value.email != "") {
      if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(data.detail.value.email))){
        wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
        });
        return false;
      }
    }
    if (data.detail.value.birthday == ">") {
      wx.showToast({
        title: '请选择生日',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (data.detail.value.sexRadioGroup == "") {
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.request({
      data: { "action": "editinfo", "userid": wx.getStorageSync("userId"), "nickname": data.detail.value.nickName,"email": data.detail.value.email, "birth": data.detail.value.birthday, "sex": data.detail.value.sexRadioGroup },
      url: app.globalData.url + '/Interface/Account.ashx',      
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: "修改成功！",
            icon: 'none',
            duration: 2000
          })
          wx.setStorageSync("theuserinfo", res.data.data);               
          wx.switchTab({
            url: '/pages/personal/personal',
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

  sexChange:function(e){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var userifno = wx.getStorageSync("theuserinfo");
    this.setData({
      viewContainerH: app.globalData.rpxHeight - 320,
      inputBirthdayM: app.globalData.matrixing * 68,
      nickName:userifno.nickName,
      mobile:userifno.mobile == ""?">":userifno.mobile,
      email:userifno.email,
      currentSelectDate:userifno.birthDay == ""? ">":userifno.birthDay,
      manChecked:userifno.sex == "男" ? true : false,
      womanChecked:userifno.sex == "女" ? true : false
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