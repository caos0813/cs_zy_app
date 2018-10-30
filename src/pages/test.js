import React, { Component } from 'react'
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native'
import { UltimateRefreshView } from 'react-native-ultimate-listview'

export default class Example extends Component {
  render () {
    return (
      <UltimateRefreshView onRefresh={this.onRefresh}>
        <Text>212</Text>
      </UltimateRefreshView>
    )
  }
}
