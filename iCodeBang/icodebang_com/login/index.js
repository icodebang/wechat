//index.js
//获取应用实例
var app = getApp();
var apiRequest = require('../../util/apiRequest.js');
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
    var that = this;
    if (null != app.globalOradtData.authInfo) {
      wx.redirectTo({url: '/icodebang_com/index/index'});
      return;
    }
    wx.getStorage({
      key: 'loginInfo',
      success: function(res){
        var params = res.data;
        apiRequest.login(params, function (data) {
          app.globalOradtData.authInfo = data;
          wx.setStorage({
            key: 'loginInfo',
            data: params
          });
          wx.switchTab({
                url: '/icodebang_com/index/index',
                success: function(res){
                  console.info(res);
                },
                fail: function() {
                  console.info('fail')
                },
                complete: function() {
                  console.info('----complete')
                }
              });
        });

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });


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
    apiRequest.login(params, function (data) {
      wx.setStorage({
        key: 'loginInfo',
        data: params
      })
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
          });
    });

    return;

  }
})
