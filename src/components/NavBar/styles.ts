import { StyleSheet } from 'react-native'
import { Color } from '../../enums'

export const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Color.navBar,
  },

  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sideContainer: {
    paddingHorizontal: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    color: Color.subtitle,
    fontSize: 12,
  },
})
