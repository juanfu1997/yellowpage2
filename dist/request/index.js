const $ = require('../../utils/util')

module.exports = {

	/**
	 * 获取优惠券列表
	 */
	GetCouponList() {
		return $.get('/GspaceApi/GetCouponList', {})
	},

	/**
	 * 领取优惠券
	 * {"userid", "coupon_id"}
	 */
	SaveMyCoupon(data) {
		return $.post('/GspaceApi/SaveMyCoupon', { dataJson: JSON.stringify(data) })
	},

	/**
	 * 我的优惠券列表
	 */
	GetMyCouponList(userid) {
		return $.get('/GspaceApi/GetMyCouponList', { userid })
	},

	/**
	 * 更新优惠券状态
	 * {id,status}
	 * 0：未使用，1：已使用，2：已过期
	 */
	UpdateMyCouponStatus(data) {
		return $.get('/GspaceApi/UpdateMyCouponStatus', data)
	},

	/**
	 * 获取产品类型列表
	 */
	GetProductTypeList() {
		return $.get('/GspaceApi/GetProductTypeList', {})
	},

	/**
	 * 获取推荐产品列表
	 */
	GetProductListByRecommend() {
		return $.get('/GspaceApi/GetProductListByRecommend', {})
	},

	/**
	 * 获取联系人信息
	 */
	GetProductUser(id) {
		return $.get('/GspaceApi/GetProductUser', { id })
	},

	/**
	 * 获取联系人列表
	 */
	GetProductUserList(userid) {
		return $.get('/GspaceApi/GetProductUserList', { userid })
	},

	/**
	 * 删除联系人
	 */
	DeleteProductUserByID(id) {
		return $.get('/GspaceApi/DeleteProductUserByID', { id })
	},

	/**
	 * 保存或更新联系人信息
	 * { userid, id, contact, phone, address, isdefault }
	 */
	SaveProductUser(data) {
		return $.post('/GspaceApi/SaveProductUser', { dataJson: JSON.stringify(data) })
	},

	/**
	 * 根据ID获取订单信息
	 */
	GetProductOrderByID(id) {
		return $.get('/GspaceApi/GetProductOrderByID', { id })
	},

	/**
	 * 获取我的订单列表
	 * Status: -1 = 已删除，1 = 待付款，2 = 已付款，3 = 配送中，4 = 待收货，
	 * 5 = 已完成，6 = 已取消，7 = 已接单
	 */
	GetProductOrderList(userid) {
		return $.get('/GspaceApi/GetProductOrderList', { userid })
	},

	/**
	 * 取消或删除订单
	 * {id,status}
	 * Status: -1 = 已删除，1 = 待付款，2 = 已付款，3 = 配送中，4 = 待收货，
	 * 5 = 已完成，6 = 已取消，7 = 已接单
	 */
	UpdateOrderStatus(data) {
		return $.get('/GspaceApi/UpdateOrderStatus', data)
	},

	/**
	 * 保存需求订单
	 * dataJson{"contact_id","userid","freight","mycoupon_id","leaving_message","product_price",
	 * "coupon_price","freight_price","all_price",” relationList”}
	 * 订单产品关联relationList{"product_id","number"}
	 */
	SaveProductOrder(data) {
		return $.post('/GspaceApi/SaveProductOrder', { dataJson: JSON.stringify(data) })
	},

	/**
	 * 根据类型获取产品列表
	 */
	GetProductList(typeid) {
		return $.get('/GspaceApi/GetProductList', { typeid })
	},

	/**
	 * 根据产品ID获取详情
	 */
	GetProductInfo(id) {
		return $.get('/GspaceApi/GetProductInfo', { id })
	},

	/**
	 * 商家登录
	 * {username,password}
	 */
	GetAdminOrder(data) {
		return $.get('/GspaceApi/GetAdminOrder', data)
	},

	/**
	 * 获取顾客订单列表
	 */
	GetProductOrderListByAdmin(status) {
		return $.get('/GspaceApi/GetProductOrderListByAdmin', { status })
	},

	/**
	 * 共用支付接口
	 * id=小程序密钥管理ID&order_id=支付订单ID
	 */
	PayCommon(order_id) {
		return $.get('/GspaceApi/PayCommon', { id: $.data.appid, order_id })
	},

	/**
	 * 轮播图
	 */
	GetSliderCommonList(slider_id) {
		return $.get('/KorjoApi/GetSliderCommonList', { slider_id })
	},

	/**
	 * 根据用户ID获取用户信息
	 */
	GetUserInfo(userid) {
		return $.get('/KorjoApi/GetUserInfo', { userid })
	},

	/**
	 * 获取用户openid
	 */
	GetSessionKey(data) {
		return $.get('/KorjoApi/GetSessionKey', data)
	},

	/**
	 * 保存用户信息返回userid
	 */
	SaveUserInfo(data) {
		return $.post('/KorjoApi/SaveUserInfo', { jsonData: JSON.stringify(data) })
	},

	/**
	 * 保存客服推送消息
	 */
	SaveDataJsonCommon(data) {
		return $.post('/KorjoApi/SaveDataJsonCommon', { dataJson: JSON.stringify(data) })
	},

	/**
	 * 上传图片
	 */
	Upload(filePath) {
		$.loading()
		return new Promise((resolve, reject) => {
			wx.uploadFile({
				url: 'https://www.korjo.cn/KorjoApi/AdminUpload',
				name: 'file',
				formData: { "path": "order", "type": "image" },
				filePath,
				success: res => {
					$.hideLoading()
					resolve(res)
				},
				fail: e => {
					$.log(e)
				}
			})
		})
	},

	/**
	 * FAQ
	 */
	GetFansIntro() {
		return $.get('/KorjoApi/GetFansIntro', { wxpublic_id: getApp().globalData.appid })
	},

}