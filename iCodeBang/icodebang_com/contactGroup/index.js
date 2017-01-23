var app = getApp();
var apiRequest = require('../../util/apiRequest.js');
var config = require('../../config.js');

Page({
  onLoad : function () {
    var that = this;
    var params = {
      'self' : 'true'
    };
    apiRequest.getCardGroups(params, that.showGroup);
  },
  data: {
    list: [
      {
        id: 'api',
        name: '开放接口',
        open: false,
        pages: [
          {
            zh: '微信登录',
            url: 'login/login'
          }, {
            zh: '获取用户信息',
            url: 'get-user-info/get-user-info'
          }
        ]
      }
    ]
  },
  showGroup : function (groupList) {
      config.debug && console.info(groupList);
      var that = this;
      if (typeof(groupList.groups)!='object' || groupList.groups.length==0) {
        // 没有名片数组
        return;
      }
      groupList = groupList.groups;
      for(var i=0; i<groupList.length; i++) {
        this.data.push({
          id    : groupList[i].groupid,
          name  : groupList[i].group,
          open  : false,
          cards : [],
          isCardLoaded : false
        });
      }
      this.setData({
        groupList:groupList
      });
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      list[i].open = list[i].id == id ? !list[i].open : false;
    }
    this.setData({
      list: list
    });
  }
})
