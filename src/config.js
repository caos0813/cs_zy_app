import Config from 'react-native-config'
let config = {}
if (Config.ENV === 'development') {
  // config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.WEB_URL = 'http://codepush.junyanginfo.com:8080/#/'
  config.BASE_URL = 'https://easy-mock.com/mock/5c1e530c8ea5dd6fc97e20a2/example'
  // config.WEB_URL = 'http://codepush.junyanginfo.com:8080/#/'
} else if (Config.ENV === 'staging') {
  config.BASE_URL = 'http://testapp.zhiyazhiyuan.com:8763/'
  config.WEB_URL = 'http://codepush.junyanginfo.com:8080/#/'
} else if (Config.ENV === 'production') {
  config.BASE_URL = 'https://wechat.junyanginfo.com/'
  config.WEB_URL = 'http://codepush.junyanginfo.com/#/'
}
export default config
