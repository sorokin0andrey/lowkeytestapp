import { Touchable } from '@busfor/react-native-touchable'
import React, { FC, memo, useMemo } from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { IconProps } from 'react-native-vector-icons/Icon'

import { Color } from '../../enums'

import { styles } from './styles'

interface Props extends IconProps {}

const IconComponent: FC<Props> = (props) => {
  const { size = 24, color = Color.text, onPress, ...restProps } = props

  const icon = useMemo(() => <FontAwesomeIcon size={size} color={color} {...restProps} />, [color, restProps, size])

  return onPress ? (
    <Touchable borderless rippleColor={Color.lightBackground} onPress={onPress} style={styles.touchable}>
      {icon}
    </Touchable>
  ) : (
    icon
  )
}

export const Icon = memo(IconComponent)
