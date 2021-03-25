import { StyleSheet } from 'react-native'

import { Color } from '../../../../enums'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  messageContainer: {
    marginLeft: 15,
    flex: 1,
  },

  name: {
    fontSize: 12,
    color: Color.subtitle,
    lineHeight: 18,
  },

  messageText: {
    fontSize: 15,
  },

  link: {
    color: Color.link,
  },
})
