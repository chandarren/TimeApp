var sendRequest=function(url,method,data={}){
  wx.showLoading({
    title: '加载中',
  })
  var promise=new Promise(function(resolve,reject){  
    wx.request({
      url: url,
      data: data,      
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: method,
      success:function(data){
        wx.hideLoading();
        resolve(data);
      },
      fail:function(data){
        wx.hideLoading();
        reject(data);
      }      
    })
  })

  return promise
}

module.exports={
  sendRequest:sendRequest
}