import React, { forwardRef, memo } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { Color } from '../../enums'

import { styles } from './styles'

interface Props extends TextInputProps {}

const FormInputComponent = forwardRef<TextInput, Props>((props, ref) => {
  const { style, multiline, ...restProps } = props

  return (
    <TextInput
      ref={ref}
      style={[styles.textInput, multiline && styles.multiline, style]}
      multiline={multiline}
      placeholderTextColor={Color.subtitle}
      keyboardAppearance='dark'
      {...restProps}
    />
  )
})

export const FormInput = memo(FormInputComponent)
