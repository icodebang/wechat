//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    app.debug && console.log('人脉页面onLoad');
    if (! app.globalData.userInfo) {
      wx.navigateTo({
        url: 'icodebang_com/index/index',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });

      return;
    }

    var that = this;

    that.setData({
        userInfo:app.globalData.userInfo
      });
  },
  //事件处理函数
  bindViewTap: function() {
    app.debug && console.info("点击进入我页面");
    wx.navigateTo({
      url: '/icodebang_com/index/index'
    });
  }
})
