import Config from 'react-native-config'
let config = {}
if (Config.ENV === 'development') {
  config.BASE_URL = 'http://192.168.1.142:8763/'
  config.WEB_URL = 'http://192.168.1.77:8082/#/'
} else if (Config.ENV === 'staging') {
  config.BASE_URL = 'http://192.168.1.142:8763/'
  config.WEB_URL = 'http://192.168.1.77:8082/#/'
} else if (Config.ENV === 'production') {
  config.BASE_URL = 'https://wechat.junyanginfo.com/'
  config.WEB_URL = 'http://codepush.junyanginfo.com/#/'
}
export default config
