export default function (url, w, h) {
  if (url) {
    return `${url}?x-oss-process=image/resize,w_${w}` + (h ? `,h_${h}` : '')
  } else {
    return 'https://fdwebhost.oss-cn-huhehaote.aliyuncs.com/zyzy_app/images/placeholder1.png'
  }
}
