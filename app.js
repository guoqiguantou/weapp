//app.js
App({
  onLaunch: function () {

    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       wx.setStorageSync("wxCode", res.code)
    //       //发起网络请求    
    //       console.log(res.code)
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
    wx.loadFontFace({
      family: 'Lato-Bold',
      source: 'url("http://cj.datasurge.cn:8080/guangxian/font/Lato-Bold.ttf")',
      success: function (res) {
        //console.log(res.status) //  loaded
      },
      fail: function (res) {
        console.log('字体加载失败', res.status) //  error
      },
      complete: function (res) {
        //console.log(res.status);
      }
    });
  },
  buttonClicked: function (self) {
    self.setData({
      buttonClicked: true
    })
    setTimeout(function () {
      self.setData({
        buttonClicked: false
      })
    }, 1000)
  },
  globalData: {
    token: null,
    serverWJ: 'https://cj.datasurge.cn:9095/', //账号密码登录
    //serverWJ:'https://cj.datasurge.cn:6789/',
    serverHYH: 'https://cj.datasurge.cn:11110/', //塘口
    serverLKJ: 'https://cj.datasurge.cn:9091/', //设备
    serverEncry: "https://cj.datasurge.cn:9089/", //微信第三方登录
    //serverEncry: "https://cj.datasurge.cn:9876/", //微信第三方登录
    serverWeather: "https://cj.datasurge.cn:9688/",//天气
    serverFarm: "https://cj.datasurge.cn:9092/",//农事
    serverWorker: "https://cj.datasurge.cn:9093/", //员工 
    serverBook: "https://cj.datasurge.cn:9401/",//账本
    server9696: "https://cj.datasurge.cn:9696/",//成本支出

    //serverWJ: 'http://192.168.3.210:9095/', //账号密码登录
    //serverHYH: 'http://192.168.3.210:11110/', //塘口
    //serverLKJ: 'http://192.168.3.125:9091/', //设备
    //serverEncry: "http://192.168.3.125:9089/", //微信第三方登录
    //serverWeather: "http://192.168.3.210:9688/",//天气
    //serverWorker: "http://192.168.3.189:9093/", //员工
    //serverBook: "http://192.168.3.125:9401/",//账本
  },
})