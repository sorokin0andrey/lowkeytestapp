import React, { FC, memo, ReactNode } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Text } from '../Text'
import { styles } from './styles'

interface Props {
  title: string
  subtitle?: string
  left?: ReactNode
  right?: ReactNode
}

const NavBarComponent: FC<Props> = (props) => {
  const { title, subtitle, left, right } = props

  return (
    <SafeAreaView style={styles.navBar}>
      <View style={styles.container}>
        <View style={styles.sideContainer}>{left}</View>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.sideContainer}>{right}</View>
      </View>
    </SafeAreaView>
  )
}

export const NavBar = memo(NavBarComponent)
