import React, { FC, memo, useEffect } from 'react'
import { Animated, Easing, Insets, TouchableWithoutFeedback } from 'react-native'

import { Color } from '../../enums'
import { useAnimatedValue } from '../../hooks'

import { styles } from './styles'

interface Props {
  value?: boolean
  onChange?(): void
}

const hitSlop: Insets = { top: 10, right: 10, bottom: 10, left: 10 }

const SwitchControlComponent: FC<Props> = (props) => {
  const { value, onChange } = props

  const animatedValue = useAnimatedValue(value ? 1 : 0)

  useEffect(() => {
    animatedValue.stopAnimation(() => {
      Animated.timing(animatedValue, {
        toValue: value ? 1 : 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start()
    })
  }, [animatedValue, value])

  return (
    <TouchableWithoutFeedback style={styles.container} hitSlop={hitSlop} onPress={onChange}>
      <Animated.View
        style={[
          styles.switchContainer,
          {
            backgroundColor: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [Color.transparent, Color.link],
            }),
            borderColor: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [Color.subtitle, Color.link],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 27] }) }],
              backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [Color.subtitle, Color.white],
              }),
              shadowOpacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.26],
              }),
              elevation: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 2],
              }),
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export const SwitchControl = memo(SwitchControlComponent)
