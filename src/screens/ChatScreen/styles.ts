import { StyleSheet } from 'react-native'

import { Color } from '../../enums'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },

  navBarContainer: {
    backgroundColor: Color.navBar,
  },

  chatContainer: {
    flex: 1,
  },

  chatContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
})
