import { StyleSheet } from 'react-native'

import { isIOS, isIphoneX, STATUS_BAR_HEIGHT } from '../../consts'
import { Color } from '../../enums'

const MARGIN_TOP_IOS = isIphoneX ? STATUS_BAR_HEIGHT : STATUS_BAR_HEIGHT + 4

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    marginTop: isIOS ? MARGIN_TOP_IOS : 4,
    shadowColor: Color.black,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  scrollViewContainer: {
    flex: 1,
  },

  scrollViewContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
})
