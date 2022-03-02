function isJson(data){
  try {
   if(typeof JSON.parse(data) == 'object'){
     return true
   }
  }catch(e){
    return false
  }
}
export default info => {
   if(isJson(info)){
    info = typeof info === 'string' ? JSON.parse(info) : info
   }else {
     return info
   }
   info = JSON.parse(JSON.stringify(info))  
   const newArr = []
   info.map((item) => {
    const arr2 = [];
    arr2.push(item.nameValue)
    item.nameNum.map(v => {
      arr2.push(v.value)
    })
    newArr.push(arr2.join('/').replace('/', ":"))
  })
  return newArr.join(',')
}