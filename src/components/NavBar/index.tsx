import React, { FC, memo, ReactNode } from 'react'
import { SafeAreaView, View } from 'react-native'

import { Text } from '../Text'

import { styles } from './styles'

export type NavBarType = 'default' | 'modal'

interface Props {
  title: string
  subtitle?: string
  left?: ReactNode
  right?: ReactNode
  type?: NavBarType
}

const NavBarComponent: FC<Props> = (props) => {
  const { title, subtitle, left, right, type = 'default' } = props

  return (
    <SafeAreaView>
      <View style={[styles.container, type === 'modal' && styles.modal]}>
        <View style={styles.leftContainer}>{left}</View>
        <View style={styles.centerContainer}>
          <Text style={styles.title} weight='semibold' numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.rightContainer}>{right}</View>
      </View>
    </SafeAreaView>
  )
}

export const NavBar = memo(NavBarComponent)
