import { Platform, StyleSheet } from 'react-native'

import { isIOS, SAFE_AREA_BOTTOM_OFFSET } from '../../../../consts'
import { Color } from '../../../../enums'

export const styles = StyleSheet.create({
  trackingToolbarContainer: {
    position: isIOS ? 'absolute' : 'relative',
    bottom: 0,
    width: '100%',
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 5,
    // additional padding to fill empty space (safe area)
    paddingBottom: SAFE_AREA_BOTTOM_OFFSET + 5,
    marginBottom: -SAFE_AREA_BOTTOM_OFFSET,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Color.background,
  },

  inputContainer: {
    flex: 1,
  },

  input: {
    backgroundColor: Color.lightBackground,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: Color.text,
    paddingHorizontal: 15,
    maxHeight: 150,
    ...Platform.select({
      ios: {
        paddingTop: 7,
        paddingBottom: 5,
      },
      android: {
        paddingTop: 4,
        paddingBottom: 3,
      },
    }),
  },

  iconContainer: {
    height: 35,
    justifyContent: 'center',
  },

  leftIconContainer: {
    marginRight: 10,
  },

  rightIconContainer: {
    marginLeft: 10,
  },
})
