//app.js
App({
  globalData: {
    // img:'http://p.m.fans-me.com/VegaImg/'
    img:'/images/',
    korjoImg:'https://www.korjo.cn',
    media:'https://www.korjo.cn',
    userInfo:null,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        wx.request({
          url: 'https://www.korjo.cn/KorjoApi/GetSessionKey', //仅为示例，并非真实的接口地址
          data: {
            id: 36,
            js_code: code
          },
          method:'GET',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          complete: function(res) {
            // this.globalData.openid = res.data.openid
            console.log('codecode',res.data)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success:function(res){
        var SDKVersion = parseFloat(res.SDKVersion)
        if(SDKVersion < 1.5){
          console.log('banben')
        wx.showModal({
          title: '提示',
          content: '当前版本过低，部分功能无法使用，请升级到最新版本。',
          success: function(res) {
          }
        })

        }
        
      }
    })


  }
  
})