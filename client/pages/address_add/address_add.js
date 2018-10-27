Page({
    data:{
        height: 20,
        focus: false,
        userId: 0,
        cartArr: [],
    },

    onLoad: function (options) {
      console.log("The new userId is: ", options.userId);
      var that = this;
      var flag = false;
      flag = options.flag;
      that.userId = options.userId;
      that.setData({
        userId: options.userId
      })
    },

    formSubmit:function(e) {
      var warn = "";
      var that = this;
      var flag = false

      if(e.detail.value.namearea == ""){
        warn = "请填写您的姓名！";
      }
      else if(e.detail.value.phonearea == ""){
        warn = "请填写您的手机号！";
      }
      else if(e.detail.value.addressarea == ""){
        warn = "请输入您的地址！";
      }
      else{
        flag = true
        //提交给mock
        wx.request({
          url: 'https://www.easy-mock.com/mock/5bd1b21a5e38a677f659a8b9/example/newAddress',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            userId: that.userId,
            carArr: [{
              name: e.detail.value.namearea,
              phone: e.detail.value.phonearea,
              decom: e.detail.value.addressarea
            }]
          },
          success(res){
            console.log(res.data)
          }
        })

        wx.redirectTo({
          url: '../address_select/address_select?userId=' + that.userId
        })
      }

      if (flag == false) {
        wx.showModal({
          title: '提示',
          content: warn
        })
      }
    }
})