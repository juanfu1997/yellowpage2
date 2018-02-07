var $ = require('../../utils/common.js')
var WxParse = require('../../wxParse/wxParse.js')

Page({
	data: {
		img: 'https://www.korjo.cn/xcx/orderImg/',
		list: Array(20),
	},
	onLoad(options) {
		this.GetFansIntro(res => {
			// 详情
			const content = $.url2abs(res.content||'')
			WxParse.wxParse('content', 'html', content, this, 5)
		})
	},
	onShareAppMessage() {
		return { title: 'FM小程序知识普及' }
	},
	/**
	 * FAQ
	 */
	GetFansIntro(callback) {
		$.get('/KorjoApi/GetFansIntro', { wxpublic_id: $.data.appid }, callback)
	},
})