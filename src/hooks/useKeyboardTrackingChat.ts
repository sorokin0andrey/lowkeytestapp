import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  FlatList,
  FlatListProps,
  Keyboard,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewProps,
} from 'react-native'
import { useNavigationCommand } from 'react-native-navigation-hooks'

import { isIOS, KEYBOARD_DURATION, SCREEN_HEIGHT } from '../consts'

interface FlatListBindingProps extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  ref: RefObject<FlatList>
}

export const useKeyboardTrackingChat = () => {
  const flatListRef = useRef<FlatList>(null)

  const scrollPosition = useRef(0)
  const chatInputHeight = useRef(0)
  const keyboardVisible = useRef(false)
  const prevKeyboardHeight = useRef(0)
  const isAppeared = useRef(true)

  const scrollToLastMessage = useCallback(() => flatListRef.current?.scrollToOffset({ offset: -SCREEN_HEIGHT }), [])

  const bindFlatList = useMemo(
    (): FlatListBindingProps | null => ({
      ref: flatListRef,
      scrollEventThrottle: 32,
      onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollPosition.current = event.nativeEvent.contentOffset.y
      },
    }),
    []
  )

  const bindTrackingView = useMemo(
    (): ViewProps | null => ({
      onLayout: (event: LayoutChangeEvent) => {
        chatInputHeight.current = event.nativeEvent.layout.height
      },
    }),
    []
  )

  useEffect(() => {
    if (!isIOS) {
      return
    }

    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      const shouldPrevent = prevKeyboardHeight.current !== 0 && event.duration !== 0

      if (shouldPrevent || !flatListRef.current || !isAppeared.current) {
        return
      }

      const keyboardHeight = event.endCoordinates.height

      const diff = keyboardHeight - prevKeyboardHeight.current

      const offset = scrollPosition.current - diff

      const isNotStartPosition = Math.round(-keyboardHeight) !== Math.round(scrollPosition.current)

      if (keyboardVisible.current && isNotStartPosition) {
        flatListRef.current.scrollToOffset({ offset, animated: false })
      }

      if (!keyboardVisible.current) {
        flatListRef.current.scrollToOffset({ offset: offset + chatInputHeight.current })
      }

      keyboardVisible.current = true
      prevKeyboardHeight.current = keyboardHeight
    })

    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      keyboardVisible.current = false
      prevKeyboardHeight.current = 0
    })

    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: -chatInputHeight.current, animated: false })
    }, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useNavigationCommand(() => {
    isAppeared.current = false
  }, 'showModal')

  useNavigationCommand(() => {
    setTimeout(() => {
      isAppeared.current = true
    }, KEYBOARD_DURATION)
  }, 'dismissModal')

  return { bindFlatList, bindTrackingView, scrollToLastMessage }
}
