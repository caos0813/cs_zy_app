import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class PlaneIndex extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '生涯规划'
    }
  }
  render () {
    return (
      <View style={styles.box}>
        <Text>hahhah</Text>
      </View>
    )
  }
}

export default PlaneIndex

const styles = StyleSheet.create({
  box: {
    flex: 1
  }
})
