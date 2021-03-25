import { StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  avatar: {
    borderRadius: 15,
    backgroundColor: Color.lightBackground,
    resizeMode: 'cover',
  },

  small: {
    width: 35,
    height: 35,
  },

  medium: {
    width: 40,
    height: 40,
  },
})
