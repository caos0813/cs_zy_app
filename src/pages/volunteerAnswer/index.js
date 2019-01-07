import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { configure, observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { colors } from '../../theme'
import { width, ratio, api, axios } from '../../utils'
import { TabView, TabBar } from 'react-native-tab-view'
import { View } from '../../../react-native-ui-lib'
import List from './list'
configure({
  enforceActions: 'always'
})
@observer class Page extends Component {
  @observable index=0
  @observable routes=[]
  @observable scenes={}
  @action.bound
  setValue (key, val) {
    this[key] = val
  }
  render () {
    const { routes, index, setValue, scenes } = this
    let routesTransfer = routes.map((item) => {
      return {
        key: item.key,
        title: item.title
      }
    })
    return (
      <View flex useSafeArea>
        {routes.length > 0 && scenes[0] &&
        <TabView
          initialLayout={{ height: 300, width: width }}
          navigationState={{ index: index, routes: routesTransfer }}
          renderScene={({ route }) => {
            return <List routeKey={route.key} id={routes[route.key].id} index={index} />
          }}
          onIndexChange={index => setValue('index', index)}
          renderTabBar={(props) => (
            <TabBar {...props}
              labelStyle={styles.labelStyle}
              tabStyle={styles.tabStyle}
              indicatorStyle={styles.indicatorStyle}
              style={styles.tabContainerStyle}
            />)}
        />
        }
      </View>
    )
  }
  componentDidMount () {
    axios.get(api.queryModuleArticleInfo, {
      params: {
        moduleId: 6
      }
    }).then(data => {
      const routes = []
      const scenes = {}
      data.topicsAndArticlesList.forEach((item, index) => {
        routes[index] = {
          key: index.toString(),
          id: item.id,
          title: item.title
        }
        scenes[index] = () => (<List style={{ flex: 1 }} />)
      })
      this.setValue('routes', routes)
      this.setValue('scenes', scenes)
    })
  }
}
export default Page
const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  indicatorStyle: {
    borderColor: colors.dark04,
    borderBottomWidth: 2,
    zIndex: 10
  },
  tabContainerStyle: {
    elevation: 0,
    borderColor: colors.gray,
    backgroundColor: colors.light,
    borderBottomWidth: 1 / ratio
  },
  labelStyle: {
    width: '100%',
    color: colors.dark06,
    paddingHorizontal: 0,
    fontSize: 15,
    textAlign: 'center',
    flexWrap: 'nowrap'

  },
  tabStyle: {
    height: 40,
    padding: 0
  }
})
