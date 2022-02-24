export default function(url,data='') {
  const arr = []
  if(!url){
    wx.navigateBack({
      delta: 1,
    })
    return
  }
  if(data){
    for(let key in data){
      arr.push(`${key}=${data[key]}`)
    }
  }
  console.log(arr);
  wx.navigateTo({
    url: `${url}?${arr.join('&')}`,
  })
}