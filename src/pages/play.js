import React, { Component } from 'react'
import { StyleSheet, findNodeHandle, DeviceEventEmitter } from 'react-native'
import { View, Image } from '../../react-native-ui-lib'
import { colors } from '../theme'
import { BlurView } from 'react-native-blur'
import { width } from '../utils'
class Play extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor (props) {
    super(props)
    this.state = { viewRef: null }
  }
  imageLoaded= () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  render () {
    return (
      <View flex useSafeArea>
        <View style={styles.imageWrap} centerH>
          <Image
            style={styles.image}
            ref={(img) => { this.backgroundImage = img }}
            source={{ uri: 'https://fdomsimage.oss-cn-huhehaote.aliyuncs.com/image/article/20180905084813' }}
            onLoadEnd={this.imageLoaded}
          />
          <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType='light'
            blurAmount={10}
          />
        </View>
      </View>
    )
  }
  componentDidMount () {
    DeviceEventEmitter.addListener('BlurEvent', (e) => {
      console.log(e)
      // handle event.
    })
  }
}
export default Play
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    left: 200,
    top: 0
  },
  imageWrap: {
    paddingBottom: 47
  },
  blurWrap: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderRadius: 50,
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 300,
    height: 300
  }
})
