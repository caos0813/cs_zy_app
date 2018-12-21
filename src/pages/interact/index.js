import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../theme'
import { width, ratio } from '../../utils'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import Comment from './comment'
import Praise from './praise'
export default class Page extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: '评论' },
      { key: 'second', title: '赞' }
    ]
  }

  render () {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => (<Comment style={{ flex: 1 }} />),
          second: () => (<Praise style={{ flex: 1 }} />)
        })}
        onIndexChange={index => this.setState({ index })}
        renderTabBar={(props) => (
          <TabBar {...props}
            labelStyle={styles.labelStyle}
            tabStyle={styles.tabStyle}
            indicatorStyle={styles.indicatorStyle}
            style={styles.tabContainerStyle}
          />)}
        initialLayout={{ width: width }}
      />
    )
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  indicatorStyle: {
    borderColor: colors.dark04,
    width: 110,
    left: (width / 2 - 110) / 2,
    borderBottomWidth: 2,
    zIndex: 10
  },
  tabContainerStyle: {
    elevation: 0,
    borderColor: colors.dark,
    backgroundColor: colors.light,
    borderBottomWidth: 1 / ratio
  },
  labelStyle: {
    color: colors.dark06
  },
  tabStyle: {
    height: 40
  }
})
