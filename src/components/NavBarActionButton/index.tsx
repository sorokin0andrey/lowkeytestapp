import { Touchable, TouchableProps } from '@busfor/react-native-touchable'
import React, { FC, memo } from 'react'

import { Text } from '../Text'

import { styles } from './styles'

interface Props extends Omit<TouchableProps, 'children'> {
  label: string
}

const NavBarActionButtonComponent: FC<Props> = (props) => {
  const { label, style, disabled, ...restProps } = props

  return (
    <Touchable {...restProps} style={[styles.actionButton, style]} disabled={disabled} borderless>
      <Text style={[styles.label, disabled && styles.disabled]} weight='medium'>
        {label}
      </Text>
    </Touchable>
  )
}

export const NavBarActionButton = memo(NavBarActionButtonComponent)
