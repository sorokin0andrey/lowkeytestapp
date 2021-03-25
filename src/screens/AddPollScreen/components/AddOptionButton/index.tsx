import React, { FC, memo } from 'react'
import { Touchable, TouchableProps } from '@busfor/react-native-touchable'

import { Text } from '../../../../components'
import { isIOS } from '../../../../consts'

import { styles } from './styles'

interface Props extends Omit<TouchableProps, 'children'> {}

const AddOptionButtonComponent: FC<Props> = (props) => {
  const { style, ...restProps } = props

  return (
    <Touchable highlight={isIOS} style={[styles.addPollButton, style]} {...restProps}>
      <Text style={styles.label}>Add an option</Text>
    </Touchable>
  )
}

export const AddOptionButton = memo(AddOptionButtonComponent)
