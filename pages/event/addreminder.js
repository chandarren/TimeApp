var app = getApp();
const api = require('../../utils/api');
var date = new Date;
var dateType;
//var type="";//新增/修改
var eventId=0;
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
    remindTypeArray:[
      { name: '生日' },
      { name: '纪念日' },
      { name: '会议' },
      { name: '活动安排' },
      { name: '重要计划' },
      { name: '其它' },
    ],
    dateTypeArray:[
      {name:'农历'}
    ],
    remindTypeIndex:-1,
    show: false,
    currentDate: currentDate(),    

    everyday:false,
    weekly:false,
    monthly:false,
    everyyear:false,
    noRepeat:true,

    theSameDay:true,
    oneday:false,
    twoday:false,
    oneweek:false,
    onemonth:false,

    default:true,
    officialAccount:false,
    email:false,
    message:false,
    voip:false,

    reminders:"0",//重复提醒选项
    reminderTime: [0],//提醒时间选项
    reminderType: [1],//提醒方式选项

    //控制"提醒时间"按钮是否被禁用
    disOneday:false,
    disTwoday:false,
    disOneweek:false,
    disOnemonth:false,
    //生日或纪念日默认按每年提醒方式
    disnoRepeat:false,
    diseveryday:false,
    disweekly:false,
    dismonthly:false,
    isRemindTips:false,//"重复提醒"选择后的提示文字是否展示
    remindTypeTips:'为保证提醒触达，请尽量多选提醒方式',//用于展示提醒方式下方备注
    type: "",//新增/修改
    vlidatetxt:"",
    time:"00:00",
    weekArrayIndex:0,
    weekArray: [
      { name: '星期一' },
      { name: '星期二' },
      { name: '星期三' },
      { name: '星期四' },
      { name: '星期五' },
      { name: '星期六' },
      { name: '星期天' }
    ],
    monthArrayIndex:0,
    monthArray: [
      { name: '1日' },
      { name: '2日' },
      { name: '3日' },
      { name: '4日' },
      { name: '5日' },
      { name: '6日' },
      { name: '7日' },
      { name: '8日' },
      { name: '9日' },
      { name: '10日' },
      { name: '11日' },
      { name: '12日' },
      { name: '13日' },
      { name: '14日' },
      { name: '15日' },
      { name: '16日' },
      { name: '17日' },
      { name: '18日' },
      { name: '19日' },
      { name: '20日' },
      { name: '21日' },
      { name: '22日' },
      { name: '23日' },
      { name: '24日' },
      { name: '25日' },
      { name: '26日' },
      { name: '27日' },
      { name: '28日' },
      { name: '29日' },
      { name: '30日' },
      { name: '31日' }
    ],
    everyyearIndex:[0,0],
    everyyearArray: [['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',], ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日']]
  },

  remindTypeChange:function(e){          
    //生日或纪念日默认按每年提醒方式
    if(e.detail.value == '0' || e.detail.value == '1'){
      this.setData({
        remindTypeIndex: e.detail.value,
        disnoRepeat:true,
        diseveryday:true,
        disweekly:true,
        dismonthly:true,
        everyyear: true,
        reminders:"4"
      })
    }
    else{
      this.setData({
        remindTypeIndex: e.detail.value,
        disnoRepeat:false,
        diseveryday:false,
        disweekly:false,
        dismonthly:false,
        everyyear: false
      })
    }
  },

  reminderForm:function(data){
    
  },

  //选择日期
  selectDate: function () {
    this.setData({
      show: true
    })

    
    if(this.data.everyday){
      console.log('每天');
      
    } else if (this.data.weekly){
      console.log('每周');
    } else if (this.data.monthly){
      console.log('每月');
    } else if (this.data.everyyear) {
      console.log('每年');
    }
  },

  submit: function (e) {
    if (e.detail.dateType == "农历") {
      var _this = this;
      wx.request({
        data: { "date": e.detail.dateStr },
        url: app.globalData.url + '/Interface/DateConvert.ashx',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success(res) {
          if (res.data.status == 1) {
            _this.setData({
              currentSelectDate: e.detail.dateStr.substring(0, 4) + "年" + e.detail.dateStr.substring(9, e.detail.dateStr.length)
            })
          }
          else {

          }
        }
      })

    } else {
      this.setData({
        currentSelectDate: e.detail.dateStr
      })
      if (e.detail.dateType == "公历") {
        dateType = 0;
        this.setData({
          dateType: "公历"
        })
      } else {
        dateType = 1;
        this.setData({
          dateType: "农历"
        })
      }
    }
  },

  //选择"重复提醒"
  btnRemindersClick:function(e){
    var type = e.currentTarget.dataset.type;
    var userifno = wx.getStorageSync("theuserinfo");
    if (type =="everyday"){     
        this.setData({
          everyday: true,          
          weekly: false,
          monthly: false,
          everyyear: false,
          noRepeat: false,
          reminders:"1",
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: false
        })                      
    } else if (type == "weekly"){            
      if (userifno.proName == "免费版") {
        this.setData({
          weekly: true,
          monthly: false,
          everyyear: false,
          noRepeat: false,
          everyday: false,
          reminders: "2",
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: true,
          remindTips: "系统将自动计算当前日期所代表的星期",          
        })
      } else if (userifno.proName == "普通版") {
        this.setData({
          weekly: true,
          monthly: false,
          everyyear: false,
          noRepeat: false,
          everyday: false,
          reminders: "2",
          disOneday: false,
          disTwoday: false,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: true,
          remindTips: "系统将自动计算当前日期所代表的星期"          
        })
      } else if (userifno.proName == "旗舰版") {
        //不限制
        this.setData({
          weekly: true,
          monthly: false,
          everyyear: false,
          noRepeat: false,
          everyday: false,
          reminders: "2",
          disOneday: false,
          disTwoday: false,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: true,
          remindTips: "系统将自动计算当前日期所代表的星期"
        })
      } 
    } else if (type == "monthly"){      
      if (userifno.proName == "免费版") {
        this.setData({
          monthly: true,
          everyyear: false,
          noRepeat: false,
          everyday: false,
          weekly: false,
          reminders: "3",
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: true,
          remindTips: "系统将自动计算每月的当前“日”"          
        })
      } else if (userifno.proName == "普通版") {
        this.setData({
          monthly: true,
          everyyear: false,
          noRepeat: false,
          everyday: false,
          weekly: false,
          reminders: "3",
          disOneday: false,
          disTwoday: false,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: true,
          remindTips: "系统将自动计算每月的当前“日”"          
        })
      } else if (userifno.proName == "旗舰版") {
        //不限制
        this.setData({
          monthly: true,
          everyyear: false,
          noRepeat: false,
          everyday: false,
          weekly: false,
          reminders: "3",
          disOneday: false,
          disTwoday: false,
          disOneweek: false,
          disOnemonth: true,
          isRemindTips: true,
          remindTips: "系统将自动计算每月的当前“日”"
        }) 
      }
    } else if (type == "everyyear"){      
      if (userifno.proName == "免费版") {
        this.setData({
          everyyear: true,
          noRepeat: false,
          everyday: false,
          weekly: false,
          monthly: false,
          reminders: "4",
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: false          
        })
      } else if (userifno.proName == "普通版") {
        this.setData({
          everyyear: true,
          noRepeat: false,
          everyday: false,
          weekly: false,
          monthly: false,
          reminders: "4",
          disOneday: false,
          disTwoday: false,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: false          
        })
      } else if (userifno.proName == "旗舰版") {
        //不限制
        this.setData({
          everyyear: true,
          noRepeat: false,
          everyday: false,
          weekly: false,
          monthly: false,
          reminders: "4",
          disOneday: false,
          disTwoday: false,
          disOneweek: false,
          disOnemonth: false,
          isRemindTips: false
        })
      }
    } else if (type == "noRepeat") {      
      if (userifno.proName == "免费版") {
        this.setData({
          noRepeat: true,
          everyday: false,
          weekly: false,
          monthly: false,
          everyyear: false,
          reminders: "0",
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: false          
        })
      } else if (userifno.proName == "普通版") {
        this.setData({
          noRepeat: true,
          everyday: false,
          weekly: false,
          monthly: false,
          everyyear: false,
          reminders: "0",
          disOneday: false,
          disTwoday: false,
          disOneweek: true,
          disOnemonth: true,
          isRemindTips: false          
        })
      } else if (userifno.proName == "旗舰版") {
        //不限制
        this.setData({
          noRepeat: true,
          everyday: false,
          weekly: false,
          monthly: false,
          everyyear: false,
          reminders: "0",
          disOneday: false,
          disTwoday: false,
          disOneweek: false,
          disOnemonth: false,
          isRemindTips: false
        })
      }
    }    
  },

  //选择"提醒时间"
  btnReminderTimeClick:function(e){
    var type = e.currentTarget.dataset.type;
    if (type == "theSameDay") {      
      if (this.data.theSameDay){        
        this.setData({
          theSameDay: false                    
        })
        var index = this.data.reminderTime.indexOf(0);//找到当前项所在数组的索引 
        this.data.reminderTime.splice(index,1);
      }else{
        this.setData({
          theSameDay: true
        })
        this.data.reminderTime.splice(0, 0,0);
      }      
    } else if (type == "oneday") {
      if (this.data.oneday) {
        this.setData({
          oneday: false
        })
        var index = this.data.reminderTime.indexOf(1);//找到当前项所在数组的索引 
        this.data.reminderTime.splice(index, 1);
      } else {
        this.setData({
          oneday: true
        })
        this.data.reminderTime.splice(0, 0, 1);
      }            
    } else if (type == "twoday") {
      if (this.data.twoday) {
        this.setData({
          twoday: false
        })
        var index = this.data.reminderTime.indexOf(2);//找到当前项所在数组的索引 
        this.data.reminderTime.splice(index, 1);
      } else {
        this.setData({
          twoday: true
        })
        this.data.reminderTime.splice(0, 0, 2);
        //console.log(this.data.reminderTime);
      }
    } else if (type == "oneweek") {
      if (this.data.oneweek) {
        this.setData({
          oneweek: false
        })
        var index = this.data.reminderTime.indexOf(7);//找到当前项所在数组的索引 
        this.data.reminderTime.splice(index, 1);
        //console.log(this.data.reminderTime);
      } else {
        this.setData({
          oneweek: true
        })
        this.data.reminderTime.splice(0, 0, 7);
        //console.log(this.data.reminderTime);
      }
    } else if (type == "onemonth") {
      if (this.data.onemonth) {
        this.setData({
          onemonth: false
        })
        var index = this.data.reminderTime.indexOf(30);//找到当前项所在数组的索引 
        this.data.reminderTime.splice(index, 1);
        //console.log(this.data.reminderTime);
      } else {
        this.setData({
          onemonth: true
        })
        this.data.reminderTime.splice(0, 0, 30);
        //console.log(this.data.reminderTime);
      }
    }
  },

  //选择"提醒方式"
  btnReminderTypeClick:function(e){
    var type = e.currentTarget.dataset.type;
    var userinfo =  wx.getStorageSync("theuserinfo");
    var that=this;
    if (type == "default") {
      if (this.data.default) {
        this.setData({
          default: false,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        var index = this.data.reminderType.indexOf(1);//找到当前项所在数组的索引 
        this.data.reminderType.splice(index, 1);
      } else {
        this.setData({
          default: true,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        this.data.reminderType.splice(0, 0, 1);
      }
    } else if (type == "officialAccount") {
      if (this.data.officialAccount) {
        this.setData({
          officialAccount: false,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        var index = this.data.reminderType.indexOf(2);//找到当前项所在数组的索引 
        this.data.reminderType.splice(index, 1);
      } else {
        this.setData({
          officialAccount: true,
          remindTypeTips:'选择该种方式时记得关注公众日'
        })
        this.data.reminderType.splice(0, 0, 2);
      }
    } else if (type == "email") {
      if(userinfo.email==''){
        this.setData({
          email: true,
          remindTypeTips:'您还未绑定邮箱，无法选择该方式'
        })        
        setTimeout(function(){
          that.setData({
            email: false,            
          })
        },1000)
        return;
      }
      if (this.data.email) {
        this.setData({
          email: false,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        var index = this.data.reminderType.indexOf(3);//找到当前项所在数组的索引 
        this.data.reminderType.splice(index, 1);
      } else {
        this.setData({
          email: true,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        this.data.reminderType.splice(0, 0, 3);
      }
    } else if (type == "message") {
      if(userinfo.mobile==''){
        this.setData({
          message: true,
          remindTypeTips:'您还未绑定手机日，无法选择该方式'
        })
        setTimeout(function () {
          that.setData({
            message: false,
          })
        }, 1000)
        return;
      }
      if(userinfo.Msgyue <= 0){
        this.setData({
          message: true,
          remindTypeTips:'您的短信剩余条数不足，无法选择该方式'
        })
        setTimeout(function () {
          that.setData({
            message: false,
          })
        }, 1000)
        return;
      }
      if (this.data.message) {
        this.setData({
          message: false,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        var index = this.data.reminderType.indexOf(4);//找到当前项所在数组的索引 
        this.data.reminderType.splice(index, 1);
      } else {
        this.setData({
          message: true,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        this.data.reminderType.splice(0, 0, 4);
      }
    } else if (type == "voip") {
      if(userinfo.mobile==''){
        this.setData({
          voip: true,
          remindTypeTips:'您还未绑定手机日，无法选择该方式'
        })
        setTimeout(function () {
          that.setData({
            voip: false,
          })
        }, 1000)
        return;
      }
      if(userinfo.Voiceyue <= 0){
        this.setData({
          voip: true,
          remindTypeTips:'您的语音剩余条数不足，无法选择该方式'
        })
        setTimeout(function () {
          that.setData({
            voip: false,
          })
        }, 1000)
        return;
      }
      if (this.data.voip) {
        this.setData({
          voip: false,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        var index = this.data.reminderType.indexOf(5);//找到当前项所在数组的索引 
        this.data.reminderType.splice(index, 1);
      } else {
        this.setData({
          voip: true,
          remindTypeTips:'为保证提醒触达，请尽量多选提醒方式'
        })
        this.data.reminderType.splice(0, 0, 5);
      }
    }
  },
  //键入的文本验证是否合法
  ValidateTxt:function(e){
    var _this = this;
    var value = e.detail.value;
    api.sendRequest(app.globalData.url + '/Interface/ContentFilter.ashx', 'POST', { "action": "text", "content": value }).then(function (response) {
      if (response.data.status == 1) {
        _this.setData({
          vlidatetxt:''
         })
      } else {
        // 不合格，清除数据并给以提示
        _this.setData({
          vlidatetxt:'内容含有违规违法内容，请修改'
         })
      }
    }, function (error) {
      console.log(error);
    })
   },
  //创建提醒
  reminderForm:function(data){
    var remindLX = this.data.remindTypeIndex;    
    var lx = remindLX++;      
    if (data.detail.value.eventTitle == "") {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
        duration: 2000
      })
      return false;
    }       
    if (lx == -1) {
      wx.showToast({
        title: '请选择事件提醒类型',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (data.detail.value.eventDate == "") {
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.reminderTime.length == 0) {
      wx.showToast({
        title: '请选择提醒时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.reminderType.length == 0) {
      wx.showToast({
        title: '请选择提醒方式',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    //添加一个纪念日事件    
    var that=this;        
    if(that.data.type=="新增"){
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "add", "user": wx.getStorageSync("userId"), "title": data.detail.value.eventTitle, "type": dateType, "eventtype": remindLX, "zhouqi": that.data.reminders + ",", "time": that.data.reminderTime.join(",") + ",", "txtype": that.data.reminderType.join(",") + ",", "date": data.detail.value.eventDate, "describe": data.detail.value.reminderNotes }).then(function (response) {        
        if (response.data.status == 1) {
          wx.showToast({
            title: response.data.data,
            icon: 'none',
            duration: 2000
          })
          that.dingyue();    
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
    }else if(that.data.type=="修改"){
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "edit","id":eventId, "title": data.detail.value.eventTitle, "type": dateType, "eventtype": remindLX, "zhouqi": that.data.reminders + ",", "time": that.data.reminderTime.join(",") + ",", "txtype": that.data.reminderType.join(",") + ",", "date": data.detail.value.eventDate, "describe": data.detail.value.reminderNotes }).then(function (response) {
        if (response.data.status == 1) {
          wx.showToast({
            title: response.data.data,
            icon: 'none',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/event/eventlist',
          })
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
    }

    
  },

  dingyue: function () {    
    wx.getSetting({
      withSubscriptions:true,
      success(res){
        if (res.subscriptionsSetting){
          wx.switchTab({
            url: '/pages/event/eventlist',
          })
          }else{
          //弹出订阅消息授权框    
          wx.requestSubscribeMessage({
            tmplIds: ['JPhx5saZjYL9EUqJdgeb1Iaq7ZxxrLEI2MLEu9f1c3M'],
            success(res) {
              wx.switchTab({
                url: '/pages/event/eventlist',
              })
            }
          })
          }
      }
    })        
  },

  //重复提醒为每天时选择日期触发
  bindTimeChange:function(e){
    this.setData({
      dateType: "每天",
      currentSelectDate:e.detail.value
    })
    //console.log(e.detail.value);
  },

  //重复提醒为每周时选择日期触发
  bindWeekChange:function(e){
    this.setData({
      dateType: "每周",
      weekArrayIndex: e.detail.value,
      currentSelectDate:this.data.weekArray[e.detail.value].name
    })
    //console.log(e.detail.value);
    //console.log(this.data.weekArray[e.detail.value].name);        
  },
  
  //重复提醒为每月时选择日期触发
  bindMonthChange: function(e) {
    this.setData({
      dateType: "每月",
      monthArrayIndex:e.detail.value,
      currentSelectDate:this.data.monthArray[e.detail.value].name
    })
    //console.log(e.detail.value);
    //console.log(this.data.monthArray[e.detail.value].name);
  },
  
  //重复提醒为每年时选择日期触发
  bindEveryyearChange: function(e) {
    //console.log(this.data.everyyearArray[0][this.data.everyyearIndex[0]]);//选择的是几月
    //console.log(this.data.everyyearArray[1][this.data.everyyearIndex[1]]);//选择的是几日
    var tdate = this.data.everyyearArray[0][this.data.everyyearIndex[0]] + this.data.everyyearArray[1][this.data.everyyearIndex[1]];
    this.setData({
      dateType: "每年",
      everyyearIndex:e.detail.value,
      currentSelectDate:tdate
    })
    //console.log(e.detail.value);
  },
  
  bindEveryyearColumnChange:function(e){
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    var userifno = wx.getStorageSync("theuserinfo");
    if(options.type=="add"){      
      this.setData({
        dateType: "日期类型",
        type:"新增"
      })

      if (userifno.proName == "免费版") {
        this.setData({
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true
        })
      } else if (userifno.proName == "普通版"){
        this.setData({          
          disOneweek: true,
          disOnemonth: true
        })
      } else if (userifno.proName == "旗舰版"){
        //不限制
      }
    } else if (options.type == "edit"){ 
      this.setData({
        type:"修改"  
      })

      if (userifno.proName == "免费版") {
        this.setData({
          disOneday: true,
          disTwoday: true,
          disOneweek: true,
          disOnemonth: true
        })
      } else if (userifno.proName == "普通版") {
        this.setData({
          disOneweek: true,
          disOnemonth: true
        })
      } else if (userifno.proName == "旗舰版") {
        //不限制
      }                 
      //var eventItem = JSON.parse(options.data);
      eventId = options.eventid;
      var that = this;
      //获取事件详情
      api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "getdetail", "event": options.eventid, "shixiao": options.shixiao==-1?1:0 }).then(function (response) {
        if (response.data.data.datetype == "公历") {
          dateType = 0;
        } else {
          dateType = 1;
        }
        that.setData({
          eventTitle: response.data.data.title,
          // topicDescription: response.data.data.theme,
          remindTypeIndex: response.data.data.eventtype - 1,
          currentSelectDate: response.data.data.datetype == "农历" ? response.data.data.nongli_date : response.data.data.gongli_date,
          dateType: response.data.data.datetype,
          reminderNotes: response.data.data.describe
        })
        //为"重复提醒"赋值
        var resRemindZhouqi = response.data.data.remindzhouqi + "";
        resRemindZhouqi = resRemindZhouqi.substring(0, resRemindZhouqi.length - 1);
        //console.log(resRemindZhouqi);
        that.data.reminders = resRemindZhouqi;
        //数组                  
        /*var str = resRemindZhouqi.replace(/\"/g, "");
        var str1 = str.split(",");      
        var resRemindArray = str1.map(Number);
        console.log(resRemindArray);
        this.data.reminders=resRemindArray;*/
        //var that=this;
        //界面
        //生日或纪念日默认按每年提醒方式
        if (response.data.data.eventtype == '0' || response.data.data.eventtype == '1') {          
          that.setData({
            remindTypeIndex: response.data.data.eventtype,
            disnoRepeat: true,
            diseveryday: true,
            disweekly: true,
            dismonthly: true,
            everyyear: true,
            reminders: "4"
          })
        }
        else {
          that.setData({
            remindTypeIndex: response.data.data.eventtype,
            disnoRepeat: false,
            diseveryday: false,
            disweekly: false,
            dismonthly: false,
            everyyear: false
          })
        }
        
        if (resRemindZhouqi == "0") {//不重复          
          that.setData({
            noRepeat: true,
            everyday: false,
            weekly: false,
            monthly: false,
            everyyear: false,
          })
        } else if (resRemindZhouqi == "1") {//每天
          that.setData({
            everyday: true,
            noRepeat: false,
            weekly: false,
            monthly: false,
            everyyear: false,

            disOneday: true,
            disTwoday: true,
            disOneweek: true,
            disOnemonth: true,
          })
        } else if (resRemindZhouqi == "2") {//每周
          that.setData({
            weekly: true,
            noRepeat: false,
            everyday: false,
            monthly: false,
            everyyear: false,

            disOneweek: true,
            disOnemonth: true,
            isRemindTips: true,
            remindTips: "系统将自动计算当前日期所代表的星期"
          })
        } else if (resRemindZhouqi == "3") {//每月
          that.setData({
            monthly: true,
            noRepeat: false,
            everyday: false,
            weekly: false,
            everyyear: false,
                                                
            disOnemonth: true,
            isRemindTips: true,
            remindTips: "系统将自动计算每月的当前“日”"
          })
        } else if (resRemindZhouqi == "4") {//每年
          that.setData({
            everyyear: true,
            noRepeat: false,
            everyday: false,
            weekly: false,
            monthly: false,
          })
        }

        //为"提醒时间"赋值
        var resRemindTime = response.data.data.remindtime + "";
        resRemindTime = resRemindTime.substring(0, resRemindTime.length - 1);
        //数组                  
        var str = resRemindTime.replace(/\"/g, "");
        var str1 = str.split(",");
        var resRemindTimeArray = str1.map(Number);
        //console.log(resRemindTimeArray);
        that.data.reminderTime = resRemindTimeArray;
        //界面
        that.setData({
          theSameDay: false,
          oneday: false,
          twoday: false,
          oneweek: false,
          onemonth: false
        })
        resRemindTimeArray.forEach((item, index, array) => {
          if (item == 0) {//当天          
            that.setData({
              theSameDay: true
            })
          } if (item == 1) {//前一天
            that.setData({
              oneday: true
            })
          } if (item == 2) {//前两天
            that.setData({
              twoday: true
            })
          } if (item == 7) {//前一周
            that.setData({
              oneweek: true
            })
          } if (item == 30) {//前一月
            that.setData({
              onemonth: true
            })
          }
        })

        //为"提醒方式"赋值
        var resRemindType = response.data.data.txtype + "";
        resRemindType = resRemindType.substring(0, resRemindType.length - 1);
        //数组                  
        var str = resRemindType.replace(/\"/g, "");
        var str1 = str.split(",");
        var resRemindTypeArray = str1.map(Number);
        that.data.reminderType = resRemindTypeArray;
        //界面
        that.setData({
          default: false,
          officialAccount: false,
          email: false,
          message: false,
          voip: false
        })
        resRemindTypeArray.forEach((item, index, array) => {
          console.log(item);
          if (item == 1) {//默认          
            that.setData({
              default: true
            })
          } if (item == 2) {//公众日
            that.setData({
              officialAccount: true
            })
          } if (item == 3) {//邮件
            that.setData({
              email: true
            })
          } if (item == 4) {//短信
            that.setData({
              message: true
            })
          } if (item == 5) {//语音
            that.setData({
              voip: true
            })
          }
        })
      }, function (error) {
        console.log(error);
      })       
    }    
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