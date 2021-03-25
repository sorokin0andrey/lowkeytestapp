import { Platform, StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Color.inputBackground,
    borderRadius: 15,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: Color.text,
    height: 51,
    paddingHorizontal: 15,
    ...Platform.select({
      android: {
        paddingTop: 15,
      },
    }),
  },

  multiline: {
    height: 'auto',
    ...Platform.select({
      ios: {
        paddingTop: 15,
        paddingBottom: 13,
      },
      android: {
        paddingTop: 13,
        paddingBottom: 10,
      },
    }),
  },
})
