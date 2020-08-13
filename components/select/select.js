// components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 下拉菜单
    shixiaoval: '时效',
    typeval: '类型',
    zhouqival: '周期',
    orderval: '排序',
    shixiaokey:0,
    typekey: 0,
    zhouqikey: 0,
    orderkey:'asc'
  },
  isShow: true,
  currentTab: 0,
  
  /**
   * 组件的方法列表
   */
  methods: {
    // 下拉切换
    hideNav: function () {
      this.setData({
        displays: "none"
      })
    },
    // 区域
    tabNav: function (e) {
      this.setData({
        displays: "block"
      })
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } 
      else {
        var showMode = e.target.dataset.current == 0;
        this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
        })
      }
    },
    // 下拉切换中的切换
    // 过期
    selected: function (e) {
      this.setData({
        shixiaokey:e.target.dataset.num,
        shixiaoval: e.target.dataset.name,
        displays: "none"
      });
      this.triggerEvent("shixiao",{
        shixiaokey:e.target.dataset.num,
        shixiaoval: e.target.dataset.name,
      })
    },
    // 下拉切换中的切换
    // 类型
    clickSum: function (e) {
      this.setData({
        typekey: e.target.dataset.num,
        typeval: e.target.dataset.name,
        displays: "none"
      });
      this.triggerEvent("type",{
        typekey: e.target.dataset.num,
        typeval: e.target.dataset.name,
      })
    },
    //周期
    clickzhouqi:function (e) {
      this.setData({
        zhouqikey: e.target.dataset.num,
        zhouqival: e.target.dataset.name,
        displays: "none"
      });
      this.triggerEvent("zhouqi",{
        zhouqikey: e.target.dataset.num,
        zhouqival: e.target.dataset.name,
      })
    },
      // 排序
    choseTxtColor: function (e) {
      this.setData({
        orderkey: e.target.dataset.num,
        orderval: e.target.dataset.name,
        displays: "none"
      });
      this.triggerEvent("paixu",{
        orderkey: e.target.dataset.num,
        orderval: e.target.dataset.name,
      })
    },
    clean(){
      this.setData({
        shixiaoval: '时效',
        typeval: '类型',
        zhouqival: '周期',
        orderval: '排序',
        shixiaokey: 0,
        typekey: 0,
        zhouqikey: 0,
        orderkey: 'asc',
        currentTab:-1        
      })      
    }
  }
})
