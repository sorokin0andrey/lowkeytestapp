import { StyleSheet } from 'react-native'

import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../../../consts'

export const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
})
