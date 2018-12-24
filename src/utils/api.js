export default {
  sendSms: '/login/weblogin/sendSms/',
  /* 登录 */
  webLogin: '/login/weblogin/checkCode',
  /* 完善信息 */
  personData: '/login/weblogin/personData',
  /* 热门专题 */
  getArticleFile: 'zhiyuan/article/getArticleFile',
  /* 获取用户数据 */
  getUserInfo: '/user/users/current',
  /* 查询是否测评 */
  isFinishTest: '/zhiyuan/holland/isFinishTest',
  /* 查询是否测评 */
  area: '/user/static/area',
  /* 查询学校 */
  schoolList: '/user/schools/search/findByDistrict_Id',
  updateUserInfo: '/user/users/updateUserInfo',
  wxPay: 'zhiyuan/wxPay/wxPrePay',
  getPayAmount: 'zhiyuan/wxPay/getPayAmount',
  feedback: 'xuanke/userInformation/saveFeedback',
  /* 绑定卡 */
  bindingCard: '/login/weblogin/binding',
  /* 开通体验卡 */
  tiralBinding: '/login/weblogin/tiralBinding',
  /* oss权限 */
  getAssumeRole: 'user/ossUtil/getAssumeRole',
  /* banner列表 */
  queryHomePageBannerInfo: '/content/bannerInfo/queryHomePageBannerInfo',
  /* 查询各个模块下的专题-文章 */
  queryModuleArticleInfo: '/content/articleInfo/queryModuleArticleInfo',
  /* 文章详情 */
  queryArticleInfoDetails: '/content/articleInfo/queryArticleInfoDetails',
  /* 文章下更多 */
  queryArticleInfoViewMore: '/content/articleInfo/queryArticleInfoViewMore',
  /* 专题-查看更多 */
  queryViewMore: '/content/articleInfo/queryViewMore',
  /* 获取随机7个职业标签数据 */
  queryCareerInterest: '/zhiyuan/careerGroup/queryCareerInterest',
  /* 职业族群展示列表 */
  queryCareerGroupParent: '/zhiyuan/careerGroup/queryCareerGroupParent'
}
