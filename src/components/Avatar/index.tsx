import React, { FC, memo } from 'react'
import { Image, ImageProps } from 'react-native'

import { styles } from './styles'

export type AvatarSize = 'small' | 'medium'

interface Props extends ImageProps {
  size?: AvatarSize
}

const AvatarComponent: FC<Props> = (props) => {
  const { style, size = 'medium', ...restProps } = props

  return <Image style={[styles.avatar, styles[size], style]} {...restProps} />
}

export const Avatar = memo(AvatarComponent)
