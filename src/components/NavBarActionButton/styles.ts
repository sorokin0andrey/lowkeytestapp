import { StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  actionButton: {
    padding: 16,
    margin: -16,
  },

  label: {
    color: Color.link,
    fontSize: 14,
  },

  disabled: {
    color: Color.subtitle,
  },
})
