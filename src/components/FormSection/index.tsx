import React, { FC, memo, ReactNode, useEffect, useState } from 'react'
import { View, ViewProps } from 'react-native'

import { Text } from '../Text'

import { styles } from './styles'

interface Props extends ViewProps {
  children: ReactNode
  label: string
  aside?: string
}

const FormSectionComponent: FC<Props> = (props) => {
  const { style, children, label, aside: asideProp, ...restProps } = props

  const [aside, setAside] = useState(asideProp)

  // to avoid LayoutAnimation issue on Android
  useEffect(() => {
    setAside(asideProp)
  }, [asideProp])

  return (
    <View style={[styles.section, style]} {...restProps}>
      <View style={styles.sectionHeader}>
        <Text style={styles.text} weight='semibold'>
          {label}
        </Text>
        {aside ? <Text style={styles.text}>{aside}</Text> : null}
      </View>
      {children}
    </View>
  )
}

export const FormSection = memo(FormSectionComponent)
