import { useRef } from 'react'
import { Animated } from 'react-native'

export const useAnimatedValue = (initialValue = 0) => {
  const animatedValue = useRef(new Animated.Value(initialValue))

  return animatedValue.current
}
