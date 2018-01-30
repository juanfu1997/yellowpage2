// pages/index/index.js
const $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	img: getApp().globalData.img,
    korjoImg:getApp().globalData.korjoImg,
  	// ground:[
  	// 		// {logo:'calender.png',name:'小伙伴1'},
  	// 		// {logo:'calender.png',name:'小伙伴2'},
  	// 		// // {logo:'calender.png',name:'小伙伴3'},
  	// 		// // {logo:'calender.png',name:'小伙伴4'},
  	// 		// // {logo:'calender.png',name:'小伙伴5'},
  	// 		],
    ground:[],
    write:[
            {txt:'社区名称',content:''},
            {txt:'联系人',content:''},
            {txt:'联系号码',content:''},
            {txt:'邮箱',content:''}
            ],
    write_input:{ground_name:'',contacts:'',number:'',email:''},
    dataJson:{name:'',contact:'',phone:'',email:''},
    a:[{a:'a'},{a:'2'}],
    showCreat:true,
    submit_index:1,
  
  },

  close_submit(){
    var that = this
    that.setData({
      submit_index:1,
      showCreat:true
    })
  },
  bindblur(e){
    var that = this 
    var value = e.detail.value
    var write = that.data.write
    var index = e.currentTarget.dataset.index
    $.each(write,(i,v) => {
      if(index == i){
        v.content = value
      }
    // console.log(i,v)
    })
    that.setData({write})
  },
  submit(e){
    var that = this 
    var write = that.data.write
    var submit_full =true
    $.each(write,(i,v) => {
      if(!v.content){
        submit_full = false
      }
      // console.log(v)
    })
    
    //*******上传到后台代码
    if(submit_full){
        var url='https://www.korjo.cn/TimeApi/SaveYellowPagesInfo'
        var type = 'POST'
        var dataJson = that.data.dataJson
        dataJson.name = write[0].content
        dataJson.contact = write[1].content
        dataJson.phone = write[2].content
        dataJson.email = write[3].content
        // dataJson.logo = write[0].content
        $.req(url,type,dataJson,function(res){
          console.log('申请结果',res)
        })
        that.setData({submit_index:3})
    }else{
      $.alert('请完善所有资料')
    }


    //*******上传到后台代码


  },
  creat(){
    console.log('1')
    this.setData({submit_index:2})
  },
  close_demo(){
    this.setData({showCreat:true})
  },
  creatGround(){
    this.setData({showCreat:false})
  },
  come_ground(e){
    var that = this
    var ground_index = e.currentTarget.dataset.index
    var groundCookie = that.data.ground[ground_index].userid +'/'+ ground_index
    wx.setStorageSync('groundCookie', groundCookie)
    console.log(groundCookie)
    wx.reLaunch({
      url: '/pages/class/class?userid='+that.data.ground[ground_index].userid+'&ground_index='+ground_index
    })
  },
  getAllGround(){
    var that = this
    var ground = that.data.ground
    var type = "POST"

    var url = 'https://www.korjo.cn/TimeApi/GetYellowPagesList'
    $.req(url,type,null,function(res){
      ground = res.data
      console.log('156',res)
      // $.each(res.data,(i,v) => {
      //   ground[i].name = v.name
      // })
      // console.log(ground)
      that.setData({ground})
      
    })
  },
  // hidden_index(e){
  //   var that = this
  //   var index = e.currentTarget.dataset.index
  //   that.setData({submit_index:index})
  // }
  // swiperChange(e){
  // 	console.log(e)
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getAllGround()
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