import React, { useRef, useEffect, useCallback, useState, FC, memo, ReactNode } from 'react'
import {
  ScrollView,
  Keyboard,
  KeyboardEvent,
  ScrollViewProps,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  TextInput,
} from 'react-native'

import { isIOS, isIphoneX, SAFE_AREA_BOTTOM_OFFSET, STATUS_BAR_HEIGHT } from '../../consts'

const top = isIOS ? -STATUS_BAR_HEIGHT : 0

interface Props extends ScrollViewProps {
  children: ReactNode
}

const KeyboardScrollViewComponent: FC<Props> = (props) => {
  const { onScroll, onContentSizeChange, onLayout, ...restProps } = props

  const scrollViewRef = useRef<ScrollView | null>(null)
  const scrollPosition = useRef(0)
  const contentHeight = useRef(0)
  const viewHeight = useRef(0)

  const [contentInset, setContentInset] = useState({ top: 0, bottom: 0 })

  const scrollToFocusedTextInput = useCallback(() => {
    const currentlyFocusedField = TextInput.State.currentlyFocusedInput()

    if (!currentlyFocusedField) {
      return
    }

    currentlyFocusedField.measureInWindow((_x, _y, _width, height) => {
      const additionalOffset = height + 60

      if (scrollViewRef.current) {
        scrollViewRef.current
          .getScrollResponder()
          .scrollResponderScrollNativeHandleToKeyboard(currentlyFocusedField, additionalOffset, true)
      }
    })
  }, [])

  const onKeyboardWillShow = useCallback(
    (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height
      const bottom = isIphoneX ? keyboardHeight - 68 : keyboardHeight

      setContentInset({ top, bottom })

      scrollToFocusedTextInput()
    },
    [scrollToFocusedTextInput]
  )

  const onKeyboardWillHide = useCallback(() => {
    setContentInset({ top, bottom: 0 })

    const currentPosition = scrollPosition.current + viewHeight.current + SAFE_AREA_BOTTOM_OFFSET

    if (scrollViewRef.current && Platform.OS === 'ios' && currentPosition > contentHeight.current) {
      scrollViewRef.current.scrollToEnd()
    }
  }, [])

  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollPosition.current = event.nativeEvent.contentOffset.y

      if (onScroll) {
        onScroll(event)
      }
    },
    [onScroll]
  )

  const handleContentSizeChange = useCallback(
    (w: number, h: number) => {
      contentHeight.current = h

      if (onContentSizeChange) {
        onContentSizeChange(w, h)
      }
    },
    [onContentSizeChange]
  )

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      viewHeight.current = event.nativeEvent.layout.height

      if (onLayout) {
        onLayout(event)
      }
    },
    [onLayout]
  )

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide)

    return () => {
      keyboardWillShowListener.remove()
      keyboardWillHideListener.remove()
    }
  }, [onKeyboardWillHide, onKeyboardWillShow])

  return (
    <ScrollView
      {...restProps}
      ref={scrollViewRef}
      onScroll={handleOnScroll}
      scrollEventThrottle={16}
      onContentSizeChange={handleContentSizeChange}
      contentInset={contentInset}
      onLayout={handleLayout}
    />
  )
}

export const KeyboardScrollView = memo(KeyboardScrollViewComponent)
