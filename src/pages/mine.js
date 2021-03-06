import React, { Component } from 'react'
import { Text, View, Avatar, Image, Button, ListItem } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native'
import { colors } from '../theme'
import { ratio, dialog, OpenUrl, formatDate, imageFormat } from '../utils'
import { NavigationActions } from 'react-navigation'
import DeviceInfo from 'react-native-device-info'
import Config from 'react-native-config'
import { Header } from '../components'
@inject('userStore', 'infoStore')
@observer class Info extends Component {
  static defaultProps = {
    version: DeviceInfo.getVersion()
  }
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
  }
  signOut = () => {
    const { setUserInfo } = this.props.userStore
    const { clear } = this.props.infoStore
    const { reset } = this.props.navigation
    dialog.confirm('确定退出登录吗?').then(() => {
      setUserInfo({})
      clear()
      reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
    })
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  openNative = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  render () {
    const { userInfo, isVipValid } = this.props.userStore
    const { navigate } = this.props.navigation
    const { version } = this.props
    return (
      <View flex style={{ backgroundColor: colors.lightGrey }} >
        <Header showLeft={false} title='我的' />
        <ScrollView>
          <View row top paddingL-25 paddingR-18 paddingV-35 style={styles.infoWrap}>
            <View style={{ alignItems: 'center' }} row>
              <Avatar containerStyle={styles.avatar} imageStyle={{ width: 72, height: 72 }} imageSource={imageFormat(userInfo.image, userInfo.gender)}
                backgroundColor={userInfo.image ? 'transparent' : colors.stable}
                onPress={() => navigate('Mine')}
              />
              <View paddingL-10 paddingR-15>
                <View row>
                  <Text black text-22>{userInfo.token ? userInfo.name : '未登录'}</Text>
                  {(isVipValid === 2) && <Image assetName='vipIcon' style={styles.vipIcon} />}
                </View>
                {!userInfo.token && <Text text-13 dark06>请先登录</Text>}
                {isVipValid === 0 && <Text text-13 dark06>您还未开通VIP</Text>}
                {isVipValid === 2 && <Text text-13 calm>VIP有效期至{formatDate(userInfo.endDate, 'yyyy-MM-dd')}</Text>}
                {isVipValid === 1 && <Text text-13 calm>体验卡有效期至{formatDate(userInfo.endDate, 'yyyy-MM-dd')}</Text>}
              </View>
            </View>
            {/* labelStyle={{ marginTop: 6 }} */}
            {(isVipValid !== 2 && userInfo.token) && <Button style={{ height: 32, lineHeight: 32 }} bg-calm label='开通VIP' size='small' marginT-12 onPress={() => navigate('Pay')} />
            }
            {(isVipValid === 2 && userInfo.token) && <Button style={{ backgroundColor: colors.lightGrey, height: 32, lineHeight: 32 }} labelStyle={{ display: 'flex', alignItems: 'center' }} dark06 label='已开通VIP' size='small' marginT-12 disabled />
            }
            {!userInfo.token && <Button style={{ height: 32, lineHeight: 32 }} bg-calm label='登录' size='small' marginT-12 onPress={() => navigate('Login')} />
            }
            {/* {userInfo.token && <Image assetName='vipImg' style={styles.vipImg} tintColor={isVipValid === 2 ? colors.calm : colors.grey} />} */}
          </View>
          <View>
            <ListItem style={[styles.item, { borderTopWidth: 5 / ratio, borderTopColor: colors.lightGrey }]} height={50} onPress={() => this.openNative('Info', {}, true)}>
              <ListItem.Part left containerStyle={{ paddingRight: 10 }}>
                <Image assetName='info' assetGroup='mine' />
              </ListItem.Part>
              <ListItem.Part containerStyle={{ flex: 1 }}>
                <Text text-16 dark>我的资料</Text>
              </ListItem.Part>
              <ListItem.Part >
                <Image assetName='small_arrowRight' />
              </ListItem.Part>
            </ListItem>
            <ListItem style={styles.item} height={50} onPress={() => this.openUrl('favorite', {}, true)} elevation={1}>
              <ListItem.Part left containerStyle={{ paddingRight: 10 }}>
                <Image assetName='star' assetGroup='mine' />
              </ListItem.Part>
              <ListItem.Part containerStyle={{ flex: 1 }}>
                <Text text-16 dark>我的收藏</Text>
              </ListItem.Part>
              <ListItem.Part >
                <Image assetName='small_arrowRight' />
              </ListItem.Part>
            </ListItem>
            <ListItem style={[styles.item, { borderBottomWidth: 0 }]} height={50} onPress={() => this.openNative('Pay', {}, true)}>
              <ListItem.Part left containerStyle={{ paddingRight: 10 }}>
                <Image assetName='vip_center' assetGroup='mine' />
              </ListItem.Part>
              <ListItem.Part containerStyle={{ flex: 1 }}>
                <Text text-16 dark>会员中心</Text>
              </ListItem.Part>
              <ListItem.Part >
                <Image assetName='small_arrowRight' />
              </ListItem.Part>
            </ListItem>
            <ListItem style={[styles.item, { borderTopWidth: 5 / ratio, borderTopColor: colors.lightGrey }]} height={50} onPress={() => this.openNative('Feedback', {}, true)}>
              <ListItem.Part left containerStyle={{ paddingRight: 10 }}>
                <Image assetName='feedback' assetGroup='mine' />
              </ListItem.Part>
              <ListItem.Part containerStyle={{ flex: 1 }}>
                <Text text-16 dark>反馈</Text>
              </ListItem.Part>
              <ListItem.Part >
                <Image assetName='small_arrowRight' />
              </ListItem.Part>
            </ListItem>
            <ListItem style={[styles.item, { borderBottomWidth: 5 / ratio, borderBottomColor: colors.lightGrey }]} height={50} onPress={() => navigate('About')}>
              <ListItem.Part left containerStyle={{ paddingRight: 10 }}>
                <Image assetName='about' assetGroup='mine' />
              </ListItem.Part>
              <ListItem.Part containerStyle={{ flex: 1 }}>
                <Text text-16 dark>关于</Text>
              </ListItem.Part>
              <ListItem.Part >
                {Config.ENV !== 'production' && <Text marginR-8>test</Text>}
                <Text gray marginR-10>v{version}</Text>
                <Image assetName='small_arrowRight' />
              </ListItem.Part>
            </ListItem>
            {userInfo.token && <ListItem style={styles.signOut} height={50} onPress={this.signOut}>
              <ListItem.Part>
                <Text text-16 dark>退出</Text>
              </ListItem.Part>
            </ListItem>}
          </View>
          {/* {userInfo.token && <View paddingT-100 paddingH-50>
            <Button label='退出' bg-calm text-16 onPress={this.signOut} />
          </View>} */}
        </ScrollView>
      </View >
    )
  }
  componentDidMount () {
    DeviceEventEmitter.emit('updateUserInfo')
    // this.refs.modal.open()
  }
}
export default Info

const styles = StyleSheet.create({
  infoWrap: {
    justifyContent: 'space-between',
    height: 100,
    alignItems: 'center',
    backgroundColor: colors.light
  },
  vipImg: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 258,
    height: 99,
    zIndex: -1
  },
  avatar: {
    width: 72,
    height: 72,
    zIndex: 1,
    borderRadius: 100
  },
  vipIcon: {
    width: 18,
    height: 18,
    marginTop: -5
  },
  card: {
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 13,
    flex: 1,
    marginHorizontal: 4
  },
  item: {
    justifyContent: 'flex-start',
    paddingLeft: 26,
    paddingRight: 15,
    borderBottomColor: colors.greyE7,
    borderBottomWidth: 1 / ratio
  },
  signOut: {
    display: 'flex',
    justifyContent: 'center'
  }
})
