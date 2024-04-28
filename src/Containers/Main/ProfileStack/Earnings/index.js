import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import DailyStats from './DailyStats'
import WeeklyStats from './WeeklyStats'
import { VeroHeader } from '@/Components'
import { useTranslation } from 'react-i18next'


const renderScene = SceneMap({
  first: DailyStats,
  second: WeeklyStats,
})

export default function Earnings() {
  const layout = useWindowDimensions()
  const { t } = useTranslation()


  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Today' },
    { key: 'second', title: 'Weekly' },
  ])

  return (
    <>
    <VeroHeader title={t("earning")}/>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => 
      <TabBar 
      {...props} 
      style={{backgroundColor: 'white'}}
      activeColor={'#FC8724'}
      inactiveColor={'black'}
      indicatorStyle={{ backgroundColor: '#FC8724' }}
      />} // <-- add this line

    />
    </>
  )
}
