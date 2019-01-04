import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { View, Image, Text } from '../../react-native-ui-lib'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { Header } from '../components'
import { colors } from '../theme'
import { height } from '../utils'
@observer class Classroom extends Component {
  constructor (props) {
    super(props)
  }
  @observable reachBottom = true
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  onLayout = (e) => {
    let { layout } = e.nativeEvent
    const clientHeight = height - 50
    console.log(layout)
    console.log(clientHeight)
    if (layout.height >= clientHeight) {
      this.setValue('', false)
    } else {
      this.setValue('', true)
    }
  }
  render () {
    /* const subjectList = [{
      image: require('../assets/classroom/chinese.png'),
      text: '语文',
      id: '1'
    }, {
      image: require('../assets/classroom/math.png'),
      text: '数学',
      id: '2'
    }, {
      image: require('../assets/classroom/english.png'),
      text: '英语',
      id: '3'
    }, {
      image: require('../assets/classroom/physics.png'),
      text: '物理',
      id: '4'
    }, {
      image: require('../assets/classroom/chemistry.png'),
      text: '化学',
      id: '5'
    }, {
      image: require('../assets/classroom/biology.png'),
      text: '生物',
      id: '6'
    }, {
      image: require('../assets/classroom/politics.png'),
      text: '政治',
      id: '7'
    }, {
      image: require('../assets/classroom/history.png'),
      text: '历史',
      id: '8'
    }, {
      image: require('../assets/classroom/geography.png'),
      text: '地理',
      id: '9'
    }] */
    const subjectList = [[{
      image: require('../assets/classroom/chinese.png'),
      id: '1',
      text: '语文'
    }, {
      image: require('../assets/classroom/math.png'),
      text: '数学',
      id: '2'
    }, {
      image: require('../assets/classroom/english.png'),
      text: '英语',
      id: '3'
    }], [{
      image: require('../assets/classroom/physics.png'),
      text: '物理',
      id: '4'
    }, {
      image: require('../assets/classroom/chemistry.png'),
      text: '化学',
      id: '5'
    }, {
      image: require('../assets/classroom/biology.png'),
      text: '生物',
      id: '6'
    }], [{
      image: require('../assets/classroom/politics.png'),
      text: '政治',
      id: '7'
    }, {
      image: require('../assets/classroom/history.png'),
      text: '历史',
      id: '8'
    }, {
      image: require('../assets/classroom/geography.png'),
      text: '地理',
      id: '9'
    }]]
    return (
      <View flex>
        <Header showLeft btnStyle={{ backgroundColor: 'rgba(0,0,0,.48)', marginLeft: 15 }} containerStyle={styles.header} tintColor={colors.light} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View>
            <Image style={{ width: '100%', height: 250 }} source={require('../assets/classroom/banner.png')} />
          </View>
          <View paddingH-15 paddingV-10>
            {
              subjectList.map((item, index) =>
                <View key={index} style={styles.item}>
                  <View style={styles.subWrap}>
                    {
                      item.map((sItem, sIndex) =>
                        <View center key={sIndex}>
                          <Image style={styles.image} source={sItem.image} />
                          <Text dark text-22 marginT-10>{sItem.text}</Text>
                        </View>
                      )
                    }
                  </View>
                  <View style={styles.lineWrap}>
                    <View style={styles.rotateX} />
                    <View style={styles.bottomBox} />
                  </View>
                </View>
              )
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: 100,
    top: 0,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  subWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  item: {
    position: 'relative'
  },
  image: {
    zIndex: 99,
    marginTop: 10
  },
  lineWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 35,
    zIndex: 9
  },
  rotateX: {
    position: 'absolute',
    top: -14,
    left: 1,
    right: 1,
    height: 15,
    backgroundColor: colors.stable,
    transform: [{ rotateX: '45deg' }],
    zIndex: -1
  },
  bottomBox: {
    height: 12,
    backgroundColor: colors.light,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowColor: colors.black
  }
})
export default Classroom
