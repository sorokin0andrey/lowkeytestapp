import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  pollInputContainer: {
    position: 'relative',
  },

  topMargin: {
    marginTop: 8,
  },

  pollInputRemoveButton: {
    backgroundColor: '#1c233f',
    width: 50,
    height: 51,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    paddingRight: 65,
  },
})
