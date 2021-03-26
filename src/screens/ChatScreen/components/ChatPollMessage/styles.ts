import { StyleSheet } from 'react-native'

import { Color } from '../../../../enums'

const COUNTER_SIZE = 50

export const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    backgroundColor: Color.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },

  pollType: {
    fontSize: 10,
  },

  pollAuthorName: {
    fontSize: 12,
  },

  question: {
    marginVertical: 12,
    fontSize: 15,
  },

  optionContainer: {
    borderRadius: 15,
    marginBottom: 8,
  },

  option: {
    backgroundColor: 'rgba(28, 110, 242, 0.15)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  optionLabel: {
    fontSize: 12,
    lineHeight: 16,
  },

  counterContainer: {
    backgroundColor: Color.pollCount,
    width: COUNTER_SIZE,
    height: COUNTER_SIZE,
    borderRadius: COUNTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  counterValue: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: -2,
  },

  counterLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
})
