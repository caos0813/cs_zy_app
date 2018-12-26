function getUrlParams (url) {
  const urlObj = {}
  const middleStr = url.split('?')
  const paramPairStr = middleStr[1].split('&')
  paramPairStr.forEach((element) => {
    const singleParamStr = element.split('=')
    urlObj[singleParamStr[0]] = singleParamStr[1]
  })
  return urlObj
}
export default getUrlParams
