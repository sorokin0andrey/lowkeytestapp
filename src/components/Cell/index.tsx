import React, { FC, memo, ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

import { Text } from '../Text'

import { styles } from './styles'

interface Props extends ViewProps {
  label: string
  icon?: ReactNode
  aside?: ReactNode
}

const CellComponent: FC<Props> = (props) => {
  const { icon, label, aside, style, ...restProps } = props

  return (
    <View style={[styles.cellContainer, style]} {...restProps}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.labelContainer}>
        <Text style={styles.label} weight='medium'>
          {label}
        </Text>
      </View>
      {aside}
    </View>
  )
}

export const Cell = memo(CellComponent)
