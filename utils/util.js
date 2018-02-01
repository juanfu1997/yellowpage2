const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function get(url, data) {
    return this.request(url, data, 'GET')
  }

 function request(url, data, method) {
    this.loading()
    return new Promise((resolve, reject) => {
      wx.request({
        url: url.find('https://') ? url : this.data.host + url,
        data,
        method,
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        dataType: 'json',
        success: res => {
          this.hideLoading()
          resolve(res.data)
        },
        fail: res => {
          console.error('request fail:' + url)
          console.error(res)
        },
      })
    })
  }
module.exports = {
  formatTime: formatTime,
  data:getApp().data,
  get,
  request
}
