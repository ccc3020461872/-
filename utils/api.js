import {
	getRequest,
	postRequest,
	postParamsRequest,
	upLoadImg //上传图片
} from './http' //引入同级目录下的http.js

export const appid = 'wx2f57533e49b7b99b'
export const tmplIds = ['M3ccxWsK1Zom-xnqlWHYPr4qDH3mJxWPG_4tiX3KkE0']
export const storeName = '玛玛哈哈韩式料理'
export const phone = '18902262551' //个人中心客服电话

//用户登陆
export const userLogin = data => getRequest(`/applets/appGetOpenid`, data);

//商家端新接口////////////////////////////////////////////////////////////
// 发送验证码
export const sendMassage = data => getRequest(`/business/API_2011_sendMassage`, data);
// 验证验证码及登录
export const checkCode = data => getRequest(`/business/API_2012_checkCode`, data);
// 设置公告
export const setShopNotice = data => getRequest(`/business/API_2002_setShopNotice`, data);
// 设置订单默认备
export const setOrderRemarks = data => getRequest(`/business/API_2003_setOrderRemarks`, data);
// 查看订单默认备注
export const getOrderRemarks = data => getRequest(`/business/API_2004_getOrderRemarks`, data);
// 设置取餐号
export const setTableNumber = data => getRequest(`/business/API_2001_setTableNumber`, data);
// 打票机视频
export const getOneConfig = data => getRequest(`applets/getOneConfig`, data);
// 设置打票机
export const setPrinter = data => getRequest(`/business/API_2013_setPrinter`, data);


// 添加桌贴码
export const addTableNumberManage = data => getRequest(`/business/API_2014_addTableNumberManage`, data)
// 查询桌贴码
export const selectTableNumberManage = data => getRequest(`/business/API_2019_selectTableNumberManage`, data)
// 修改桌贴码
export const updateTableNumberManage = data => getRequest(`/business/API_2015_updateTableNumberManage`, data)
// 创建商品
export const addGoods = data => getRequest(`/business/Api_2060_addGoods`, data)
// 查询辅料列表
export const accessoriesList = data => getRequest(`/business/Api_2034_accessoriesList`, data)
// 新增辅料
export const addAccessories = data => getRequest(`/business/Api_2035_addAccessories`,data)
// 删除辅料
export const deleteAccessories = data => getRequest(`/business/Api_2037_deleteAccessories`,data)
// 修改辅料
export const updateAccessories = data => getRequest(`/business/Api_2036_updateAccessories`,data)
// 商品分类新增
export const addGoodsCategory = data => getRequest(`/business/Api_2033_addGoodsCategory`,data)
// 分类查询
export const goodsCategory = data => getRequest(`/business/Api_2031_goodsCategory`,data)
// 分类修改
export const updateGoodsCategory = data => getRequest(`/business/Api_2032_updateGoodsCategory`,data)
// 删除分类  
export const deteleCategory = data => getRequest(`/business/Api_9034_deteleCategory`,data)
// 分类排序 
export const  goodsCategorySort = data => getRequest(`/business/Api_2021_goodsCategorySort`,data)
// 新增口味  
export const  addSpecificationsGroup = data => getRequest(`/business/Api_2052_addSpecificationsGroup`,data)
// 查询喜好标签
export const  goodsLike = data => getRequest(`/business/Api_2022_goodsLike`,data)
// 商品排序
export const  goodsSort = data => getRequest(`/business/Api_2023_goodsSort`,data)
// 商品上下架
export const  updateGoodsNew = data => getRequest(`/business/Api_9002_updateGoodsNew`,data)
// 上传文件 
export const uploadFileCOS = data => upLoadImg(`/applets/uploadFileCOS`, data)












// 商家端旧接口///////////////////////////////////////////////////////////////////

// 登录
export const bossLogin = data => getRequest(`/boss/bossLogin`, data);
//营业汇总
export const orderStatistics = data => getRequest(`/boss/orderStatistics`, data);
//营销效果
export const getOrderEffect = data => getRequest(`/boss/getOrderEffect`, data);
//营业明细
export const salesStatistics = data => getRequest(`/boss/salesStatistics`, data);

