// pages/more/more.js
const {
  $Toast
} = require('../../dist1/base/index');
const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,
    visible: false,
    actions: [{
      name: '确定',
      color: '#ed3f14'
    }],
    actions2: [{
      name: '确定',
      color: '#ed3f14'
    }],
    wxlogin:false,
    loginMethod: ""
    //登录方式 0----微信登录 ；1----手机号登录；2----手机号与微信关联后
  },
  //退出登录
  handleClick() {
    this.setData({
      visible: true,
    });
  },
  //点击取消
  handleCancel() {
    this.setData({
      visible: false,
      visible2: false
    });
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      this.setData({
        wxlogin: false
      })
      wx.login({
        success: res => {
          let paramJSON = {
            code: res.code,
            avatarUrl: e.detail.userInfo.avatarUrl,
            city: e.detail.userInfo.city,
            country: e.detail.userInfo.country,
            gender: e.detail.userInfo.gender,
            language: e.detail.userInfo.language,
            nickName: e.detail.userInfo.nickName,
            province: e.detail.userInfo.province,
          }
          util.$request({
            url: app.globalData.serverEncry + 'updateWeChatOpenId',
            params: paramJSON
          }).then(result => {
            if (result.data.resultCode == "0016") {
              $Toast({
                content: result.data.resultDesc,
                type: 'error'
              })
            } else {
              $Toast({
                content: "绑定成功",
                type: 'success'
              })
              // this.setData({
              //   loginMethod: "wt"
              // })
            }
          }).catch(error => {
            $Toast({
              content: '绑定失败',
              type: 'error'
            });
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '授权失败',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  handleClickItem() {
    const action = this.data.actions;
    action[0].loading = true;
    this.setData({
      actions: action
    });
    wx.clearStorage();
    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        visible: false,
        actions: action
      });
      wx.reLaunch({
        url: '../login/login'
      })
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success:(isValidate)=>{
        if (isValidate.authSetting['scope.userInfo']) {
          this.setData({
            wxlogin: false
          })
        }else{
          this.setData({
            wxlogin: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})