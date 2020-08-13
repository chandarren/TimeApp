var app=new getApp();
Component({
  properties: {
 
    //这里是遮罩层----默认显示
    modalHidden: {
      type: Boolean,
      value: true
    },
    modalD: {
      type: String,
      value: ""
    },
    // pract_id默认为0
    pract_id: {
      type: Number,
      value: 0
    },
    // 文本内容
    modalMsg: {
      type: String,
      value: " "
    },
  },
  data: {
    // 这里是一些组件内部数据
    context: "欢迎来到恋习大冒险,我是你的引路人小恋,恋习大冒险是一款通过了解彼此性格,习惯,三观来增进亲密度的游戏,需要两个人同步答题来完成,下面就让小恋先来和你互相了解一下吧。",
    // 指引线img
    wites_img: "/images/icon/anshare.png",
    // 指引线img
    wite_top_img: "/images/icon/anshare.png",
    // 朕已阅img
    read_img: "/images/icon/anshare.png",
    // 飞机图片
    less_img: "/images/icon/anshare.png",
    top_less_img: "/images/icon/anshare.png",
    // 机器人图片
    img_src: "/images/icon/anshare.png",
  },
 
  // 组件初始化
  attached: function() {
    // 出现练习大冒险--文案
    if (this.data.modalD == 1) {
      this.setData({
        pract_id: 11,
        context: "点击【邀请好友】界面会切换到微信好友界面,选择你想要一起答题的好友就可以开始冒险啦。现在让小恋先充当一下你的好友。"
      })
      // var val = this.data.pract_id; //通过这个传递数据
      // var myEventDetail = {
      //   val: val
      // } // detail对象，提供给事件监听函数compontpass
      // this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      // console.log("子组件yaoqing", this.data.pract_id);
    } else if (this.data.modalD == 4) {
      var cardid = 4;// wx.getStorageSync("cardid");
      console.log("获取cardid", cardid);
      if (cardid==1){
     // 出现矜持一下
        this.setData({
          pract_id: 9,
          context: "这里显示的是你的初始体力。上限30点,每小时回复一点体力。每次邀请答题扣除6体力。体力值不足时可通过分享到群里来"
        })
 
      }else{
        this.setData({
          pract_id: 4,
          context: "恋习大冒险里总共有81关,每次和好友进互动答题,所回答的题数会保存在主动一里,下一次和好友答题时只需要点击好友:像发送链接就可以继续进程,不同好友所"
        })
      }
 
    } else if (this.data.modalD == 5) {
      // 出现无尽模式阅读
      this.setData({
        pract_id: 15,
        context: "每道题的阅读和答题时间都是90秒。根据每个故事的字数不同,我们给的读题时间页不相同,题目左下角会有阅读倒计时提示。若你阅读速度快, 可以!点击【跳过】提前进入答题页面。"
      })
    } else if (this.data.modalD == 8){
      // 催促邀请
      this.setData({
        pract_id:8,
        context: "点击【邀请好友】界面会切换到微信好友界面选择你想要一起答题的好友就可以开始冒险啦。现在让小恋先充当一下你的好友。"
      })
    } else if (this.data.modalD == 24){
      // 催促邀请
      this.setData({
        pract_id: 24,
        context: "成功进阶，登顶成功。"
      })
    } else if (this.data.modalD == 26){
 
      // 错题回顾
      this.setData({
        pract_id: 26,
        context: "无尽模式错题回顾。"
      })
    }
    console.log("this.data.modalD", this.data.modalD);
 
  },
 
  // 这里是所有方法
  methods: {
 
    // 全局跳过指导
    btn_next: function() {
      wx.setStorageSync("pract_none", true);
      var pract_none = wx.getStorageSync("pract_none");
      this.setData({
        modalHidden: pract_none
      })
      app.globalData.isPacart = false;
      wx.reLaunch({
        url: '/pages/index/index',
      })
      console.log("pract_none", pract_none);
    },
 
 
    // 练习大冒险父组件传值给子组件
    start: function(obj) {
      console.log("子组件接收到的值", obj);
      if (obj == 2) {
        this.setData({
          pract_id: 2,
          context: "设置面板可以设置你的性别及年龄段。"
        })
      }
    },
    // 接收到闯关须知传值--显示
    begin_frend: function(obj) {
      console.log("子组件接收到的值", obj);
      if (obj == 12) {
        this.setData({
          pract_id: 12,
          context: "注意下方的闯关须知,里面有很多关于大冒险的小穿门,让你少走弯路哦。"
        })
      }
      // else if(obj==16){
      //   this.setData({
      //     pract_id: 16,
      //     context: "注意答题倒计时,在倒计时内没有提交答案,创将失败。答题倒计时是90秒减去读题时间得出的。科学分配读题与答题时间非常重要。"
      //   })
      // }
      
      
      else if(obj==20){
        this.setData({
          pract_id: 20,
          context: "成功了. XX和你还真有默契。我们马上就要进入下一题了。"
        })
 
      } 
      else if (obj == 21) {
        this.setData({
          pract_id: 21,
          context: "失败了. XX和你还真没有默契。。"
        })
 
      } else if (obj == 22){
        this.setData({
          pract_id: 22,
          context: "啊,失败了,不要紧,只要有体力,还能继续·闯关"
        })
 
      } else if (obj == 23) {
        this.setData({
          pract_id: 23,
          context: "o(T...r7o。失败了,体力也没有了。可以结束闯关,也可以分享到群恢复体力,继续游戏。"
        })
 
      }
    },
 
    // 选择关系结束
    btnmodules: function() {
      this.setData({
        pract_id: 1,
        context: "我们先来看一下设置面板吧"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
    // 点击出现4练习大冒险
    btnmodule2: function() {
      this.setData({
        pract_id: 3,
        context: "欢迎来到恋习大冒险,我是你的引路人小恋,恋习大冒险是一款通过了解彼此性·格,习惯,三观来增进亲密度的游戏,需要两个人同步答题来完成,下面就让小恋先来和你互相了解一下吧。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数compontpass
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
    // 点击出现好友列表
    btnmodule4: function() {
 
      this.setData({
        pract_id: 5,
        context: "好友列表里显示你邀请过答题的好友,若列表为空,你可以点击游戏下方的邀请好友来邀请他们答题。当有好友希望你继续邀请他闯关时,好友列表像右上方会出现红点,点击好友头像即可至达之前所做的题目。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
 
    },
    // 点击出现矜持一下子
    btnmodule5: function() {
      this.setData({
        pract_id: 6,
        context: "好友列表里显示你邀请过答题的好友,若列表为空,你可以点击游戏下方的邀请好友来邀请他们答题。当有好友希望你继续邀请他闯关时,好友列表像右上方会出现红点,点击好友头像即可至达之前所做的题目。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件",6);
 
    
 
    },
    // 点击出现催促邀请
    btnmodule6: function() {
      this.setData({
        pract_id: 7,
        context: "邀请过你的好友会显示在矜持一点里,点击好友头像下方的【催促邀请】可以催促他继·续邀请你答题"
      })
      var val = this.data.pract_id; //通过这个传递数据
   
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
      // wx.navigateTo({
      //   url: '/pages/endlessMode/cards/cards',
      // })
    },
    // 点击出现体力值
    btnmodule7: function() {
      this.setData({
        pract_id: 8,
        context: "点击【邀请好友】界面会切换到微信好友界面选择你想要一起答题的好友就可以开始冒险啦。现在让小恋先充当一下你的好友。"
      })
      wx.navigateTo({
        url: '/pages/endlessMode/cards/cards',
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
    },
    // 点击出现邀请好友闯关
    btnmodule8: function() {
 
   wx.redirectTo({
     url: '/pages/endlessMode/road/road',
   })
      this.setData({
        pract_id: 9,
        context: "这里显示的是你的初始体力。上限30点,每小时回复一点体力。每次邀请答题扣除6体力。体力值不足时可通过分享到群里来"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
    //点击出现邀请好友
    btnmodule9: function() {
      this.setData({
        pract_id: 10,
        context: "点击这里的(邀请好友闯关】按钮。可邀请好友继续闯关"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
 
 
    },
    // 点击出现好友加入
    btnmodule12: function() {
 
      this.setData({
        pract_id: 13,
        context: "可爱的xXX已经入场了,马上就可以开始答题了。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
 
    },
    // 点击出现倒计时好友进入
    btnmodule13: function() {
      this.setData({
        pract_id: 14,
        context: ". (@>v<9), 3秒倒计时..."
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
 
    },
    // 点击出现阅读倒计时
    btnmodule15: function() {
      this.setData({
        pract_id: 16,
        context: "注意答题倒计时,在倒计时内没有提交答案,创将失败。答题倒计时是90秒减去读题时间得出的。科学分配读题与答题时间非常重要。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
    // 点击出现回顾问题
    btnmodule16: function() {
      this.setData({
        pract_id: 17,
        context: "若在答题时,忘记了故事中的某些点,可以点击向下箭头, 展示题目再次浏览。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    }, // 点击出现发言
    btnmodule17: function() {
      this.setData({
        pract_id: 18,
        context: "在答题时,如果时间充裕,还可以使用发言功能 ,和好友做简短沟通。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
 // 点击出现发言
    btnmodule18: function () {
      this.setData({
        pract_id: 19,
        context: "认真查看对比选项,选择一个你认为的最优的选择。"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
    btnmodule21:function(){
      this.setData({
        pract_id: 22,
        context: "啊,失败了,不要紧,只要有体力,还能继续·闯关"
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
 
    },
    btnmodule24:function(){
      this.setData({
        pract_id: 30,
      })
      var val = this.data.pract_id; //通过这个传递数据
      var myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
      console.log("子组件", this.data.pract_id);
    },
  // 26
  btnmodule26: function () {
 
    this.setData({
      pract_id: 26,
      context: "认真查看对比选项,选择一个你认为的最优的选择。"
    })
    var val = this.data.pract_id; //通过这个传递数据
    var myEventDetail = {
      val: val
    } // detail对象，提供给事件监听函数
    this.triggerEvent('compontpass', myEventDetail) //myevent自定义名称事件，父组件中使用
    console.log("子组件", this.data.pract_id);
 
    }
  },
 
})