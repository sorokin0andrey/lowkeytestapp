import React, { FC, memo } from 'react'
import { View, ViewProps } from 'react-native'

import { styles } from './styles'

const ChatSeparatorComponent: FC<ViewProps> = (props) => {
  const { style, ...restProps } = props

  return <View style={[styles.chatSeparator, style]} {...restProps} />
}

export const ChatSeparator = memo(ChatSeparatorComponent)
