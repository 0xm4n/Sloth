//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    infoComfirmed:false,
    logged: false,
    userinfo: [],
    motto: 'Hello World',
    userInfo: {},
    userId: 0,
    food_order_id: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modules: [{
        "name": "代买早餐",
        "src": "../../images/1.png",
        "url": "../takeBreakfastOrder/takeBreakfastOrder"
      },
      {
        "name": "代拿快递",
        "src": "../../images/2.png",
        "url": "../takePackageOrder/takePackageOrder"
      },
      { 
        "name": "跑腿",
        "src": "../../images/3.png",
        "url": "../takeLegsworkOrder/takeLegsworkOrder"
      },
      {
        "name": "代课",
        "src": "../../images/4.png",
        "url": "../takeSubstituteClassOrder/takeSubstituteClassOrder"
      },
      {
        "name": "兼职",
        "src": "../../images/5.png",
        "url": "../partTimeList/partTimeList"
      },
      {
        "name": "其他下单",
        "src": "../../images/6.png",
        "url": "../otherOrder/otherOrder"
      }
    ],
    //dormitory映射楼栋信息
    dormitory:[
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9",
      "C10",
      "c11",
      "c12",
      "c13",
      "c14",
      "c15",
    ],
    order: []
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: config.service.take_order_homeUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        that.setData({
          // order1: res.data.data.data1,
          // order2: res.data.data.data3,
          // order3: res.data.data.data2,
          // order4: res.data.data.data4
          order: res.data.data.data,
        });
      }
    })
  },

  checklogin: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userId:res.data.openId,
          userinfo: res.data,
          logged: true
        })
        wx.getStorage({
          key: 'user_myinfo',
          success: function (res) {
            console.log("从缓存读取信息： " + res.data)
            if (res.data.user_name != 0) {
              that.setData({
                infoComfirmed: true
              })
              console.log("已完善信息")
            } else {
              that.showinfowarning()
            }
          },
          fail: function () {
            wx.request({
              url: config.service.getUserInfoUrl + '?user_id=' + that.data.userinfo.openId,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              success(res) {
                console.log("从数据库读取: " + res.data.data.data)
                if (res.data.data.data.user_name != 0) {
                  that.setData({
                    infoComfirmed: true
                  })
                  wx.setStorage({
                    key: 'user_myinfo',
                    data: res.data.data.data,
                  })
                  console.log("已完善信息")
                } else {
                  that.showinfowarning()
                }
              },
            })
          }
        })
      }
    })
  },

  onShow:function(){
    this.checklogin()
  },


  submit_take0: function(e) {
    var that = this;
    if (!that.data.logged) {
      that.showloginwarning()
    } else {
      if(!that.data.infoComfirmed){
        that.showinfowarning()
      }else{
        wx.showModal({
          title: '确认订单',
          content: '点击确定接受订单',
          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
              console.log('用户点击确定')
              console.log(e.currentTarget.dataset.index);
              var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
              var data = that.data.order;
              console.log("item")
              console.log(item)
              that.setData({
                order: data
              }),
                wx.request({
                  url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userId + "&order_type=0",
                  method: "GET",
                  header: {
                    "content-type": "application/json"
                  },
                  success: function (res) {
                    console.log(item[0].order_id)
                    wx.navigateTo({
                      url: "../InfoBreakfast/InfoBreakfast?order_id=" + item[0].order_id,
                    })
                  }
                })
            } else { //这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  submit_take1: function (e) {
    var that = this;
    if (!that.data.logged) {
      that.showloginwarning()
    } else {
      if (!that.data.infoComfirmed) {
        that.showinfowarning()
      }else{
        wx.showModal({
          title: '确认订单',
          content: '点击确定接受订单',
          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
              console.log('用户点击确定')
              console.log(e.currentTarget.dataset.index);
              var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
              var data = that.data.order;
              console.log("item")
              console.log(item)
              that.setData({
                order: data
              }),
                wx.request({
                  url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userId + "&order_type=1",
                  method: "GET",
                  header: {
                    "content-type": "application/json"
                  },
                  success: function (res) {
                    console.log(item[0].order_id)
                    wx.navigateTo({
                      url: "../InfoPackage/InfoPackage?order_id=" + item[0].order_id
                    })
                  }
                })

            } else { //这里是点击了取消以后
              console.log('用户点击取消')

            }
          }
        })
      }
    }

  },
  submit_take2: function (e) {
    var that = this;
    if (!that.data.logged) {
      that.showloginwarning()
    } else {
      if (!that.data.infoComfirmed) {
        that.showinfowarning()
      }else{
        wx.showModal({
          title: '确认订单',
          content: '点击确定接受订单',
          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
              console.log('用户点击确定')
              console.log(e.currentTarget.dataset.index);
              var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
              var data = that.data.order;
              console.log("item")
              console.log(item)
              that.setData({
                order: data
              }),
                wx.request({
                  url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userId + "&order_type=2",
                  method: "GET",
                  header: {
                    "content-type": "application/json"
                  },
                  success: function (res) {
                    console.log(item[0].order_id)
                    wx.navigateTo({
                      url: "../InfoLegwork/InfoLegwork?order_id=" + item[0].order_id
                    })
                  }
                })

            } else { //这里是点击了取消以后
              console.log('用户点击取消')

            }
          }
        })

      }
    }
  },
  submit_take3: function (e) {
    var that = this;
    if (!that.data.logged) {
     that.showloginwarning()
    } else {
      if (!that.data.infoComfirmed) {
       that.showinfowarning()
      }else{
        wx.showModal({
          title: '确认订单',
          content: '点击确定接受订单',
          success: function (res) {
            if (res.confirm) { //这里是点击了确定以后
              console.log('用户点击确定')
              console.log(e.currentTarget.dataset.index);
              var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
              var data = that.data.order;
              console.log("item")
              console.log(item)
              that.setData({
                order: data
              }),
                wx.request({
                  url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userId + "&order_type=3",
                  method: "GET",
                  header: {
                    "content-type": "application/json"
                  },
                  success: function (res) {
                    console.log(item[0].order_id)
                    wx.navigateTo({
                      url: "../InfoSubstitute/InfoSubstitute?order_id=" + item[0].order_id
                    })
                  }
                })
            } else { //这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: config.service.take_order_homeUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        that.setData({
          // order1: res.data.data.data1,
          // order2: res.data.data.data3,
          // order3: res.data.data.data2,
          // order4: res.data.data.data4
          order: res.data.data.data,
        });
      }
    })
    wx.stopPullDownRefresh();
},

  showinfowarning:function(){
    wx.showModal({
      title: '您的信息未完善!',
      content: '请先完善信息',
      confirmText: '去完善',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../myInfo/myInfo',
          })
        }
      }
    })
  },
  showloginwarning:function(){
    wx.showModal({
      title: '您未登录！',
      content: '登录体验更多功能',
      confirmText: '去登录',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../homeMy/homeMy',
          })
        }

      }
    })
  }

  
})