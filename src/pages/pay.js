import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import * as WeChat from 'react-native-wechat'
import { View, Button, Text, Assets, Image, Card, RadioGroup, RadioButton, Avatar, TextInput } from '../../react-native-ui-lib/'
import Modal from 'react-native-modalbox'
import { ratio, api, axios, Toast } from '../utils'
import { colors } from '../theme'
import assets from '../../react-native-ui-lib/src/assets'
Assets.loadAssetsGroup('icons', {
  card: require('../assets/pay/card.png'),
  vip: require('../assets/pay/vip.png'),
  wechat: require('../assets/pay/wechat.png'),
  select: require('../assets/icons/checked.png'),
  close: require('../assets/icons/close.png')
})
const items = ['智能填报志愿表', '最全职业库', '权威测评', '信息最快同步', '志愿合理性分析', '录取率分析']
const listItems = [{
  title: '模拟填报志愿表',
  text: '根据你的高考分数推荐最合适的大学及专业,根据你的高考分数推荐最合适的大学及专业',
  leftImg: 'http://5b0988e595225.cdn.sohucs.com/images/20180524/ba57f10d665f48bcaf8a313eaacdd7c3.jpeg',
  img: 'http://5b0988e595225.cdn.sohucs.com/images/20180524/ba57f10d665f48bcaf8a313eaacdd7c3.jpeg'
}, {
  title: '模拟填报志愿表',
  text: '根据你的高考分数推荐最合适的大学及专业,根据你的高考分数推荐最合适的大学及专业',
  leftImg: 'http://5b0988e595225.cdn.sohucs.com/images/20180524/ba57f10d665f48bcaf8a313eaacdd7c3.jpeg',
  img: 'http://5b0988e595225.cdn.sohucs.com/images/20180524/ba57f10d665f48bcaf8a313eaacdd7c3.jpeg'
}, {
  title: '模拟填报志愿表',
  text: '根据你的高考分数推荐最合适的大学及专业,根据你的高考分数推荐最合适的大学及专业',
  leftImg: 'http://5b0988e595225.cdn.sohucs.com/images/20180524/ba57f10d665f48bcaf8a313eaacdd7c3.jpeg',
  img: 'http://5b0988e595225.cdn.sohucs.com/images/20180524/ba57f10d665f48bcaf8a313eaacdd7c3.jpeg'
}]
@inject('userStore', 'payStore')
@observer class Pay extends Component {
  render () {
    const { payType, setValue, payAmount } = this.props.payStore
    return (
      <View flex useSafeArea bg-stable >
        <View flex style={{ zIndex: 0 }}>
          <ScrollView>
            <View paddingH-12 paddingV-3>
              <Image assetName='card' style={styles.imgStyle} />
            </View>
            <View center padding-25>
              <Text text-18>知涯升学专享功能</Text>
            </View>
            <View row paddingH-20 style={styles.itemWrap}>
              {items.map((item, index) => (
                <View row centerV style={styles.item} key={index} marginB-8>
                  <View row centerV>
                    <Image assetName='vip' />
                    <Text text-15 dark06 marginL-5>{item}</Text>
                  </View>
                  <Image assetName='select' />
                </View>
              ))}
            </View>
            <View paddingH-20 paddingT-30 >
              <Card borderRadius={8}>
                <Card.Item row>
                  <View padding-11 flex center>
                    <Text text-16 dark06 >适用人群说明</Text>
                  </View>
                </Card.Item>
                <Card.Item>
                  <Text text-12 gray marginH-15 marginB-20 marginT-4>图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络图片来自网络</Text>
                </Card.Item>
              </Card>
            </View>
            <View center padding-25>
              <Text text-18>特色功能介绍</Text>
            </View>
            <View style={styles.listWrap} paddingH-20>
              {listItems.map((item, index) => (
                <View row key={index} marginB-10>
                  <Image source={{ uri: item.leftImg }}
                    style={{ width: 50, height: 40 }}
                  />
                  <View paddingH-10>
                    <Text dark06 text-16>{item.title}</Text>
                    <Text text-12 gray>{item.text}</Text>
                    <Image source={{ uri: item.img }}
                      style={{ width: 180, height: 120 }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View paddingV-8 paddingH-13 bg-light style={styles.footer} row spread>
            <Text calm text-28>¥{payAmount}</Text>
            <Button bg-calm label='开通' onPress={() => this.refs.modal.open()} />
          </View>
        </View>
        <Modal ref='modal' style={styles.modal} backdropPressToClose={false}>
          <View center padding-8 >
            <Text text-20 dark>选择支付方式</Text>
            <Avatar imageSource={assets.icons.close} containerStyle={styles.closeWrap} backgroundColor='transparent' imageStyle={styles.closeImage} onPress={() => this.refs.modal.close()} />
          </View>
          {payType === 'wechat' &&
          <View center padding-10>
            <Text calm text-28>¥{payAmount}</Text>
          </View>
          }
          <RadioGroup value={payType} onValueChange={e => setValue('payType', e)}>
            <View row centerV spread style={styles.payItem}>
              <View row centerV>
                <Image assetName='wechat' />
                <Text marginL-25>微信支付</Text>
              </View>
              <RadioButton color={colors.balanced} value='wechat' size={18} imageSource={assets.icons.select} imageProps={{ resizeMode: 'cover' }} />
            </View>
            <View row centerV spread style={styles.payItem}>
              <View row centerV>
                <Image assetName='vip' style={{ width: 28, height: 25 }} />
                <Text marginL-25>激活志愿卡</Text>
              </View>
              <RadioButton color={colors.balanced} value='vip' size={18} imageSource={assets.icons.select} imageProps={{ resizeMode: 'cover' }} />
            </View>
          </RadioGroup>
          {payType === 'vip' && <View paddingT-15>
            <View row centerV marginB-10>
              <Text marginR-25>卡号</Text>
              <TextInput placeholder='请输入卡号' containerStyle={styles.inputWrap} hideUnderline text-15 enableErrors={false} onChangeText={val => setValue('cardNumber', val)} />
            </View>

            <View row centerV>
              <Text marginR-25>密码</Text>
              <TextInput placeholder='请输入密码' containerStyle={styles.inputWrap} hideUnderline text-15 enableErrors={false} onChangeText={val => setValue('password', val)} secureTextEntry
              />
            </View>

          </View>
          }
          <View center paddingV-28>
            <Button bg-calm label={payType === 'wechat' ? '支付' : '激活'} onPress={this.pay} />
          </View>
        </Modal>
      </View>
    )
  }
  pay = () => {
    const { payAmount, payType, cardNumber, password } = this.props.payStore
    const { userInfo, getUserInfo } = this.props.userStore
    const { goBack } = this.props.navigation
    if (payType === 'wechat') {
      axios.post(api.wxPay, {
        payAmount
      }).then(data => {
        WeChat.pay({
          partnerId: data.partnerid,
          prepayId: data.prepayid,
          nonceStr: data.noncestr,
          timeStamp: data.timestamp,
          package: data.package,
          sign: data.sign
        }, result => {
          if (result.errCode === 0) {
            getUserInfo()
            Toast('激活成功')
            goBack()
          } else {
            Toast(result.errStr)
          }
        })
      })
    } else {
      if (!cardNumber.length || !password.length) {
        Toast('请输入卡号和密码')
      } else {
        axios.post(api.bindingCard, {
          cardNumber,
          password,
          phoneNumber: userInfo.phoneNum
        }).then(data => {
          getUserInfo()
          Toast('激活成功')
          goBack()
        }).catch(err => {
          Toast(err.message)
        })
      }
    }
  }
  componentDidMount () {
    const { setValue } = this.props.payStore
    axios.get(api.getPayAmount).then(data => {
      setValue('payAmount', data.payAmount)
    }).catch(e => {
      setValue('payAmount', 0.00)
    })
    // this.refs.modal.open()
  }
}
export default Pay
const styles = StyleSheet.create({
  payItem: {
    borderColor: colors.grey,
    borderBottomWidth: 1 / ratio,
    paddingVertical: 15
  },
  inputWrap: {
    height: 32,
    flex: 1,
    borderColor: colors.grey,
    borderWidth: 1 / ratio,
    paddingHorizontal: 10,
    borderRadius: 16
  },
  modal: {
    top: 160,
    left: 0,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 25,
    zIndex: 1001
  },
  closeWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0
  },
  closeImage: {
    width: 17,
    height: 11,
    position: 'relative'
  },
  itemWrap: {
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    justifyContent: 'space-between',
    width: 150
  },
  itemImgLeft: {
    width: 19,
    height: 17
  },
  footer: {
    elevation: 2
  }
})
