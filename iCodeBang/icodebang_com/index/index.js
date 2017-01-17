//index.js
var app = getApp();
var apiRequest = require('../../util/apiRequest.js');
//获取应用实例
console.info(apiRequest);
Page({
  onLoad: function () {
    var that = this;
    var params = {
      'self' : 'true'
    };
    apiRequest.getCards(params, that.showCards);
  },
  
  showCards : function (cardsList) {
      app.debug && console.info(cardsList);
      var that = this;
      that.setData({
        cardsList:cardsList,
        userInfo: app.globalData.userInfo
      });
      console.info(app.globalData.userInfo);
  }
})
