var config = require('./config.js');
const openIdUrl = config.openIdUrl;
var checkOpenIdUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=%APPID%&secret=%SECRET%&js_code=%JSCODE%&grant_type=authorization_code";

App({
  apiUrls : config.apiUrls,

  onLaunch: function () {
    console.log('App Launch');
    return;
  },
  onShow: function () {
    console.log('App Show')
    var that = this;
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo : null
  },
  globalOradtData : {
    hasLogin : false,
    authInfo : null
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      config.debug && console.info(new Date().getTime());
      //调用登录接口
      wx.login({
        success: function (result) {
          config.debug && console.info(result);
          wx.getUserInfo({
            success: function (res) {
              config.debug && console.info(res);
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
              config.debug && console.info(new Date().getTime());
            }
          })
        }
      })
    }
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          config.debug && console.info(data);
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
  
})
