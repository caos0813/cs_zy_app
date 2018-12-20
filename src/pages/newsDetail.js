import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'
import { View, Text, Image, TouchableOpacity } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { ratio, height, statusBarHeight } from '../utils'
import Video from 'react-native-video'
import { Header, ItemHead } from '../components'
import { Interact } from '../scene'
import Modal from 'react-native-modalbox'
export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      html: ''
    }
  }
  onNavigationStateChange=(e) => {
    const { title } = e
    if (title) {
      this.setState({
        webviewHeight: parseInt(title)
      })
    }
  }
  render () {
    const { html, webviewHeight } = this.state
    return (
      <View flex useSafeArea>
        <Header
          showLeft
          btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }}
          containerStyle={styles.header}
          tintColor={colors.light} />
        <ScrollView style={styles.scroll}>
          <View>
            <Video
              style={styles.video}
              paused
              source={{ uri: 'https://pic.ibaotu.com/00/37/97/95z888piCxmI.mp4' }}
            />
            <Image
              style={styles.coverImage}
              source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} />
          </View>
          <View paddingV-50 center>
            <Text text-24 dark>书籍是人类进步的阶梯</Text>
            <Text text-14 dark06 marginT-20>知涯搜·30分钟前</Text>
          </View>
          <View paddingH-25>
            <View paddingH-15 paddingV-10 row bg-stable borderRadius={8} marginB-10 centerV>
              <Image
                source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }}
                style={{ width: 48, height: 48 }} />
              <View paddingL-7 flex>
                <Text text-16 dark>高中生如何做好生涯规划？</Text>
                <Text text-12 dark06>3:23&nbsp;&nbsp;&nbsp;&nbsp;3MB</Text>
              </View>
              <Image assetName='playerPlay' tintColor={colors.dark} />
            </View>
          </View>
          <View paddingH-20>
            <WebView
              style={[styles.webview, { height: webviewHeight }]}
              source={{ html: html }}
              onNavigationStateChange={this.onNavigationStateChange}
            />
          </View>
          <View center paddingV-30><Text text-12 dark06>--END</Text></View>
          <View paddingT-10>
            <ItemHead title='更多课程' seeAll='true' />
            <View paddingH-25>
              <View paddingH-15 paddingV-10 row bg-stable borderRadius={8} marginB-10 centerV>
                <Image source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} style={{ width: 48, height: 48 }} />
                <View paddingL-7>
                  <Text text-16 dark>高中生如何做好生涯规划？</Text>
                  <Text text-12 dark06>2014人学过</Text>
                </View>
              </View>
              <View paddingH-15 paddingV-10 row bg-stable borderRadius={8} marginB-10 centerV>
                <Image source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }} style={{ width: 48, height: 48 }} />
                <View paddingL-7>
                  <Text text-16 dark>高中生如何做好生涯规划？</Text>
                  <Text text-12 dark06>2014人学过</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer} >
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='attention' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='comment' />
            <Text text-14 dark06 marginL-5>66</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerCeil}>
            <Image assetName='share' />
          </TouchableOpacity>
        </View>
        <Modal ref='modal' backdropPressToClose={false} swipeToClose={false} style={styles.modal} >
          <Header title='互动' containerStyle={{ paddingTop: 0, height: 50 }} />
          <Interact />
        </Modal>
      </View>
    )
  }
  componentDidMount () {
    this.refs.modal.open()
    this.setState({
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover">
          <style>
            body{
              color:${colors.dark};
              font-size:14px;
              line-height:1.5;
              padding-bottom:20px
            }
            *{margin:0,padding:0}
            img{
              width:100%!important;
              height:auto!important;
            }
            h2{
              font-size:18px
            }
            h3{
              font-size:16px
            }
          </style>
        </head>
        <body>
          <p><b>封面新闻记者 梁波</b></p><p>12月19日，一则“男子20年后拦住老师回报耳光”的视频在网上持续发酵。据栾川县公安局19日凌晨通过官方微博通报称，该局已对此立案。同时，一份《对常尧殴打侮辱我校教师的举报控告书》在网上曝光。这份盖有栾川县实验中学公章的控告书称，被打老师名叫张清林。打人男子名叫常尧。被打之后，张老师脸部指印几天不退。“自此以后，每想起此事，张老师都感觉不寒而栗。……生怕稍有不慎将会再有第二个常尧出现……”</p><p class="img-wrapper-embedded" style="width: 100%; min-height: 625.637px;"><img src="https://p3.pstatp.com/large/pgc-image/RCfOM6cDtafjVp" img_width="540" img_height="1157" inline="0" alt="男子20年后“回报”老师耳光 学校控告书曝光：挨打老师怕第二个常某出现" onerror="javascript:errorimg.call(this);" data-index="0" data-src="https://p3.pstatp.com/large/pgc-image/RCfOM6cDtafjVp" style="opacity: 1;"></p><div class="img-download-banner">打开今日头条，查看更多图片</div><p class="img-wrapper-embedded" style="width: 100%; min-height: 625.637px;"><img src="https://p3.pstatp.com/large/pgc-image/RCfOM6v6tCm0B3" img_width="540" img_height="1157" inline="0" alt="男子20年后“回报”老师耳光 学校控告书曝光：挨打老师怕第二个常某出现" onerror="javascript:errorimg.call(this);" data-index="1" class="mt12" data-src="https://p3.pstatp.com/large/pgc-image/RCfOM6v6tCm0B3" style="opacity: 1;"></p><p class="img-wrapper-embedded" style="width: 100%; min-height: 625.637px;"><img src="https://p3.pstatp.com/large/pgc-image/RCfOM76A4wuqv0" img_width="540" img_height="1157" inline="0" alt="男子20年后“回报”老师耳光 学校控告书曝光：挨打老师怕第二个常某出现" onerror="javascript:errorimg.call(this);" data-index="2" class="mt12" data-src="https://p3.pstatp.com/large/pgc-image/RCfOM76A4wuqv0" style="opacity: 1;"></p><p><strong>事件发生</strong></p><p><strong>被殴打谩骂约20多分钟</strong></p><p>据控告书提供的信息显示，张清林老师被打得具体时间是2018年7月底。而网上疯传的短视频的时间是12月15日。</p><p>控告书称，据张清林老师回忆，事发当天下午四点多，他骑着电动车从石庙赶回县城。路过雷湾村变电站附近时，路边停着一辆绿色越野车，旁边站着两个年轻人，其中一个向前拦住张老师。在证实是张清林老师后，此人对着张老师的脸一个耳光接着一个耳光的打，从右边打到左边，边打边骂。</p><p>封面新闻记者注意到，这段描述与网上短视频基本吻合。</p><p>控告书还称，男子将张老师逼到路边后，把电动车踏翻在路边的庄稼地里，继续对张老师拳打脚踢、殴打谩骂约20多分钟。后在几位围观老者劝阻下，打人者才开车离开。</p><p>这段经过网上视频没有显示。</p><p>据张老师回忆，殴打者名叫常尧，系十几年前教过的一个学生。</p><p>控告书称，挨打之后，因为性格内向，并顾忌对方是自己的学生，觉得被自己学生殴打不光彩，张清林老师选择了忍气吞声。直至网上视频曝光出来。</p><p><strong>学校态度</strong></p><p><strong>打人者缺乏起码道德</strong></p><p>据控告书称，这件事对张清林老师身体、心灵造成严重伤害。被打之后，脸上肿起老高，指印几天不退，身上多处淤青，浑身疼痛打20多天。更严重的是，自此以后，每想起此事，张清林老师都感觉不寒而栗，并严重影响教学工作，生怕稍有不慎将会再有第二个常尧出现。特别是“当看到被打视频之后，张老师的反应，让我们能够感到那种发自内心的绝望。”</p><p>对此事件的发生，作为任职学校——栾川实验中学对此事件，在控告书中作出了表态。</p><p>栾川实验中学认为，这一事件性质极其恶劣。常尧缺乏起码道德观念。强烈要求公安机关依法查清事实，严惩肇事者，追究其法律责任，承担人身及精神损害补偿，并删除打人视频，公开赔礼道歉。</p><p><strong>警方回应</strong></p><p><strong>已经立案结果及时公布</strong></p><p>12月19日凌晨0:06，针对此事件，栾川县公安局通过官方微博回应称，“网络上传播的教师张某某被常某殴打的视频，我局已经接到张某某书面报案。”目前，栾川县公安局已经立案，调查结果将及时公布。</p><p>截至发稿，当地警方尚未对此作出处理。</p></p>
          <script>
            window.onload=function(){ 
              window.location.hash = '#' + document.body.clientHeight;
              document.title = document.body.clientHeight;
            }
          </script>
        </body>
      </html>
      `
    })
  }
}
const styles = StyleSheet.create({
  modal: {
    top: statusBarHeight,
    left: 0,
    height: height - statusBarHeight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    width: '100%',
    zIndex: 99
  },
  scroll: {
    flex: 1
  },
  footer: {
    borderTopColor: colors.grey,
    borderTopWidth: 1 / ratio,
    flexDirection: 'row',
    height: 50
  },
  footerCeil: {
    height: '100%',
    flexDirection: 'row',
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: '100%',
    height: 250
  },
  webview: {
    width: '100%'
  },
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  coverImage: {
    width: '100%',
    height: 250
  }
})
