import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { View, Image, Text, TouchableOpacity } from '../../react-native-ui-lib'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react/native'
import { Header } from '../components'
import { colors } from '../theme'
import { OpenUrl } from '../utils'
@inject('userStore')
@observer class Classroom extends Component {
  constructor (props) {
    super(props)
    this.OpenUrl = new OpenUrl(props)
  }
  @observable reachBottom = true
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  openUrl = (path, query, auth) => {
    this.OpenUrl.openNative(path, query, auth)
  }
  render () {
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
                        <TouchableOpacity key={sIndex} activeOpacity={0.6} onPress={() => { this.openUrl('Subject', { id: sItem.id, text: sItem.text }, false) }}>
                          <View center>
                            <Image style={styles.image} source={sItem.image} />
                            <Text dark text-22 marginT-10>{sItem.text}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  <View style={styles.lineWrap}>
                    <Text style={styles.rotateX} />
                    <Text style={styles.bottomBox} />
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
    zIndex: 999,
    marginTop: 10
  },
  lineWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 35
  },
  rotateX: {
    position: 'absolute',
    top: -26,
    left: 3,
    right: 3,
    height: 35,
    backgroundColor: colors.stable,
    transform: [{ rotateX: '65deg' }],
    // borderWidth: 1,
    // borderColor: 'red',
    zIndex: -9
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