// 已交互===========================================================
// 搜索商品
export const goodsSearch = data => getRequest(`/boss/Api_1001_goodsSearch`, data);
//商品上下架列表
// export const goodsList = data => getRequest(`/boss/goodsList`, data);
//商品分类查询
// export const goodsCategory = data => getRequest(`/boss/Api_1004_goodsCategory`, data);
//商品分类修改
export const updateGoodsCate = data => getRequest(`/boss/Api_1005_updateGoodsCategory`, data);
//新增商品分类
export const addGoodsCate = data => getRequest(`/boss/Api_1006_addGoodsCategory`, data);
// 删除类目
// export const deteleCategory = data => getRequest(`/boss/Api_1034_deteleCategory`, data);
//单商品上下架
export const updateGoods = data => getRequest(`/boss/updateGoods`, data);
//批量商品上下架
// export const updateGoodsNew = data => getRequest(`/boss/Api_1002_updateGoodsNew`, data);
//商品置顶
export const goodsTop = data => getRequest(`/boss/Api_1033_goodsTop`, data);
//修改商品类目
export const updateCategory = data => getRequest(`/boss/Api_1009_updateCategory`, data);
//新增商品规格组
export const addGuige = data => getRequest(`/boss/Api_1020_addSpecificationsGroup`, data);
//删除商品规格组
export const delectGuige = data => getRequest(`/boss/Api_1020_deleteSpecificationsGroup`, data);
// 新增规格
export const addSpecifications = data => getRequest(`/boss/Api_1030_addSpecifications`, data);
// 修改规格
export const updateSpecifications = data => getRequest(`/boss/Api_1031_updateSpecifications`, data);
// 删除规格
export const deteleSpecifications = data => getRequest(`/boss/Api_1032_deteleSpecifications`, data);
// 规格组下的规格查询
export const selectSpecificationsList = data => getRequest(`/boss/Api_1037_selectSpecificationsList`, data);
//商品标签列表
export const goodsLabList = data => getRequest(`/boss/Api_1010_goodsLabel`, data);
//修改商品标签
export const updateLabel = data => getRequest(`/boss/Api_1011_updateLabel`, data);
//新增商品标签
export const addLabel = data => getRequest(`/boss/Api_1012_addLabel`, data);
//删除商品标签
export const deleteLabel = data => getRequest(`/boss/Api_1029_deleteLabel`, data);
//商品辅料列表
export const acesList = data => getRequest(`/boss/Api_1013_accessoriesList`, data);
//新增辅料
export const addAces = data => getRequest(`/boss/Api_1014_addAccessories`, data);
//更新辅料
export const updateAces = data => getRequest(`/boss/Api_1015_updateAccessories`, data);
//删除辅料
export const delectAces = data => getRequest(`/boss/Api_1016_deleteAccessories`, data);
// 添加商品
// export const addGoods = data => getRequest(`/boss/Api_1026_addGoods`, data);
// 修改商品
export const updateGoods1 = data => getRequest(`/boss/Api_1038_updateGoods`, data);
//商品单位
export const getGoodsCompany = data => getRequest(`/boss/Api_1025_getGoodsCompany`, data);
// 上传图片
// export const uploadFileCOS = data => uploadFile(`/applets/uploadFileCOS`, data);
//商品打包费设置
export const packSet = data => getRequest(`/boss/Api_1003_amountOfPackaging`, data);
//商品打包费批量设置
export const packFee = data => getRequest(`/boss/Api_1007_packFee`, data);
//商品规格组
export const goodGuige = data => getRequest(`/boss/Api_1028_goodsSpecificationsGroupList`, data);
//修改商品规格组
export const updateGoodsSpecifications = data => getRequest(`/boss/Api_1036_updateGoodsSpecifications`, data);
// 修改商品辅料
export const updateGoodsAccessories = data => getRequest(`/boss/Api_1039_updateGoodsAccessories`, data);



//修改密码
export const updatePassword = data => getRequest(`/boss/updatePassword`, data);


//删除商品
export const delectGoods = data => getRequest(`/boss/Api_1008_deleteGoods`, data);



//商品辅料关系增加
export const addAcesGoods = data => getRequest(`/boss/Api_1017_addAccessoriesGoods`, data);
//商品辅料查询
export const acesGoodsList = data => getRequest(`/boss/Api_1018_accessoriesGoodsList`, data);
//店铺规格组查询
export const guigeList = data => getRequest(`/boss/Api_1019_specificationsGroupList`, data);

//单个商品标签列表
export const goodLab = data => getRequest(`/boss/Api_1027_goodsNewLabel`, data);






// 优惠券创建
export const addCoupon = data => getRequest('/boss/Api_1022_addCoupon', data)
// 新营业汇总
export const newOrderStatistics = data => getRequest('/boss/Api_1021_newOrderStatistics', data)
// 收支明细
export const orderDataStatistics = data => getRequest('/boss/Api_1023_orderDataStatistics', data)
// 新营销效果
export const getNewOrderEffect = data => getRequest('/boss/Api_1024_getNewOrderEffect', data)