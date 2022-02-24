// var serverUrl = "https://meal.rjxxjs.cn/newkeaidian"; //一碗好面
// var serverUrl = "http://1a9p732526.iok.la";
var serverUrl = "http://192.168.0.108:8888/";
// 请求头处理函数
function CreateHeader(url, type) {
	let header = {}
	if (type == 'POST_PARAMS') {
		header = {
			'content-type': 'application/json'
		}
	} else {
		header = {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
	}
	return header;
}
//post请求，数据在body中
function postRequest(url, data) {
	let header = CreateHeader(url, 'POST');
	return new Promise((resolve, reject) => {
		wx.showLoading({
			title: '加载中...',
		})
		wx.request({
			url: serverUrl + url,
			data: data,
			header: header,
			method: 'POST',
			success: (res => {
				if (res.statusCode === 200) {
					//200: 服务端业务处理正常结束
					resolve(res.data)
				} else {
					reject(res)
				}
			}),
			fail: (res => {
				console.log("超时")
				wx.showToast({
					title: '响应超时',
					icon: 'none'
				})
				reject(res)
			})
		})
	})
}
//post请求，数据按照query方式传给后端
function postParamsRequest(url, data) {
	let header = CreateHeader(url, 'POST_PARAMS');
	let useurl = url;
	return new Promise((resolve, reject) => {
		wx.showLoading({
			title: '加载中...',
		})
		wx.request({
			url: serverUrl + useurl,
			data: data,
			header: header,
			method: 'POST',
			success: (res => {
				if (res.statusCode === 200) {
					//200: 服务端业务处理正常结束
					resolve(res.data)
					wx.hideLoading()
				} else {
					reject(res)
				}
			}),
			fail: (res => {
				console.log("超时")
				wx.showToast({
					title: '响应超时',
					icon: 'none'
				})
				reject(res)
			})
		})
	})
}
//get 请求
function getRequest(url, data) {
	let header = CreateHeader(url, 'GET');
	return new Promise((resolve, reject) => {
		wx.showLoading({
			title: '加载中...',
		})
		wx.request({
			url: serverUrl + url,
			data: data,
			header: header,
			method: 'GET',
			success: (res => {
				if (res.statusCode === 200) {
					//200: 服务端业务处理正常结束
					resolve(res.data)
					wx.hideLoading()
				} else {
					reject(res)
				}
			}),
			fail: (res => {
				console.log("超时")
				wx.showToast({
					title: '响应超时',
					icon: 'none'
				})
				reject(res)

			})
		})
	})
}
// 上传图片
function upLoadImg(url,filePath){
	if(!filePath){
		throw new Error('请传入本地图片路径')
		return false
	}
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			filePath,
			name: 'FIMG',
			url: `${serverUrl}${url}`,
			header: {
				"content-type": "application/json;charset=UTF-8"
			},
			formData: {
				file: filePath
			},
			success(res){
				resolve(JSON.parse(res.data).newFile)
			},
			file(err){
				console.log('上传失败',err);
			}
		})
	})


}
module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.postParamsRequest = postParamsRequest;
module.exports.upLoadImg = upLoadImg