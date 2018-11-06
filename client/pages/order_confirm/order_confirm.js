var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

// pages/order_confirm/order_confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer: [],
    shop: {},
    selected: 0,
    orders: [],
    cost: 0,
    cartArr: [],
    userId:0,
    shop_id: 0,
    addr_id:0,
    cust_addr:'',
    cust_name:'',
    cust_phone:'',
    // remark : "口味偏好等要求",
    ShowAddrList: false,
    i:0,
    j:0,
    k:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 试着用easy-mock测试
    var that = this;
    // 从缓存中得到订单信息
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        console.log("读入shop")
        console.log(res)
        that.setData({
          shop: res.data
        })
      },
    });
    wx.getStorage({
      key: 'selected_addr',
      success: function (res) {
        console.log("读入addr_id")
        console.log(res)
        that.setData({
          addr_id: res.data
        })
      },
    });
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log("读入userinfo")
        console.log(res)
        that.setData({
          userId: res.data.openId
        }),
        wx.request({
          url: config.service.address_selectUrl + "?user_id=" + that.data.userId,
          method: "GET",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res);
            that.setData({
              customer: res.data.data
            });
          }
        });
      },
    });
    wx.getStorage({
      key: 'list',
      success: function (res) {
        that.setData({
          orders: res.data
        })
      },
    });
    wx.getStorage({
      key: 'cost',
      success: function (res) {
        that.setData({
          cost: res.data
        })
      },
    });
    wx.getStorage({
      key: 'id',
      success: function (res) {
        console.log("读入shopid")
        console.log(res)
        that.setData({
          shop_id: res.data,
          // remark:options.remark
        })
      },
    });
    // that.setData({
    //   remark:options.remark,
    // });
    for(var i=0;i<this.data.customer.length;i++){
      if(customer[i].default_id==1){
        that.setData({
          selected:i,
        });
      }
    }

  },
  

  settleOrder: function (e) {
    console.log("提交订单，向服务器上传订单")
    var that = this;
    console.log(that.data.orders);
    wx.request({
      url: config.service.settleOrderUrl + "?orders=" + JSON.stringify(that.data.orders) + "&shop_id=" + that.data.shop_id + "&cost=" + that.data.cost + "&user_id=" + that.data.userId + "&addr_id=" + that.data.addr_id,
      method: "GET",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function (e) {
      wx.navigateTo({
        url: '../order_list/order_list'
      })
    }, 2000)
  },

  ShowAddrList: function (e) {
    this.setData({
      ShowAddrList: !this.data.ShowAddrList
    });
  },

  HideAddrList: function (e) {
    this.setData({
      ShowAddrList: false
    });
  },

  radioChange: function (e) {
    this.setData({
      ShowAddrList: false
    });
  },

  addrchange: function (e) {
    var that = this;
    for(var j=0;j<this.data.customer.length;j++){
      if(this.data.customer[j].default_id==1){
        this.setData({
          /** 这里需要把原有的default=1的那个改为零*/
        });
      }
    }
    this.setData({
      ShowAddrList: false,
    });
    for(var k=0;k<this.data.customer.length;k++){
      if(this.data.customer[k].addr_id==e.currentTarget.dataset.id){
        this.setData({
          /** 这里需要把新选的default变为1*/
          selected:k,
        });
        wx.setStorage({
          key: "selected_addr",
          data: k,
          success: function (res) {
            console.log("selected_addr setStorage success");
          }
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})