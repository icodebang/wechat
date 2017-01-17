var app = getApp();
var apiRequest = {
    login : function (params) {
        wx.request({
          url: app.apiUrls.login,
          data: params,
          dataType : 'json',
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          header : {'content-type' : 'application/x-www-form-urlencoded'},
          success: function(res){
            app.debug && console.info(app.apiUrls.login, params, res);
            if (res.data.body) {
              app.globalOradtData.authInfo = res.data.body;

              wx.redirectTo({url: '/icodebang_com/test/index'});
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

  getCards : function (params, callback) {
        wx.request({
          url: app.apiUrls.getCard,
          data: params,
          dataType : 'json',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'AccessToken' : app.globalOradtData.authInfo.accesstoken,
              'content-type' : 'application/x-www-form-urlencoded'
          },
          success: function(res){
            app.debug && console.info(app.apiUrls.getCard, params, res);
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

  }

}

module.exports = apiRequest;
