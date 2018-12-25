import Config from 'react-native-config'
let config = {}
if (Config.ENV === 'development') {
  config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.WEB_URL = 'http://codepush.junyanginfo.com:8080/#/'
<<<<<<< HEAD
  config.BASE_URL = 'http://192.168.1.142:8763'
  // config.WEB_URL = 'http://codepush.junyanginfo.com:8080/#/'
=======
>>>>>>> 5a12dab2d3f5c650cb77b857128316b9a38cf1e9
} else if (Config.ENV === 'staging') {
  config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.WEB_URL = 'http://codepush.junyanginfo.com:8080/#/'
} else if (Config.ENV === 'production') {
  config.BASE_URL = 'https://wechat.junyanginfo.com/'
  config.WEB_URL = 'http://codepush.junyanginfo.com/#/'
}
export default config
