const $ = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: getApp().globalData.img,
    korjoImg:getApp().globalData.korjoImg,
    media:getApp().globalData.media,
    // class_list1:['美国', '中国', '巴西', '日本'],
    class_list1:[],
    // class_list2:['美国', '中国', '巴西', '日本'],
    class_list2:[],

    open_time:{open:null,close:null,start:'09:01',end:'12:01'},
    // open_time:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23',],
    store_img:[],
    store_video:'',
    // store_video:[
    //               'https://v.qq.com/x/page/n0397v0xidp.html',
    //               ],
    hid_img:true,
    hid_video:true,
    index1:'',
    index2:'',
    sell_name:'',
    list1_menu:'请选择分类',
    list2_menu:'请选择分类',
    arrow:{parent:'arrow',child:'arrow'},
    add_list:[
    '分类*：','名称*：', '电话*：', '地址*：', '邮箱：','营业时间：', '介绍：',],
    img_list:[{name:'门店图片：',img:'addicon'},
              {name:'门店视频：',img:'addicon'},],
    list_data:{yellow_pagesid:'',typeid:'',id:'', business_name:'',phone:'',address:'',email:'',time:'',intro:'',hours:'',image:'',video:''},
    a:{a:[{p:'p'}]},
    wechat:{name:'',http:''},
    tips:[
          {img:'tips1'},
          {img:'tips2'},
    ],
    showTips:false,
    blur:0,
    showSonClass:true,
    textarea:'请介绍你的门店',
    showTextarea:false,

  },
  close_demo(){
    var that = this
    var blur = that.data.blur
    var showTips = that.data.showTips
    var submit = that.data.submit
    blur = 0
    showTips = submit = false
    that.setData({blur,showTips,submit})
  },
  showTips(){
    var that = this
    var showTips = that.data.showTips
    var blur = that.data.blur
    that.setData({
      showTips:true,
      blur:10,
      showTextarea:false
    })

  },
  close_submit(){
    var that = this
    var submit = this.data.submit
    this.setData({
      submit:false
    })
    wx.reLaunch({
            url: '/pages/class/class?userid='+that.data.userid+'&ground_index='+that.data.ground_index
          })
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
    console.log('1a1',list_data.typeid,that.data.yellow_pagesid)

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
        list_data.image = store_img 
        // list.data.video = store_video = JSON.stringify(store_video)
        // var img_json = ''
        // $.each(list_data.image,(i,v) => {
          
        // })
        store_img = JSON.stringify(store_img)
        console.log(store_img)
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
  chooseLocation(){
    var that = this
    wx.chooseLocation({
      success(e){
        that.setData({
          address:e.address
        })
        console.log(e.address)
      },
    })
  },
  bindTimeChange(e){
    var that = this
    var time = e.detail.value
    var open_time = that.data.open_time
    var type = e.currentTarget.dataset.type
    var list_data = that.data.list_data

    console.log(e)
    if(type ==1){
      open_time.open = time
      that.setData({open_time})
    console.log(open_time.open)
    }
    else if(type==2){
      open_time.close = time
      that.setData({open_time}) 
    console.log(open_time.close)
    }

    // let open = open_time.start.split(':')
    // let close = open_time.close.split(':')
    // if(open[0]<close[0]){
    //   close[0] = open[0]
    //   close[0] ++
    // }
    // if(open[1]<close[1]){
    //   if(open[1] <59){
    //     close[1] = open[1]
    //     close[1] ++
    //   }
    // }
    // console.log(shi)
  },
  del_media(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var type = e.currentTarget.dataset.type
    var store_img = that.data.store_img
    var store_video = that.data.store_video
    if(type == 0){
      wx.showModal({
      title: '',
      content: '是否移除这张照片？',
      success: function(res) {
        if (res.confirm) {
          store_img.splice(index,1)
          that.setData({store_img,hid_img:true})
          console.log('shanchu',store_img)
        } else if (res.cancel) {
        }
      }
    })
    }else if(type == 1){
      wx.showModal({
      title: '',
      content: '是否移除这段视频？',
      success: function(res) {
        if (res.confirm) {
          store_video.splice(index,1)
          that.setData({store_video,hid_video:true})
          // console.log('shanchu',store_img)
        } else if (res.cancel) {
        }
      }
    })
    }
    
    
  },
  preview(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var store_img = that.data.store_img
    console.log(e,store_img,index,store_img[index])
    wx.previewImage({
      urls: [store_img[index]] // 需要预览的图片http链接列表
    })

  },
  viewVideo(){
    var that = this
    // console.log('play')
    that.videoContext.play()
    that.videoContext.requestFullScreen()


  },
  fullscreen(e){
    var that = this
    var direction = e.detail.direction
    if(direction='horizontal'){
      that.videoContext.pause()
    }
    // console.log(e)
  },
  uploadMedia(e){
    var that = this 
    var type = e.currentTarget.dataset.type
    var store_img = that.data.store_img
    var store_video = that.data.store_video
    var hid_img = that.data.hid_img
    var hid_video = that.data.hid_video
    var img_count = 3 - store_img.length
    // var list_data = that.data.list_data
    if(type==0){
      wx.chooseImage({
        count: img_count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          $.each(tempFilePaths,(i,v) => {
            console.log(v)
            $.adminUpload(v,'image',function(res){
              // console.log('http',getApp().globalData.media +res.data)
              // store_img[0] = res.data
              store_img.push(res.data) //允许多张照片
              if(store_img.length >= 3){
                hid_img = false
              }
              that.setData({store_img,hid_img})
            })
          })
            
        }
      })
    }else{
          wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
            camera: 'back',
            success: function(res) {
          console.log('video')
              // $.each(res.tempFilePath,(i,v) =>{
                $.adminUpload(res.tempFilePath,'movie',function(res){
                  // store_video.push(res.data)
                  console.log('http',getApp().globalData.media+res.data)
                  store_video = res.data

                  that.setData({store_video:false,store_video})
                  if(store_video){

                
                  }
                })
              // })
              
              
            }
        })

      // wx.chooseVideo({
      //       sourceType: ['album','camera'],
      //       maxDuration: 60,
      //       camera: 'back',
      //             success: function(res) {
      //               console.log('video')
      //               var tempFilePaths = res.tempFilePath
      //               $.each(tempFilePaths,(i,v) => {
      //                 store_video.push(v)
      //               })
      //               if(store_video.length != 0){
      //                 hid_video = false
      //               }
      //                 that.setData({store_video,hid_video})
      //             }
      //         })
    }
    // console.log(store_img.length)
    
    
    console.log(e)
  },

  saveInput(e){
    var that = this
    var value = e.detail.value
    var list_data = that.data.list_data
    var index = e.currentTarget.dataset.index
    var wechat = that.data.wechat
    switch(index)
  {
  case '1':
    list_data.business_name = value
    break;
  case '2':
    list_data.phone = value
    if(value){
      // var a = value.match(/\/+/g)
      var b = value.split(/\/+/)
      console.log(b,value)
    }
    break;
  case '3':
    list_data.address = value
    break;
  case '4':
    list_data.email = value
    break;
  case '5':
    wechat.name = value
    break;
  case '6':
    wechat.http = value
    break;
  case '7':
    list_data.hours = value
    break;
  case '8':
    var textarea = that.data.textarea
    var showTextarea = that.data.showTextarea
    list_data.intro = value
    textarea = list_data.intro
    console.log(textarea,value,e)
      showTextarea = !showTextarea
    if(!textarea.length){
      textarea='请介绍你的门店'
      // showTextarea = false
    }
    that.setData({
      textarea,
      showTextarea,
      focus:false
    })
    break;
  default:
  console.log('商家资料获取错误',index)
    // n 与 case 1 和 case 2 不同时执行的代码
  }
  
  that.setData({ list_data,wechat })
    console.log(e,list_data)
  },
  saveTextarea(e){
    var that = this
    var value = e.currentTarget.dataset.value
    var showTextarea = that.data.showTextarea
    that.setData({ 
      showTextarea:!showTextarea,
      focus:true
       })
  },
    

  getPickerValue(e){
    var that = this
    var index = e.detail.value
    var list1_menu = that.data.list1_menu
    var list2_menu = that.data.list2_menu
    var class_list1 = that.data.class_list1
    var class_list2 = that.data.class_list2
    var list_data = that.data.list_data
    var type = e.currentTarget.dataset.type
    var index1 = that.data.index1
    var class_data = that.data.class_data
    var typeid = that.data.typeid
    var son_ground = that.data.son_ground
    if(type==1){
      list1_menu = class_list1[index]
      that.setData({
        index1:index,list1_menu,
        list_data,
      })
      // console.log(class_data)
      that.get_sonClass(that.data.userid,class_data[index].id,function(res){
        if(res.data.length){
          class_list2 = []
          console.log('1',res.data)
          $.each(res.data,(i,v) =>{
            class_list2.push(v.yellow_type)
          })
          that.setData({
            showSonClass:false,
            son_ground:res.data,
            class_list2
          })
        }else{
          typeid = class_data[index].id
          that.setData({
            showSonClass:true,
            typeid
          })

        }
      // console.log(that.data.typeid,res.data.length)
      })

    }else{
      typeid = son_ground[index].id
      list2_menu = class_list2[index]
      // that.get_sonClass(that.data.userid,) 
      that.setData({
        index2:index,
        list2_menu,list_data,
        class_list2,
        typeid
      })
      console.log(that.data.typeid)

    }
  },
   query(e){
    var that = this
    console.log('e',e)
      var url = 'https://www.korjo.cn/TimeApi/GetYellowUserTypeList'
      var type = 'GET'
      var dataJson = {userid:e.userid,parentid:e.yellow_pagesid}
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
            var dataJson2 = {typeid:e.yellow_pagesid}
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
  get_parentClass(userid,parentid,callback){
    var that = this
    var class_list1 = that.data.class_list1
    class_list1 = []
    var url = 'https://www.korjo.cn/TimeApi/GetYellowUserTypeList'
    var type = 'GET'
    var dataJson = {userid:userid,parentid:parentid}
    $.req(url,type,dataJson,function(res){
      console.log('get_parentClass',res)
      $.each(res.data,(i,v) => {
        class_list1.push(v.yellow_type)
      })
      that.setData({
        class_list1,
        class_data:res.data
      })
      callback && callback(res)
    })
  },
  get_sonClass(userid,parentid,callback){
    var that = this
    var url = 'https://www.korjo.cn/TimeApi/GetYellowUserTypeList'
    var type = 'GET'
    var dataJson = {userid:userid,parentid:parentid}
    $.req(url,type,dataJson,function(res){
      console.log('son',res)
      callback && callback(res)
    })

    
  },
   get_wechat(e){
    var that = this
    var tel_details = that.data.tel_details
    var wechat = {name:'',http:''} 
    wechat.http = e.replace(/.*?!/,'')
    wechat.name = e.split(/!/)
    wechat.name = wechat.name[0]
    that.setData({wechat})
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var list_data = that.data.list_data
    var class_index = options.class_index
    var tel_index = that.data.tel_index
    var list1_menu = that.data.list1_menu
    var list2_menu = that.data.list2_menu
    var showSonClass = that.data.showSonClass
    var class_list1 = that.data.class_list1
    var bgimage = that.data.bgimage
    bgimage = wx.getStorageSync('bgimage')
    // console.log('bgimage',bgimage)
    console.log('options',options)
    that.setData({
        userid : options.userid,
        yellow_pagesid : options.yellow_pagesid,
        ground_index : options.ground_index,
        class_index : options.class_index,
        bgimage
      })
    that.videoContext = wx.createVideoContext('myVideo')
    if(!options.id){
      that.get_parentClass(options.userid,0,function(res){})
      // that.query(options)
      that.setData({
        showAdd:false,
        top_title:'添加商家电话'
      })
    }else{
      that.get_parentClass(options.userid,0,function(res){
      console.log('data',res.data)
      // $.each(res.data,(i,v) => {
      // class_list1.push(v.yellow_type)
      // })
      // that.setData({class_list1})
      list1_menu = res.data[class_index].yellow_type
      console.log(list1_menu)
      showSonClass = true
      that.get_sonClass(options.userid,res.data[class_index].id,function(res){
          // var url = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
          // var type = 'GET'
          // var dataJson = {typeid:options.typeid}
          var class_list2 = that.data.class_list2
          class_list2=[]
          $.each(res.data,(i,v) => {
            class_list2.push(v.yellow_type)
          })
          that.setData({
            class_list2
          })         
          if(res.data.length!=0){
            console.log('test',res.data)
            $.each(res.data,(i,v) =>{
              if(v.id == options.typeid){
              list2_menu = res.data[i].yellow_type
              console.log('testok',v)
              }
              console.log('test',v)
            })
            // $.req(url,type,dataJson,function(res){
              showSonClass = false
            // })
            that.setData({
              list2_menu,
              showSonClass,
            })
          }
          console.log('111',res.data)
      })
      
          that.setData({
              list1_menu,
            })
        })
          var yellow_pagesid = Number(options.ground_index)+1
          var typeid = options.typeid
          // list_data.yellow_pagesid = yellow_pagesid
          // list_data.typeid = options.typeid
          // console.log('typeid',options.typeid)
          that.setData({
            yellow_pagesid,
            typeid
          })
          var url = 'https://www.korjo.cn/TimeApi/GetBusinessPhoneListByID'
          var type = 'GET'
          var dataJson = {typeid:options.typeid}
          var store_img = that.data.store_img

          $.req(url,type,dataJson,function(res){
            var id = res.data[options.tel_index].id
            var typeid = options.typeid

            list_data = res.data[options.tel_index]
            if(list_data.wxpublic){
              that.get_wechat(list_data.wxpublic)
            }
            if(list_data.image){
              store_img = JSON.parse(list_data.image)
              console.log(store_img)
            }
            that.setData({
              list_data,
              id:options.id,
              showAdd:true,
              top_title:'信息报错',
              store_img
            })
            console.log(res.data[options.tel_index].id)
          })

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