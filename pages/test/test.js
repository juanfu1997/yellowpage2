// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        img: getApp().globalData.img,
        korjoImg:getApp().globalData.korjoImg,
  },
  submit(){
    var that = this
    var list_data = that.data.list_data
    var open_time = that.data.open_time
    var wechat = that.data.wechat
    var store_img = that.data.store_img
    var store_video = that.data.store_video

    list_data.yellow_pagesid = that.data.yellow_pagesid
    list_data.typeid = that.data.typeid

    if(wechat.name || wechat.http){
      
      if(!wechat.name || !wechat.http){
        $.alert('请把公众号及链接补充完整')
      }
      if(wechat.name && wechat.http){
        list_data.wxpublic = wechat.name+'!'+wechat.http
        // $.alert(list_data.wxpublic)
        that.setData({list_data})
      }
    }


    let time
    if((open_time.open&&open_time.close)|| (!open_time.open && !open_time.close)){
      if(open_time.open&&open_time.close){
        time = open_time.open+'-'+open_time.close
      }else{
        time = ''
      }
      list_data.time = time
      let list_full =true
      $.each(list_data,(i,v) => {
          if(i=='yellow_pagesid'||i=='typeid'||i=='business_name'||i=='phone'||i=='address'){
            if(!v){
                list_full =false
                console.log('1',i,v)
                return;
              }
          }
            })
      if(list_full){
        var url = 'https://www.korjo.cn/TimeApi/SaveBusinessPhoneInfo'
        var type="POST"
        // list_data.image = store_img = JSON.stringify(store_img)
        // list.data.video = store_video = JSON.stringify(store_video)
        // var img_json = ''
        // $.each(store_img,(i,v) => {
        //   img_json = v
        // })
        store_img = JSON.stringify(store_img)
        list_data.image = store_img
        list_data.video = store_video[0]
        list_data.id = that.data.id
        // list_data.yellow_pagesid = 2
        // list_data.yellow_pagesid = that.data.yellow_pagesid
        // var dataJson = {yellow_pagesid:'1', typeid:'103', business_name:list_data.name, phone:list_data.tel, address:list_data.address, email:list_data.email,intro:list_data.intro, hours:list_data.time, image:store_img, video:store_video}
        var dataJson = list_data
        console.log('dataJson',list_data.image)
        $.req(url,type,dataJson,function(res){
          console.log('submit',res)

        })
        that.setData({submit:true,blur:10})
      }else{
        wx.showModal({
          content: '请把必填资料(*)补充完整',
          success: function(res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
    }else if(!(!open_time.open && !open_time.close)){
      // open_time.open = open_time.close=null
      console.log('1111',open_time.open)
      
      time=''
      wx.showModal({
          content: '请选择正确的营业时间',
          success: function(res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
    }

    

    // list_data.time = 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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