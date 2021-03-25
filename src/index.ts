import { LogBox, Platform, UIManager } from 'react-native'
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation'

import { Color } from './enums'
import { registerNavigationScreens } from './screens/register'
import { NavigationScreen } from './screens'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

registerNavigationScreens()

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: Color.navBar,
      style: 'light',
    },
    navigationBar: {
      backgroundColor: Color.background,
    },
    topBar: {
      visible: false,
    },
    layout: {
      orientation: ['portrait'],
      backgroundColor: Color.background,
    },
    modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
    animations: {
      setRoot: {
        waitForRender: true,
      },
      push: {
        waitForRender: true,
      },
    },
  })

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: NavigationScreen.CHAT,
            },
          },
        ],
      },
    },
  })
})

/**
 * https://github.com/facebook/react-native/issues/30034
 */
LogBox.ignoreLogs(['`scaleY` supplied to `StyleSheet inverted` has been deprecated'])
