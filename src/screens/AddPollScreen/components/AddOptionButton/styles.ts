import { StyleSheet } from 'react-native'

import { Color } from '../../../../enums'

export const styles = StyleSheet.create({
  addPollButton: {
    backgroundColor: Color.inputBackground,
    borderRadius: 15,
    height: 51,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    marginTop: 8,
  },

  label: {
    color: Color.link,
    fontSize: 15,
  },
})
