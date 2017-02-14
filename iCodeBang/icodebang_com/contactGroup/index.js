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
    groupList: [
      {
          id    : "",
          name  : "全 部",
          open  : false,
          cards : [],
          isCardLoaded : false
      }
    ],
    cardList : [],
    openGroupId : null
  },
  /**
   * 默认显示名片分组
   */
  showGroup : function (groupList) {
      config.debug && console.info(groupList);
      var that = this;
      if (typeof(groupList.groups)!='object' || groupList.groups.length==0) {
        // 没有名片数组
        return;
      }
      groupList = groupList.groups;
      for(var i=0; i<groupList.length; i++) {
        this.data.groupList.push({
          id    : groupList[i].groupid,
          name  : groupList[i].group,
          open  : false,
          cards : [],
          isCardLoaded : false
        });
      }
      this.setData({
        groupList:this.data.groupList
      });
  },
  /**
   * 点击名片分组， 展开当前分组, 加载当前分组名片
   */
  toggleGroup: function (e) {
    var id = e.currentTarget.id, list = this.data.groupList;
    for (var i = 0, len = this.data.groupList; i < len; ++i) {
      this.data.groupList[i].open = this.data.groupList[i].id == id ? !this.data.groupList[i].open : false;
    }
    this.loadCardsInGroup(id);
  },
  /**
   * 获取名片分组内的名片
   */
  loadCardsInGroup : function (groupId) {
    var params = {cardgroupid : groupId, self : 'false'};
    for (var i = 0, len = this.data.groupList.length; i < len; i++) {
      this.data.groupList[i].open = this.data.groupList[i].id == groupId ? !this.data.groupList[i].open : false;
    }
    apiRequest.getCards(params, this.showGroupCards);
  },
  /**
   * 显示名片分组内的名片
   */
  showGroupCards : function (cardsList) {
      if (typeof(cardsList.vcards)!='object') {
        // 没有名片
        cardsList.vcards = {};
      }
      config.debug && console.info(cardsList);
      this.setData({
        groupList : this.data.groupList,
        cardList  : cardsList
      });
  }
})
