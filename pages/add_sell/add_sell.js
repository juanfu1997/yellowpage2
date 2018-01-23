const $ = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: getApp().globalData.img,
    korjoImg:getApp().globalData.korjoImg,
    class_list1:['美国', '中国', '巴西', '日本'],
    class_list2:['美国', '中国', '巴西', '日本'],
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
    arrow:'arrow',
    add_list:[
    '分类*：','名称*：', '电话*：', '地址*：', '邮箱：','营业时间：', '介绍：',],
    img_list:[{name:'门店图片：',img:'btn_img'},
              {name:'门店视频：',img:'btn_video'},],
    list_data:{class1:'',class2:'',name:'',tel:'',address:'',email:'',time:'',introduce:'',},
    a:{a:[{p:'p'}]},
    wechat:{name:'',http:''},
    tips:[
          {img:'tips1'},
          {img:'tips2'},
    ],
    showTips:false,
    blur:0,

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
      blur:10
    })

  },
  close_submit(){
    var submit = this.data.submit
    this.setData({
      submit:false
    })
  },
  submit(){
    var that = this
    var list_data = that.data.list_data
    var open_time = that.data.open_time
    var wechat = that.data.wechat
    var store_img = that.data.store_img
    var store_video = that.data.store_video

    if(wechat.name || wechat.http){
      
      if(!wechat.name || !wechat.http){
        $.alert('请把公众号及链接补充完整')
      }
      if(wechat.name && wechat.http){
        list_data.wechat = wechat.name+'!'+wechat.http
        $.alert(list_data.wechat)
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
          if(i=='class1'||i=='class2'||i=='name'||i=='tel'||i=='address'){
            if(!v){
                list_full =false
                return;
                console.log('1',i)
              }
          }
            })
      if(list_full){
        var url = 'https://www.korjo.cn/TimeApi/SaveBusinessPhoneInfo'
        var type="POST"
        store_img = JSON.stringify(store_img)
        store_video = JSON.stringify(store_video)
        var dataJson = {yellow_pagesid:'1', typeid:'103', business_name:list_data.name, phone:list_data.tel, address:list_data.address, email:list_data.email,intro:list_data.intro, hours:list_data.time, image:store_img, video:store_video}
        console.log(dataJson)
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
    that.videoContext.play()
    that.videoContext.requestFullScreen()

  },
  fullscreen(e){
    var that = this
    var type = event.detail
    console.log(e)
  },
  uploadMedia(e){
    var that = this 
    var type = e.currentTarget.dataset.type
    var store_img = that.data.store_img
    var store_video = that.data.store_video
    var hid_img = that.data.hid_img
    var hid_video = that.data.hid_video
    var img_count = 6 - store_img.length
    if(type==0){
      wx.chooseImage({
        count: img_count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          $.each(tempFilePaths,(i,v) => {
            $.adminUpload(v,'image',function(res){
              console.log(res)
              store_img.push(res.data)
              if(store_img.length >= 6){
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
    list_data.name = value
    break;
  case '2':
    list_data.tel = value
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
    list_data.introduce = value
    break;
  default:
  console.log('商家资料获取错误',index)
    // n 与 case 1 和 case 2 不同时执行的代码
  }
  
  that.setData({ list_data,wechat })
    console.log(e,list_data)
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
    console.log(that.data.a.a[0].p)
    if(type==1){
      list_data.class1 = list1_menu = class_list1[index]
      that.setData({index1:index,list1_menu,list_data})
    }else{
      list_data.class2 =list2_menu = class_list2[index]
      that.setData({index2:index,list2_menu,list_data})

    }
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
  that.videoContext = wx.createVideoContext('myVideo')
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