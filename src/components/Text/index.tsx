import React, { FC, memo, ReactNode } from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { styles } from './styles'

interface Props extends TextProps {
  children: ReactNode
}

const TextComponent: FC<Props> = (props) => {
  const { style, ...restProps } = props

  return <RNText style={[styles.textBase, style]} {...restProps} />
}

export const Text = memo(TextComponent)
