import Config from 'react-native-config'
let config = {}
if (Config.ENV === 'development') {
  // config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.WEB_URL = 'http://192.168.1.167:8080/#/'
} else if (Config.ENV === 'staging') {
  config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.WEB_URL = 'http://m.zhiyazhiyuan.com:8080/#/'
} else if (Config.ENV === 'production') {
  config.BASE_URL = 'https://wechat.junyanginfo.com/'
  config.WEB_URL = 'http://m.zhiyazhiyuan.com/#/'
}
export default config
