Page({
  data:{
      cartArr:[],
      userId:0
  },
  onLoad:function(options){
    console.log(options.userId);
    var that = this;
    that.userId = options.userId;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bcacf2773057966af1d630b/address',
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      method:"POST",
      data: {
        userId:options.userId
      },
      success:function(res){
        that.setData({
          cartArr:res.data.address_list
        })
      }
    })
  },
})