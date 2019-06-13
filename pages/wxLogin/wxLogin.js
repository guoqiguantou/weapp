const app = getApp();
import { $request } from "../../utils/util.js"
const {
  $Toast
} = require('../../dist1/base/index');
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    // nav: "",
    phoneshow: false
  },
  onLoad: function (options) {
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log('123', res)
            }
          });
        }
      }
    })

    //微信登录获取code
    wx.login({
      success: res => {
        console.log(res);
        this.wxcode = res.code
      },
      fail: err => {
        $Toast({
          content: "登录失败",
          type: "error"
        })
      }
    })
  },
  //获取用户信息
  bindgetphonenumbers: function (e) {
    console.log(e)
    if (e.detail.encryptedData) {
      if (this.wxcode) {
        let paramJSON = {
          code: this.wxcode,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        };
        wx.request({
          url: `${app.globalData.serverEncry}WeChatLogin`,
          data: {
            code: this.wxcode,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: result => {
            if (result.data.resultCode == 0) {
              $Toast({
                content: '登录成功',
                type: 'success'
              });
              wx.setStorageSync('token', result.data.token);
              if (result.data.groupCount == '0' && result.data.deviceCount == '0') {
                //正式用户且没有塘口且没有设备
                wx.reLaunch({
                  url: '../use/use'
                })
              } else if (result.data.groupCount !== '0' || result.data.deviceCount !== '0') { //正式用户且有塘口或设备
                wx.switchTab({
                  url: '../index/index'
                })
              }
            } else {
              $Toast({
                content: result.data.resultDesc,
                type: 'error'
              });
              console.log(result.data.resultDesc);
            }
          },
          fail: function ({
            errMsg
          }) {
            $Toast({
              content: errMsg,
              type: 'error'
            });
          }
        })
      }
      


    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '授权失败',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }

})