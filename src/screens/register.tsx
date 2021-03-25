import React from 'react'
import { registerScreens } from 'react-native-navigation-register-screens'
import { NavigationProvider } from 'react-native-navigation-hooks'
import { Provider } from 'react-redux'

import { store } from '../redux/store'

import ChatScreen from './ChatScreen'
import AddPollScreen from './AddPollScreen'

export const registerNavigationScreens = () =>
  registerScreens([ChatScreen, AddPollScreen], (Component) => (props) => (
    <Provider store={store}>
      <NavigationProvider value={{ componentId: props.componentId }}>
        <Component {...props} />
      </NavigationProvider>
    </Provider>
  ))
