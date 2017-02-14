var app = getApp();
var config = require('../config.js');
var apiRequest = {
    login : function (params, callback) {
        wx.request({
          url: config.apiUrls.login,
          data: params,
          dataType : 'json',
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          header : {'content-type' : 'application/x-www-form-urlencoded'},
          success: function(res){
            config.debug && console.info(res);
            if (res.data.body) {
              typeof(callback)=='function' && callback(res.data.body);
            } else {
              var msg = undefined === res.data.head.error ? "未知错误" : res.data.head.error;
              wx.showModal({
                title: "登录失败",
                content: res.data.head.error.description,
                showCancel: false,
                confirmText: "重新登录"
              });
              return;
            }
          },
          fail: function() {},
          complete: function() {}
        });
  },

  /**
   * 根据参数获取名片数据
   */
  getCards : function (params, callback, failCallback) {
        this.getJson (config.apiUrls.getCard, params, callback, failCallback);
  },

  getCardGroups : function (params, callback, failCallback) {
    this.getJson (config.apiUrls.getCardGroup, params, callback, failCallback);
  },

  /**
   * 公用GET请求，响应类型为json
   */
  getJson : function (url, params, callback, failCallback) {
        wx.request({
          url: url,
          data: params,
          dataType : 'json',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'AccessToken' : app.globalOradtData.authInfo.accesstoken,
              'content-type' : 'application/x-www-form-urlencoded'
          },
          success: function(res){
            config.debug && console.info(url, params, res);
            if (res.data.body) {
              typeof(callback)=='function' && callback(res.data.body);
            } else {
              var msg = undefined === res.data.head.error ? "未知错误" : res.data.head.error;
              typeof(failCallback)=='function' ? failCallback(msg)  :      wx.showModal({
                title: "获取数据失败",
                content: res.data.head.error.description,
                showCancel: false,
                confirmText: "重 试"
              });
              return;
            }
          },
          fail: function() {},
          complete: function() {}
        });

  } // end getJson

}

module.exports = apiRequest;
