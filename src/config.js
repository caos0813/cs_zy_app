const config = {
  dev: {
    baseUrl: 'http://192.168.1.169:8763',
    webUrl: 'http://192.168.1.41:8080/#/'
  },
  stating: {
    baseUrl: 'http://192.168.1.142:8763',
    webUrl: 'http://192.168.1.25:8080/#/'
  },
  release: {}
}
/* 每次发布版本需要更新这里的配置 */
export default config['stating']
