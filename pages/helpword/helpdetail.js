// pages/helpword/helpdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myquestion:'',
    myanswer:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.ttype);
    if(options.ttype == 11){
      that.setData({
        myquestion:'为什么我收不到消息通知？',
        myanswer:'微信小程序规则调整后，发送订阅信息，需要向用户提出申请，用户接受后才能推送成功，一次申请推送一条。为了方便你能准确收到订阅消息，请记得接收通知。'
      })
    }
    else if(options.ttype == 12){
      that.setData({
        myquestion:'我拒绝了消息申请，再也收不到了怎么办？',
        myanswer:'如果在申请接收订阅消息时，你点了【取消】，消息就会推送失败，如果你希望收到消息这时你可以点击小程序右上角的【···】图标，进入【设置】窗口，在这里你可以开启或关闭【订阅消息】。'
      })
    }
    else if(options.ttype == 13){
      that.setData({
        myquestion:'我不想收到微信小程序/公众号提醒通知，怎么做？',
        myanswer:'在【我的】中找到并点击【提醒设置】，默认提醒等同于小程序提醒，将默认开关、公众号提醒开关关闭后，系统将不再通过以上两种方式向你推送消息。'
      })
    }
    else if(options.ttype == 14){
      that.setData({
        myquestion:'打开了邮箱提醒按钮却没有通过邮箱获取到提醒信息？',
        myanswer:'在【我的】界面点击头像部分编辑，进行邮箱等信息绑定，成功绑定邮箱后，会在事件临近期限根据用户设置的事件提醒时间进行推送提醒。'
      })
    }
    else if(options.ttype == 21){
      that.setData({
        myquestion:'什么是语音/短信提醒？',
        myanswer:'短信/语音提醒是时刻记中给用户提供的一种特殊提醒方式，小程序会通过让用户做一些任务赠送语音/短信条数，在提醒时会通过消耗短信/语音条数对用户进行短信/电话通知。'
      })
    }
    else if(options.ttype == 22){
      that.setData({
        myquestion:'怎样获得语音/短信条数？',
        myanswer:'2.获取语音短信有以下几种方式：通过点击【我的】界面找到推广码分享好友，通过邀请好友使用可以获得条数奖励，每成功邀请一人可获得5条短信及语音提醒条数。更多获取提醒条数方法，请关注公众号【时刻记】'
      })
    }
    else if(options.ttype == 31){
      that.setData({
        myquestion:'什么是提醒事件？',
        myanswer:'1.提醒事件是用户添加的诸如生日、纪念日、计划安排和备忘录等信息，在事件临近期限系统会根据用户设置的事件提醒时间进行推送提醒，用户等级不一样，可创建的提醒事件不同。'
      })
    }
    else if(options.ttype == 32){
      that.setData({
        myquestion:'如何提升创建事件次数？',
        myanswer:'可通过完成【首页】中的【任务列表】中的任务来提升提醒数量，提升事件次数无上限（最终解释权归时刻记小程序所有）。'
      })
    }
    else if(options.ttype == 51){
      that.setData({
        myquestion:'如何设置邮箱提醒？',
        myanswer:'添加事件时，提醒方式勾选“邮件”,提醒时系统将自动通过邮件的方式告知；如若未绑定邮件，可通过【我的】中点击的用户头像，修改个人资料，绑定有效邮箱即可。'
      })
    }
    else if(options.ttype == 52){
      that.setData({
        myquestion:'如何设置短信提醒？',
        myanswer:'添加事件时，提醒方式勾选“短信”,提醒时系统将自动通过短信的方式告知；使用前请先绑定手机号，如若未绑定手机号，可通过【我的】中点击用户头像，修改个人资料，绑定有效手机号即可；若短信余额不足，请通过邀请好友或其它方式获取短信额度；为保证您的短信及时送达，系统请勿设置该类信息的拦截。'
      })
    }
    else if(options.ttype == 53){
      that.setData({
        myquestion:'如何设置语音提醒？',
        myanswer:'添加事件时，提醒方式勾选“语音”,提醒时系统将自动通过语音电话的方式告知；使用前请先绑定手机号，如若未绑定手机号，可通过【我的】中点击用户头像，修改个人资料，绑定有效手机号即可；若语音余额不足，请通过邀请好友或其它方式获取短信额度'
      })
    }
    else{
      that.setData({
        myquestion:'什么是共享提醒？',
        myanswer:'通过分享【列表】中需要共享的事件，查看详细，点击分享按钮分享给好友，邀请加入共享提醒，好友可免创建共享自己设置的提醒事件。'
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