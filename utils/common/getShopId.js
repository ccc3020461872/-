export default() => {
  return new Promise((resolve,reject)=>{
    wx.getStorage({
      key: 'shopid',
      success(res){
        resolve(res.data)
        console.log(res)
      },
      fail(err){
        throw new Error('为获取到shopid')
      }
    })
  })
}