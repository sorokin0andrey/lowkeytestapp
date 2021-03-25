import React, { FC, memo, ReactNode } from 'react'
import { Text as RNText, TextProps } from 'react-native'

import { styles } from './styles'

export type TextWeight = 'regular' | 'medium' | 'semibold'

interface Props extends TextProps {
  children: ReactNode
  weight?: TextWeight
}

const TextComponent: FC<Props> = (props) => {
  const { style, weight = 'regular', ...restProps } = props

  return <RNText style={[styles.textBase, styles[weight], style]} {...restProps} />
}

export const Text = memo(TextComponent)
