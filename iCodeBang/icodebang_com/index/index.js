//index.js
var app = getApp();
var apiRequest = require('../../util/apiRequest.js');
var config = require('../../config.js');
var gScrollList = [];
//获取应用实例
Page({
  scrollList : [],
  data : {
      scrollToView : '0',
      scrollTop: 0
  },
  onLoad: function () {
    var that = this;
    var params = {
      'self'     : 'true',
      'cardfrom' : "selfadd"
    };
    apiRequest.getCards(params, that.showCards);
  },
  
  showCards : function (cardsList) {
      if (cardsList.vcards) {
          for(var i in cardsList.vcards) {
              gScrollList.push(cardsList.vcards[i].id);
              this.scrollList.push(cardsList.vcards[i].id);
          }
      }
      config.debug && console.info("我的名片数据", cardsList);
      var that = this;
      that.setData({
        cardsList:cardsList,
        userInfo: app.globalData.userInfo
      });
  },


  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e) {
    for (var i = 0; i < this.scrollList.length; ++i) {
      if (this.scrollList[i] === this.data.scrollToView) {
        this.setData({
          scrollToView: this.scrollList[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
