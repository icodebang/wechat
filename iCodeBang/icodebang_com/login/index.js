//index.js
//获取应用实例
var app = getApp();
app.debug && console.info(wx);
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    app.debug && console.info("点击进入人脉页面");
    wx.navigateTo({
      url: '/icodebang_com/relationship/index'
    });
  },
  onLoad: function () {
    if (null != app.globalOradtData.authInfo) {
      wx.redirectTo({url: '/icodebang_com/index/index'});
    }
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  // 用户登陆
  loginOradt : function (e) {
    app.debug && console.info(e);
    var value, msg;
    for (var i in e.detail.value) {
      value = e.detail.value[i];
      if (''!==value) {
        continue;
      }
      switch (i) {
        case 'username' :
            msg = "用户名";
            break;
        case 'password' :
            msg = "密码";
            break;
        default:
            break;
      }

      wx.showModal({
        title: msg + "错误",
        content: msg + "为空或格式错误！",
        showCancel: false,
        confirmText: "确定"
      });
      return false;
    }

    var params = {};
    params.user = e.detail.value.username;
    params.passwd = e.detail.value.password;
    params.type   = 'basic';
    params.ismd5  = '0';
    params.ip     = '127.0.0.1';
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
          app.debug && console.info(app.globalOradtData.authInfo);
          wx.switchTab({
            url: '/icodebang_com/index/index',
            success: function(res){
              console.info(res);
            },
            fail: function() {
              console.info('fail')
            },
            complete: function() {
              console.info('complete')
            }
          })
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
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

  }
})
