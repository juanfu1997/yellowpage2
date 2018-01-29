const $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: getApp().globalData.img,
    korjoImg:getApp().globalData.korjoImg,
    tel_details:[{"typeid":103,"business_name":"吉野家","phone":"400-819-7197","address":"","email":"","intro":"","hours":"8:00-12:00","image":"","video":"","yellow_type":null,"wxpublic":"","customjson":"","id":50,"sort":0,"status":0,"addtime":"2018-01-18T14:30:15"},],
    showTab:[
              {show:false,class:'tab'},
              {show:false,class:'tab'},
              {show:false,class:'tab'},
    ],
    tool:[
          {img:'share.png',txt:'分享'},
          {img:'error.png',txt:'报错'},
    ],
    tab_store:true,

    current_ground:'',
    ground_list:[],
    showGorundList:true,
    param: {"touser": "",
                        "msgtype": "link",
                        "link": {"title": "第三方名称",
                        "description": "关注KORJO公众号，接收推送提醒",
                        "url": "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NTc0OTA5NA==&scene=124&from=singlemessage",
                        "thumb_url": "http://p.m.fans-me.com/countdownImg/logo.jpg"
                        }
                        },
    RevSessionCommon:{id:9}
                        
                            

  },
  preview(e){
    var that = this
    // var index = e.currentTarget.dataset.index
    // var store_img = that.data.store_img
    var tel_details = that.data.tel_details
    // console.log(e,store_img,index,store_img[index])
    wx.previewImage({
      urls: [getApp().globalData.korjoImg+tel_details.image] // 需要预览的图片http链接列表
    })
    console.log(getApp().globalData.korjoImg+tel_details.image)
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
  showGorundList(){
    var that = this 
    console.log('11')
    var showGorundList = that.data.showGorundList

    that.setData({ showGorundList:!showGorundList })
  },
  choice_ground(e){
    var that = this
    var ground_list = that.data.ground_list
    var current_ground = that.data.current_ground
    if(e.currentTarget!=undefined){
    var ground_index = e.currentTarget.dataset.index
    var userid = that.data.ground_list[ground_index].userid
    wx.navigateTo({
        url: '/pages/class/class?userid='+userid+'&ground_index='+ground_index
    })
    // that.get_class(userid)

    
  }else{
    var ground_index = e
    that.setData({ground_index})
    console.log(ground_index)

  }
     current_ground = ground_list[ground_index]
     wx.setNavigationBarTitle({
      title: current_ground.name
    })

    that.setData({current_ground,showGorundList:true})

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
      // console.log('b',b)

    }else{
      $.alert('获取号码错误')
    }
  },
  followWechat(){},
  get_wechat(e){
    var that = this
    var tel_details = that.data.tel_details
    var wechat = {name:'',http:''}
    wechat.http = e.replace(/.*?!/,'')
    wechat.name = e.split(/!/)
    wechat.name = wechat.name[0]
    that.setData({wechat})
  },
  showTab(e){
    var that = this
    var showTab = that.data.showTab
    var index = e.currentTarget.dataset.index
    $.each(showTab,(i,v) =>{
      v.show = true
      v.class = 'tab_choiced'
    })
    showTab[index].show = false
    showTab[index].class = 'tab'
    that.setData({showTab})
  },
  shareError(e){
    var that = this
    var index = e.currentTarget.dataset.index
    if(index == 0){

    }else{
      console.log(1)
      wx.navigateTo({
        url: '/pages/add_sell/add_sell?userid='+that.data.userid+'&typeid='+that.data.typeid+'&tel_index='+that.data.tel_index+'&ground_index='+that.data.ground_index+'&id='+that.data.tel_details.id
      })
    }
  },
  playVideo(){
    var that = this
    that.videoContext.play()
    that.videoContext.requestFullScreen()
  },
  son_ground(e,callback){
    var that =this
    var tel_url = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
          var tel_type = 'GET'
    var tel_dataJson = {typeid:e}
          // var aa =[]
            $.req(tel_url,tel_type,tel_dataJson,function(res){
              
            console.log('dddfff',res,e)

              that.setData({tel_list:res.data})
              callback()
            })
  },
  IsSonGround(e){
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
  saveWXpublic_msg(url,type,wxpublic_id,dataJson,cb){
    wx.request({
          url: url, //仅为示例，并非真实的接口地址
          data: {
             wxpublic_id:wxpublic_id,
             dataJson: dataJson 
          },
          method:type,
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(res) {
            if(cb){
            cb&&cb(res)
            }
            console.log(res.data)
          }
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    // 参数：分类typeid 选择电话index  
    // var RevSessionCommon={"id": 36,
    //                   "param": {"touser": "",
    //                       "msgtype": "link",
    //                           "link": {"title": "第三方名称",
    //                           "description": "关注KORJO公众号，接收推送提醒",
    //                           "url": "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NTc0OTA5NA==&scene=124&from=singlemessage",
    //                           "thumb_url": "http://p.m.fans-me.com/countdownImg/logo.jpg"
    //                           }
    //                   }
    //                   }
    var that = this
    var tel_details = that.data.tel_details
    var showTab = that.data.showTab
    var wxpublic_http = that.data.tel_details.wxpublic
    console.log('options',options)

    that.son_ground(options.typeid,function(res){
    var tel_index = options.tel_index
      that.setData({tel_index:options.tel_index})

    


    // console.log('tel_list',that.data.tel_list)
      if(that.data.tel_list){
        // tel_details = get_tel_details
        tel_details = that.data.tel_list[tel_index]
        that.setData({tel_details})
        console.log('tel_details',tel_details)

         

            if(tel_details.wxpublic){
              that.get_wechat(tel_details.wxpublic)
            }
              var wx_url = 'https://www.korjo.cn/KorjoApi/SaveDataJsonCommon'
            
                console.log('wx_json',param)
              var param = that.data.param
                  param = JSON.stringify(param)

                  that.setData({param})
                console.log('wx_json',param)
              var wx_dataJson = { wxpublic_id:36, datajson:param}

              // $.req(wx_url,'POST',wx_dataJson,function(res){
              //   console.log('wx_json',res,wx_dataJson)
              // })
              if(tel_details.intro){
                $.each(showTab,(i,v) =>{
                  v.show = true
                  v.class = 'tab_choiced'
                })
                showTab[0].show = false
                showTab[0].class = 'tab'
              }else if(tel_details.image){
                $.each(showTab,(i,v) =>{
                  v.show = true
                  v.class = 'tab_choiced'
                })
                showTab[1].show = false
                showTab[1].class = 'tab'
              }else if(tel_details.video){
                $.each(showTab,(i,v) =>{
                  v.show = true
                  v.class = 'tab_choiced'
                })
                showTab[2].show = false
                showTab[2].class = 'tab'
              }
            if(!tel_details.intro && !tel_details.image && !tel_details.video){
              that.setData({tab_store:false})
            }

              // that.setData({showTab})
            // }
            that.setData({ 
              tel_details,showTab,
              typeid:options.typeid,
              ground_index:options.ground_index

            })
      }else{
        var url = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
        var type = 'GET'
        var dataJson = {typeid:options.typeid}
        var tel_index = options.tel_index
        that.setData({ tel_index:options.tel_index })
        $.req(url,type,dataJson,(res) =>{
          tel_details = res.data[tel_index]
          that.setData({tel_details})
          console.log('res',tel_details)
        })
      }

      if(options.userid){
      that.get_ground_list(options.userid,function(res){
        that.choice_ground(options.ground_index)
        that.setData({userid:options.userid})
      })

      // console.log('userid',options)
      // that.query(options)
      // that.setData({userid:options.userid})
    }

    })


    

    

  console.log('11',options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.videoContext = wx.createVideoContext('myVideo')

  
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
  onShareAppMessage: function (res) {
    var that = this
      return{
        title:'附近小黄页，电话我知道！',
        path:'/pages/tel_details/tel_details?typeid='+that.data.typeid+'&tel_index='+that.data.tel_index+'&userid='+that.data.userid+'&ground_index='+that.data.ground_index,
        imageUrl:'../../images/business.png',
        success(res){
          console.log('res','/pages/tel_details/tel_details?typeid='+that.data.typeid+'&tel_index='+that.data.tel_index)
        }
      }
  }
})