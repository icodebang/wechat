var app = getApp();
Page({
  onLoad : function () {
  },
  data: {
    list: [
      { name  : "常见问题", url  : "faq" },
      { name  : "关于我们", url  : "about" },
    ]
  },

// 退出登录
  logout : function () {
    app.globalOradtData.authInfo = null;
    wx.clearStorage({key: 'loginInfo'});
    wx.redirectTo({url: '/icodebang_com/login/index'});
  }
})
