const openIdUrl = require('./config').openIdUrl;
var debug = true;
var checkOpenIdUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=%APPID%&secret=%SECRET%&js_code=%JSCODE%&grant_type=authorization_code";

var apiBaseUrl = "http://192.168.30.191:9999/";
var apiUrls = {
  login    : apiBaseUrl + "oauth",
  getCard  : apiBaseUrl + "contact/vcard"
};

App({
  debug : debug,
  apiUrls : apiUrls,

  onLaunch: function () {
    console.log('App Launch');
    if (null != this.globalOradtData.authInfo) {
      wx.redirectTo({url: '/icodebang_com/index/index'});
    }
  },
  onShow: function () {
    console.log('App Show')
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
      debug && console.info(new Date().getTime());
      //调用登录接口
      wx.login({
        success: function (result) {
          debug && console.info(result);
          wx.getUserInfo({
            success: function (res) {
              debug && console.info(res);
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
              debug && console.info(new Date().getTime());
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
          debug && console.info(data);
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
