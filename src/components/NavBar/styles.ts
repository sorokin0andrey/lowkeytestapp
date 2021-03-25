import { Platform, StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modal: {
    height: 56,
  },

  leftContainer: {
    width: 50,
    alignItems: 'flex-start',
  },

  rightContainer: {
    width: 50,
    alignItems: 'flex-end',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
  },

  subtitle: {
    color: Color.subtitle,
    fontSize: 12,
    ...Platform.select({
      // strange font behavior on Android
      android: {
        lineHeight: 12,
      },
    }),
  },
})
