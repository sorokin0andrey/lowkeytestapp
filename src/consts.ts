import { Dimensions, Platform } from 'react-native'
import { getStatusBarHeight, isIphoneX as isIphoneXFunc } from 'react-native-iphone-x-helper'

import { ChatUser } from './redux/chat/models'

export const isIOS = Platform.OS === 'ios'

export const isAndroid = Platform.OS === 'android'

export const isIphoneX = isIphoneXFunc()

const dimensions = Dimensions.get('window')

export const STATUS_BAR_HEIGHT: number = getStatusBarHeight(true)

export const SCREEN_WIDTH = dimensions.width

export const SCREEN_HEIGHT =
  dimensions.height + (Platform.OS === 'android' && STATUS_BAR_HEIGHT > 24 ? STATUS_BAR_HEIGHT : 0)

export const SAFE_AREA_BOTTOM_OFFSET = isIphoneX ? 34 : 0

export const KEYBOARD_DURATION = 250

export const MOCK_CURRENT_USER: ChatUser = {
  name: 'Kelly Hodges',
  avatar:
    'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
}
