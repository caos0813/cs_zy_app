import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import * as WeChat from 'react-native-wechat'
import { View, Button, Text, Assets, Image, Card, RadioGroup, RadioButton, Avatar, TextInput } from '../../react-native-ui-lib/'
import Modal from 'react-native-modalbox'
import { ratio, api, axios, Toast, width } from '../utils'
import { colors } from '../theme'
const items = ['智能填报志愿表', '志愿合理性分析', '招生信息查询', '专家咨询服务']
const listItems = [{
  title: '最科学的填报志愿方法',
  text: '50位专家共同参与设计的科学填报法，为你定制最佳的志愿方案。根据你的高考分数推荐最合适的大学及专业',
  img: 'payitem01'
}, {
  title: '最精准的数据支撑',
  text: '院校、专业录取数据、招生计划与考试院同步更新。根据你的高考分数推荐最合适的大学及专业',
  img: 'payitem02'
}, {
  title: '最专业的生涯顾问服务',
  text: '生涯规划专家、教育专家、高级教师实时指导，为学生提供精准定制服务，辅助生涯规划决策。根据你的高考分数推荐最合适的大学及专业',
  img: 'payitem03'
}, {
  title: '最智能的生涯测评',
  text: '为你提供最全面、最客观的”专业“评价，让你更多元、更深入的了解专业。',
  img: 'payitem04'
}, {
  title: '最全面的大学、专业、职业库',
  text: '生动、形象的介绍，让你更多元、更深入地了解大学、专业、职业。',
  img: 'payitem05'
}, {
  title: '最实用的生涯规划课程',
  text: '帮助学生探索自我和外部变化的环境，找到人生努力的方向，最大化实现自我价值。',
  img: 'payitem06'
}]
@inject('userStore', 'payStore')
@observer class Pay extends Component {
  render () {
    const { payType, setValue, payAmount, wechatInstall } = this.props.payStore
    const { isVipValid } = this.props.userStore
    return (
      <View flex useSafeArea bg-stable >
        <View flex style={{ zIndex: 0 }}>
          <ScrollView>
            <View paddingH-12 paddingV-3 center>
              <Image assetName='card' style={styles.imgStyle} />
            </View>
            <View center padding-25 row>
              <Image assetName='vip' />
              <Text text-18 marginH-5>知涯志愿专享功能</Text>
              <Image assetName='vip' />
            </View>
            <View row paddingH-20 style={styles.itemWrap}>
              {items.map((item, index) => (
                <View center style={styles.item} key={index} marginB-8>
                  <Image assetName={`pay0${index + 1}`} />
                  <View marginV-2><Image assetName='select' /></View>
                  <Text text-16 dark06 marginL-5>{item}</Text>
                </View>
              ))}
            </View>
            <View center row padding-25>
              <Image assetName='vip' />
              <Text text-18 marginH-5 >特色功能介绍</Text>
              <Image assetName='vip' />
            </View>
            <View style={styles.listWrap} paddingH-25>
              {listItems.map((item, index) => (
                <View key={index} marginB-15>
                  <View row centerV>
                    <Image assetName='select' />
                    <Text text-18 dark marginL-5 >{item.title}</Text>
                  </View>
                  <Text marginT-2 marginB-10 text-13 gray>{item.text}</Text>
                  <Image assetName={item.img}
                    style={{ width: '100%', height: (width - 50) * 165 / 315 }}
                  />
                </View>
              ))}
            </View>
            <View paddingH-20 paddingV-30 >
              <Card borderRadius={8} enableShadow={false}>
                <Card.Item row>
                  <View padding-11 flex center>
                    <Text text-16 dark06 >适用人群说明</Text>
                  </View>
                </Card.Item>
                <Card.Item>
                  <View paddingH-15 paddingB-20>
                    <Text text-12 gray marginT-4>适用考生：普通类文理科考生（新高考省份即将上线）</Text>
                    <Text text-12 gray marginT-4>适用批次：普通类非提前批 </Text>
                    <Text text-12 gray marginT-4>适用范围：全国（内蒙古、青海、西藏、云南除外）</Text>
                    <Text text-12 gray marginT-4>有 效   期：1年</Text>
                  </View>
                </Card.Item>
              </Card>
            </View>

          </ScrollView>
          <View paddingV-8 centerV paddingH-13 bg-light style={styles.footer} row spread>
            {isVipValid === 2 ? <Text dark06 text-14>我的志愿卡</Text> : <Text calm text-28>¥{payAmount}</Text>}
            {isVipValid === 2 ? <Button bg-calm label='已开通' disabled /> : <Button bg-calm label='开通' onPress={() => this.openModel()} />}
          </View>
        </View>
        <Modal ref='modal' style={styles.modal} backdropPressToClose={false}>
          <View center padding-8 >
            <Text text-20 dark>选择支付方式</Text>
            <Avatar imageSource={Assets.icons.close} containerStyle={styles.closeWrap} backgroundColor='transparent' imageStyle={styles.closeImage} onPress={() => this.refs.modal.close()} />
          </View>
          {payType === 'wechat' &&
            <View center padding-10>
              <Text calm text-28>¥{payAmount}</Text>
            </View>
          }
          <RadioGroup value={payType} onValueChange={e => setValue('payType', e)}>
            <View row centerV spread style={[styles.payItem, !wechatInstall && { display: 'none' }]}>
              <View row centerV>
                <Image assetName='wechat' />
                <Text marginL-25>微信支付</Text>
              </View>
              <RadioButton color={colors.balanced} value='wechat' size={18} imageSource={Assets.icons.select} imageProps={{ resizeMode: 'cover' }} />
            </View>
            <View row centerV spread style={styles.payItem}>
              <View row centerV>
                <Image assetName='vip' style={{ width: 28, height: 25 }} />
                <Text marginL-25>激活志愿卡</Text>
              </View>
              <RadioButton color={colors.balanced} value='vip' size={18} imageSource={Assets.icons.select} imageProps={{ resizeMode: 'cover' }} />
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
  openModel = () => {
    const { setValue } = this.props.payStore
    setValue('cardNumber', '')
    setValue('password', '')
    this.refs.modal.open()
  }
  pay = () => {
    const { payAmount, payType, cardNumber, password } = this.props.payStore
    const { userInfo, getUserInfo } = this.props.userStore
    const { goBack } = this.props.navigation
    if (payType === 'wechat') {
      axios.post(api.wxPay, {
        payAmount
      }).then(async (data) => {
        await WeChat.pay({
          partnerId: data.partnerid,
          prepayId: data.prepayid,
          nonceStr: data.noncestr,
          timeStamp: data.timestamp,
          package: data.package,
          sign: data.sign
        }).then(result => {
          // alert(JSON.stringify(result))
          if (result.errCode === 0) {
            getUserInfo()
            Toast('激活成功')
            goBack()
          } else {
            Toast(result.errStr)
          }
        }).catch(() => {
          Toast('用户取消')
          // alert(JSON.stringify(err))
        })
      }).catch(() => {
        Toast('创建订单失败')
      })
    } else {
      if (!cardNumber.length || !password.length) {
        Toast('请输入卡号和密码')
      } else {
        axios.post(api.bindingCard, {
          cardNumber,
          password,
          fromApp: true,
          phoneNumber: userInfo.phoneNumber
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
    WeChat.isWXAppInstalled().then(result => {
      setValue('wechatInstall', result)
      if (result) {
        setValue('payType', 'wechat')
      } else {
        setValue('payType', 'vip')
      }
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
    zIndex: 99
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
