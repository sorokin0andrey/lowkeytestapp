import { StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  text: {
    fontSize: 12,
    color: Color.subtitle,
  },
})
