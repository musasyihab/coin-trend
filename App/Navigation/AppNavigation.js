import { StackNavigator } from 'react-navigation'
import PriceTrendScreen from '../Containers/PriceTrendScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PriceTrendScreen: { screen: PriceTrendScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'PriceTrendScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  }
})

export default PrimaryNav
