const $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: getApp().globalData.img,
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
      $.take_call('123')

    }else{
      $.alert('获取号码错误')
    }
  },
  followWechat(){},
  get_wechat(e){
    var that = this
    var wechat = {name:'',http:''}
    wechat.http = e.replace(/.*?\//,'')
    wechat.name = e.split(/\//)
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
      // baocuo
    }
  },
  playVideo(){
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
    var tel_index = options.tel_index

    // var get_tel_details = wx.getStorageSync('tel_details')
    that.son_ground(options.typeid,function(res){
      that.setData({tel_details:that.data.tel_list[tel_index]})
    // console.log('tel_list',that.data.tel_list)
      if(that.data.tel_list){
        // tel_details = get_tel_details
        tel_details = that.data.tel_list[tel_index]
        that.setData({tel_details})

          // var RevSessionCommon = that.data.RevSessionCommon

            // RevSessionCommon.param.link = JSON.stringify(RevSessionCommon.param.link)
            // RevSessionCommon.param = JSON.stringify(RevSessionCommon.param)
            // RevSessionCommon = JSON.stringify(RevSessionCommon)
            // console.log('RevSessionCommon1', RevSessionCommon)


            // console.log('RevSessionCommon',RevSessionCommon)
            // that.setData({RevSessionCommon})

            if(tel_details.wxpublic){
              that.get_wechat(tel_details.wxpublic)
            }
            // if(tel_details.intro||tel_details.image||tel_details.video){
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
            that.setData({tel_details,showTab,typeid:options.typeid})
      }else{
        var url = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
        var type = 'GET'
        var dataJson = {typeid:options.typeid}
        var index = options.index
        $.req(url,type,dataJson,(res) =>{
          tel_details = res.data[index]
          that.setData({tel_details})
          console.log('res',tel_details)
        })
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
        path:'/pages/tel_details/tel_details?typeid='+that.data.typeid+'&index='+that.data.index,
        success(res){
          console.log('res',res)
        }
      }
  }
})