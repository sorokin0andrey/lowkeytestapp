import { Touchable } from '@busfor/react-native-touchable'
import React, { FC, memo, useCallback, useMemo } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native'

import { FormInput, Icon } from '../../../../components'

import { styles } from './styles'

interface Props {
  value: string
  id: number
  index: number
  blurOnSubmit: boolean
  onChangeOption(id: number, value: string): void
  deleteOption(id: number): void
  onEndEditing(id: number): void
  getRef(id: number, ref: TextInput): void
}

const OptionInputComponent: FC<Props> = (props) => {
  const { value, id, index, blurOnSubmit, onChangeOption, deleteOption, onEndEditing, getRef } = props

  const autoFocus = useMemo(() => !TextInput.State.currentlyFocusedInput() || index === 0, [index])

  const onChangeText = useCallback((text: string) => onChangeOption(id, text), [id, onChangeOption])

  const onSubmitEditing = useCallback(() => onEndEditing(id), [id, onEndEditing])

  const onPressDelete = useCallback(() => deleteOption(id), [id, deleteOption])

  const handleRef = useCallback((ref: TextInput) => getRef(id, ref), [getRef, id])

  const onKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const {
        nativeEvent: { key },
      } = event

      if (key === 'Backspace' && value.length === 0) {
        deleteOption(id)
      }
    },
    [deleteOption, id, value.length]
  )

  const isNotFirst = index > 0

  return (
    <View style={[styles.pollInputContainer, isNotFirst && styles.topMargin]}>
      <FormInput
        ref={handleRef}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onKeyPress={onKeyPress}
        placeholder='Option'
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
      />
      <Touchable onPress={onPressDelete} style={styles.pollInputRemoveButton}>
        <Icon name='times' />
      </Touchable>
    </View>
  )
}

export const OptionInput = memo(OptionInputComponent)
