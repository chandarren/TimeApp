
function wxLogin(isFromShare,isFromShareApp,pushcode,url,cb) {      
    wx.login({
      success: function(res_login) {
        if (res_login.code) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            data: {
              "action": "getopenid",
              "code": res_login.code
            },
            url: url+'/Interface/WeChat.ashx',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success(res_get_openid) {
              if (res_get_openid.data.status == 1) {
                // console.log(res_get_openid.data);
                // console.log('调用getopenid返回:' + res_get_openid.data.data);
                // console.log('openid'+ res_get_openid.data.data.openid);
                wx.setStorageSync("openId", res_get_openid.data.data.openid);
                wx.setStorageSync("sessionKey", res_get_openid.data.data.openid);
                wx.request({
                  data: {
                    "action": "wxlogin",
                    "wxsmid": res_get_openid.data.data.openid
                  },
                  url: url+'/Interface/WeChat.ashx',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success(resWXLogin) {   
                    //console.log(resWXLogin.data);                                     
                    wx.getSetting({
                      success: function (res_get_set) {
                        if (res_get_set.authSetting['scope.userInfo']) {
                          wx.getUserInfo({
                            success: function (res_get_userinfo) {
                              //console.log(resWXLogin.data);                              
                              if (resWXLogin.data.status == 1) { //该用户已注册过
                                //console.log('已注册' + 'userID为:' + resWXLogin.data.data.id);
                                wx.setStorageSync("userId", resWXLogin.data.data.id);                                
                                wx.setStorageSync("theuserinfo", resWXLogin.data.data);
                              } else { //该用户未注册过
                              //console.log('未注册过')
                                wx.request({
                                  data: {
                                    "action": "wxreg_user",
                                    "wxsmid": res_get_openid.data.data.openid,
                                    "sessionKey": res_get_openid.data.data.session_key,
                                    "iv": res_get_userinfo.iv,
                                    "encrypData": res_get_userinfo.encryptedData,
                                    "nickname": res_get_userinfo.userInfo.nickName,
                                    "avator": res_get_userinfo.userInfo.avatarUrl,
                                    "pushcode":pushcode,
                                    "scene": wx.getStorageSync("scene"),
                                    "pushpar":wx.getStorageSync("pushpar")
                                  },
                                  url: url+'/Interface/WeChat.ashx',
                                  header: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                  },
                                  method: "POST",
                                  success(resWXRegUser) {
                                    //console.log(resWXRegUser.data);
                                    wx.setStorageSync("userId", resWXRegUser.data.data.id);
                                    //userid = resWXRegUser.data.data.id;
                                    //console.log('用户ID为:' + resWXRegUser.data.data.id);                                    
                                    wx.setStorageSync("theuserinfo", resWXRegUser.data.data);                             
                                  }
                                })                                                                
                              }
                              cb(isFromShare, isFromShareApp);                              
                            }
                          })
                        }
                      }
                    })
                    
                  }
                })
              }
            }
          })
        }
      }
    })   
}

module.exports = {
  wxLogin
}