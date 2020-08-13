var app = getApp();
const api = require('../../utils/api');
var matrixing = app.globalData.matrixing;
var recentlyRemindW = app.globalData.rpxWidth - (matrixing * 170);

var x = app.globalData.rpxWidth - (matrixing * 116) - recentlyRemindW;
var array=[];
var tt=false;
var eventId;
var shixiao;

/*this.setData({
  recentlyRemindItemContentW: recentlyRemindW,
  recentlyRemindItemEndW: app.globalData.rpxWidth - (matrixing * 116) - recentlyRemindW,
})*/

Component({  
  options: {  
    
  },  
  /** 
   * 组件的属性列表 
   */  
  properties: {     
    //事件类型 
    eventtype: {  
      type: Number,  
      value: 1  
    }, 
    //事件名称
    title: {  
      type: String,  
      value: "事件名称"  
    }, 
    //事件描述
    describe: {  
      type: String,  
      value: "事件描述" 
    }, 
    //分享人
    fromshare:{
      type: String,  
      value: "" 
    },
    //倒计时间
    date_remark: {  
      type: Number,  
      value: 0 
    },
    //在列表中的位置，index为下标
    index: {
      type: Number,
      value: 0
    },
    type:{
      type:String,
      value:""
    }  
  },  
  /** 
   * 组件的初始数据 
   */  
  data: {  
    recentlyRemindItemContentW:recentlyRemindW,
    recentlyRemindItemEndW:x,
    //isCbHidden:true,
    isCbShow:"display:none",
    cbEvent:false    
  },    
  
  /** 
   * 组件的方法列表 
   */  
  methods: {      
    eventDetail: function () {
      console.log('准备查看详情')
      var eventDetailid = {index:this.data.index }
      console.log(eventDetailid);
      //this.triggerEvent('eventDetail', eventDetail, {}) // 触发eventDetail事件
      wx.navigateTo({
        url: '/pages/event/eventdetail?type=normal&shixiao=' + this.data.date_remark +'&eventid=' + this.data.index+''
      })
    } ,
    /*showhandler: function () {
      console.log('点击了展开操作菜单')
      var showcaozuo = {index:this.data.index }
      this.triggerEvent('showhandler', showhandler, {}) // 触发showhandler事件
    }*/
    tt:function(e){
console.log(e.currentTarget.id);
      var id = e.currentTarget.id;
      let scrollTop = 0;
      wx.createSelectorQuery().in(this).selectViewport().scrollOffset(function (res) {
        console.log(res);
        scrollTop = res.scrollTop;
      }).exec()
      wx.createSelectorQuery().in(this).select('.view-recently-remind-item-ellipsis-list').boundingClientRect(res => {
        this.onDisplay(res, scrollTop);
      }).exec();

      

      /*const query = wx.createSelectorQuery().in(this)
      query.select('1016').boundingClientRect(rect => {
        console.log(rect.height)
      }).exec();*/

      /*const query = wx.createSelectorQuery().in(this)               // 创建节点查询器 query
      query.select('.view-recently-remind-item-ellipsis-list').boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求      
      query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求
      query.exec((res) => {
        //res[0].top                                          // #productServe节点的到页面顶部的距离
        console.log(res);
      })*/

      

      /*query.select('#'+id).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        console.log(res)
        // res[0].top       // 节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        
      })*/
      

    },
    onTap:function(e){
      eventId = e.currentTarget.id;
      
      //console.log(id);
      
      
      // 获取元素的坐标信息
      wx.createSelectorQuery().in(this).select('.view-recently-remind-item-ellipsis-list').boundingClientRect(res => {
               
        this.selectComponent('#popover').onDisplay(res);
        
      }).exec();

      var that = this;
            
        var a= setInterval(function () {
          if (that.selectComponent('#popover').last != undefined){
clearInterval(a);
          }
            that.selectComponent('#popover').onHide();
                    
        }, 3000);      
    },

    editClick: function (e) {
      //console.log('onClick A ', e);
      console.log(this.data.fromshare);
      if (this.data.fromshare==""){
        console.log('空');
        wx.navigateTo({
          url: '/pages/event/addreminder?type=edit&shixiao=' + this.data.date_remark + '&eventid=' + eventId + '',
        })
      }else{
        console.log('非空');
        wx.showToast({
          title: '共享事件无法编辑',
          icon: 'none'
      });
      }
            
      console.log(this.selectComponent('#popover'));
      this.selectComponent('#popover').onHide();
    },

    deleteClick:function(e){
      var that = this;

      wx.showModal({
        title: '删除',
        content: '确认删除吗？',
        success(res){
          if(res.confirm){
            //删除一个纪念日事件
            api.sendRequest(app.globalData.url + '/Interface/DateRemind.ashx', 'POST', { "action": "remove", "sid": eventId }).then(function (response) {              
              if (response.data.status == 1) {
                wx.showToast({
                  title: response.data.data,
                  icon: 'none',
                  duration: 2000
                })                
                /*wx.switchTab({
                  url: '/pages/event/eventlist',
                })*/                
                that.triggerEvent('shuaxin');
                
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
          }else if(res.cancel){

          }
        }
      })
      
      this.selectComponent('#popover').onHide();
    },
    tttt(data){
      console.log(data);
      this.setData({
        isCbShow:"display:block"        
      })
            
      console.log('掉用成功'+eventId);
    },
    yyyy(data) {
      console.log(data);
      this.setData({
        isCbShow: "display:none"
      })



      console.log('掉用成功' + eventId);
    },
    rr:function(e){
      //console.log(e.currentTarget.dataset.id);
      
      //this.triggerEvent('selectItem', e.currentTarget.dataset.id);
      /*this.setData({
        isCbHidden: true
      })*/
    },

    ff:function(e){
      //console.log(e.detail.value);
      if (Object.keys(e.detail.value).length===0){
console.log('是选中的');
        this.triggerEvent('delSelectItem', e.currentTarget.dataset.id);
      }else{
        console.log('未选中');
        this.triggerEvent('selectItem', e.currentTarget.dataset.id);
      }
      
    },
    //全选
    selectAll(){
      this.setData({
        cbEvent:true
      })
    },
    //全不选
    unSelectAll() {
      this.setData({
        cbEvent: false
      })
    },
    //列表前出现选择框，动态调节宽度
    selfAdaption(){
      this.setData({
        recentlyRemindItemContentW:recentlyRemindW-50
      })
    },
    //列表前出现选择框，动态调节宽度(点击取消后，恢复默认宽度)
    selfAdaptionCancel() {
      this.setData({
        recentlyRemindItemContentW: recentlyRemindW
      })
    }
    /*onDisplay:function(e,scrollTop){
      console.log(e);
      console.log(scrollTop);
    } */   
  }  
})  
