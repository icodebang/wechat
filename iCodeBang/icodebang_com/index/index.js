//index.js
var app = getApp();
var apiRequest = require('../../util/apiRequest.js');
var config = require('../../config.js');
//获取应用实例
Page({
  onLoad: function () {
    var that = this;
    var params = {
      'self' : 'true'
    };
    apiRequest.getCards(params, that.showCards);
  },
  
  showCards : function (cardsList) {
      config.debug && console.info(cardsList);
      var that = this;
      that.setData({
        cardsList:cardsList,
        userInfo: app.globalData.userInfo
      });
  }
})
