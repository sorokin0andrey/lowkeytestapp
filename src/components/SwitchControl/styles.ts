import { StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 28,
  },

  switchContainer: {
    width: 55,
    height: 28,
    borderRadius: 100,
    padding: 1,
    borderWidth: 1,
  },

  thumb: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: Color.black,
    shadowOpacity: 0,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
})
