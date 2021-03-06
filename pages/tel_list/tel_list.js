const $ = require('../../utils/common.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: getApp().globalData.img,
    korjoImg:getApp().globalData.korjoImg,
    class:false,
    topTitle:'',
    details:false,
    class_ground:[
                  {yellow_type:'',userid:'',parentid:'',id:'',image:'',data:''},
    ],
    tel_list:[{"typeid":'',"business_name":"","phone":"","address":"","email":"","intro":"","hours":"","image":"","video":"","yellow_type":'',"wxpublic":"","customjson":"","id":'',"sort":0,"status":0,"addtime":"2018-01-18T14:31:37"},],
    tel_details:[{"typeid":'',"business_name":"","phone":"","address":"","email":"","intro":"","hours":"","image":"","video":"","yellow_type":'',"wxpublic":"","customjson":"","id":'',"sort":0,"status":0,"addtime":"2018-01-18T14:30:15"},],
    son_ground:[],
    arrow1:'arrow2',
    arrow2:'arrow2',
    showGorundList:true,
    bgimage:'',
    son_class:[
                {class:'class_named'},
                {class:'class_name'},
                {class:'class_name'},
    ],
    choice_son:0,

    

  },
  showGorundList(){
    var that = this 
    var showGorundList = that.data.showGorundList

    that.setData({ showGorundList:!showGorundList })
  },
  take_call(e){
    var that = this
    var number = e.currentTarget.dataset.number
    var b = number.split(/\/+/)
      console.log(b,number)
    if(b.length > 1){
      wx.showActionSheet({
        itemList: b,
        success: function(res) {
          $.take_call(b[res.tapIndex])
          // console.log(res.tapIndex)
        }
      })
    }else if(b.length ==1){
      $.take_call(b[0])

    }else{
      $.alert('获取号码错误')
    }
    // console.log('11',e)
  },
  get_details(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var tel_details = that.data.tel_details
    var tel_list = that.data.tel_list
    var typeid = that.data.tel_list[index].typeid
    var ground_index = that.data.ground_index
    var class_index = that.data.class_index
    console.log(ground_index)
    // console.log(index)

    wx.navigateTo({
        url: '/pages/tel_details/tel_details?userid='+that.data.userid+'&typeid='+typeid+'&tel_index='+index+'&ground_index='+ground_index+'&class_index='+class_index
    })

    // tel_details = tel_list[index]

    // if(tel_details.wxpublic){
    //   var wechat = ''
    // }
    // var a = 'a/a/a'
    //   var b =a.split(/\//)
    //   console.log('a.split',b)
    // wx.setStorageSync('tel_details', tel_details)
    // $.goPage(e)
    // that.setData({tel_details,details:true})
    // console.log(tel_details)
  },
  son_ground(e){
    var that =this
    var tel_url = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
          var tel_type = 'GET'
    var tel_dataJson = {typeid:e}
          // var aa =[]
            $.req(tel_url,tel_type,tel_dataJson,function(res){
              
            console.log('tel_url1111',res)
              that.setData({tel_list:res.data})
            })
  },
  switchType(e){
    var that = this
    var type = e.currentTarget.dataset.type
    var tel_list = that.data.tel_list
    var idArray = that.data.idArray
    var choice_son = that.data.choice_son
    choice_son = type
    that.setData({
      choice_son,
    })
    console.log(idArray)
    that.son_ground(idArray[type])
  },
  query(e){
    var that = this
    console.log('e',e)
      var url = 'https://www.korjo.cn/TimeApi/GetYellowUserTypeList'
      var type = 'GET'
      var dataJson = {userid:e.userid,parentid:e.parentid}
      var tel_list = that.data.tel_list

      $.req(url,type,dataJson,function(res){
        if(res.data.length!=0){
          that.setData({class:false,class_ground:res.data})
          
          var idArray = []
          
          $.each(that.data.class_ground,(i,v) => {
            idArray.push(v.id)
            console.log('idArray',idArray)
            })
          that.setData({idArray})
          that.son_ground(idArray[0])
          // var tel_dataJson = {typeid:103}
          // for(var i = 0;i<idArray.length;i++){
          
            // console.log('tel_url1111',aa)
          // }

          }else{
            var url2 = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
            var type2 = 'GET'
            var dataJson2 = {typeid:e.parentid}
            $.req(url2,type2,dataJson2,function(res){
              // if(){}
              tel_list = res.data
              that.setData({tel_list})
              console.log('get',res)
            })
            that.setData({class:true,topTitle:e.yellow_type})

          }
      })
  },
  get_class(userid){
    var that = this
    var class_data = that.data.class_data
    var url = 'https://www.korjo.cn/TimeApi/GetYellowUserTypeList'
    var type = 'GET'
    var dataJson = {userid:userid,parentid:'0',}
    $.req(url,type,dataJson,function(res){
      class_data = res.data
      that.setData({class_data})
      console.log(class_data)
    },)
  },
  choice_ground(e){
    var that = this
    var ground_list = that.data.ground_list
    var current_ground = that.data.current_ground
    var ground_index = that.data.ground_index
    var userid = that.data.userid
    if(e.currentTarget!=undefined){
     console.log('index',1)
    ground_index = e.currentTarget.dataset.index
    userid = that.data.ground_list[ground_index].userid
    wx.reLaunch({
        url: '/pages/class/class?userid='+userid+'&ground_index='+ground_index
    })
    // that.get_class(userid)

    
  }
  else{
    ground_index = e
     console.log('index',ground_index)

  }
    var groundCookie = userid +'/'+ ground_index
    console.log('groundCookie',groundCookie)
    wx.setStorageSync('groundCookie', groundCookie)

    that.setData({
      ground_index,
      userid
    })
     current_ground = ground_list[ground_index]
     // console.log('index',current_ground,ground_list,ground_index)

     wx.setNavigationBarTitle({
      title: current_ground.name
    })

    that.setData({current_ground,showGorundList:true})

  },
  get_ground_list(userid,callback){
    var that = this
    var ground_list = that.data.ground_list
    var url = 'https://www.korjo.cn/TimeApi/GetYellowPagesList'
    var type = 'POST'

    $.req(url,type,null,function(res){
      ground_list = res.data
      that.setData({ground_list})
      // wx.setStorageSync('ground_list', ground_list)

      callback()

      console.log(ground_list)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var ground_list = wx.getStorageSync('ground_list')
    var bgimage = that.data.bgimage
    bgimage = wx.getStorageSync('bgimage')
    // console.log('bgimage',bgimage)
    that.setData({
      userid:options.userid,
      bgimage
    })
      console.log('options',options)
    if(options.userid){
      that.get_ground_list(options.userid,function(res){
        that.choice_ground(options.ground_index)
      })
      that.setData({class_index:options.class_index})

      console.log('userid',options)
      that.query(options)
      that.setData({userid:options.userid})
    }

  },
  onHide: function () {
    this.setData({showGorundList:true})
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