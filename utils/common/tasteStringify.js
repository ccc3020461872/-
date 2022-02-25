export default (info=[]) => {
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