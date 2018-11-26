import React, { Component } from 'react'
import { Text, View, Avatar, Image, Button, Card, ListItem } from '../../react-native-ui-lib'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native'
import { colors } from '../theme'
import { ratio, dialog, OpenUrl, formatDate, imageFormat } from '../utils'
import { NavigationActions, StackActions } from 'react-navigation'
import DeviceInfo from 'react-native-device-info'
import Config from 'react-native-config'

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
    const { dispatch } = this.props.navigation
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    })
    dialog.confirm('确定退出登录吗?').then(() => {
      setUserInfo({})
      clear()
      dispatch(resetAction)
    })
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openBrowser(path, query, auth)
  }
  render () {
    const { userInfo, isVipValid } = this.props.userStore
    const { navigate } = this.props.navigation
    const { version } = this.props
    return (
      <View flex useSafeArea>
        <ScrollView>
          <View row top paddingH-25 paddingV-15 style={styles.infoWrap}>
            <View row>
              <Avatar containerStyle={styles.avatar} imageStyle={{ width: 50, height: 50 }} imageSource={imageFormat(userInfo.image, userInfo.gender)}
                backgroundColor={userInfo.image ? 'transparent' : colors.stable}
                onPress={() => navigate('Mine')}
              />
              <View paddingL-10 paddingR-24>
                <View row>
                  <Text text-22>{userInfo.name}</Text>
                  {isVipValid === 2 && <Image assetName='vipIcon' style={styles.vipIcon} />}
                </View>
                {isVipValid === 0 && <Text text-13 dark06>您还未开通升学卡</Text>}
                {isVipValid === 2 && <Text text-13 positive>升学卡有效期至{formatDate(userInfo.endDate, 'yyyy-MM-dd')}</Text>}
                {isVipValid === 1 && <Text text-13 positive>体验卡有效期至{formatDate(userInfo.endDate, 'yyyy-MM-dd')}</Text>}
              </View>
            </View>
            {isVipValid !== 2 && <Button bg-assertive label='开通升学卡' size='small' marginT-12 onPress={() => navigate('Pay')} />
            }
            <Image assetName='vipImg' style={styles.vipImg} tintColor={isVipValid === 2 ? colors.calm : colors.grey} />
          </View>
          <View row paddingH-11 marginV-20>
            <Card containerStyle={styles.card} onPress={() => navigate('Info')} elevation={1}>
              <Text text-18 dark>我的信息</Text>
            </Card>
            <Card containerStyle={styles.card} onPress={() => this.openUrl('favorite', {}, true)} elevation={1}>
              <Text text-18 dark>我的关注</Text>
            </Card>
          </View>
          <View>
            <ListItem style={styles.item} height={42} onPress={() => navigate('Pay')}>
              <ListItem.Part left>
                <Text text-18 dark>会员中心</Text>
              </ListItem.Part>
              <ListItem.Part >
                <Image assetName='arrowRight' />
              </ListItem.Part>
            </ListItem>
            <ListItem style={styles.item} height={42} onPress={() => navigate('Feedback')}>
              <ListItem.Part left>
                <Text text-18 dark>反馈</Text>
              </ListItem.Part>
              <ListItem.Part >
                <Image assetName='arrowRight' />
              </ListItem.Part>
            </ListItem>
            <ListItem style={styles.item} height={42} onPress={() => navigate('About')}>
              <ListItem.Part left>
                <Text text-18 dark>关于</Text>
              </ListItem.Part>
              <ListItem.Part >
                {Config.ENV !== 'production' && <Text marginR-8>test</Text>}
                <Text gray marginR-10>v{version}</Text>
                <Image assetName='arrowRight' />
              </ListItem.Part>
            </ListItem>
          </View>
          <View paddingT-100 paddingH-50>
            <Button label='退出登录' bg-calm text-18 onPress={this.signOut} />
          </View>
        </ScrollView>
      </View>
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
    height: 100
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
    width: 50,
    height: 50,
    zIndex: 1
  },
  vipIcon: {
    width: 26,
    height: 24
  },
  card: {
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 13,
    flex: 1,
    marginHorizontal: 4
  },
  item: {
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1 / ratio
  }
})
