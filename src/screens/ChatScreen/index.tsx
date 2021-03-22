import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { NavBar } from '../../components'
import { styles } from './styles'

const ChatScreenComponent: FC = () => (
  <View style={styles.container}>
    <NavBar title='Lowkey Squad' subtitle='1 member • 1 online' />
  </View>
)

export const ChatScreen = memo(ChatScreenComponent)
