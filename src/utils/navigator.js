import { StackActions, NavigationActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator (navigatorRef) {
  _navigator = navigatorRef
}

function navigate (routeName, params, key) {
  console.log(key)
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action: {},
      key
    })
  )
}
function push (routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  )
}
function goBack (routeName, params, key) {
  _navigator.dispatch(
    NavigationActions.back(key)
  )
}
function replace (routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  )
}
function reset (routeName, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: routeName, params })]
  })
  _navigator.dispatch(resetAction)
}
// add other navigation functions that you need and export them

export default {
  navigate,
  replace,
  reset,
  setTopLevelNavigator,
  push,
  goBack
}
