import React, { FC, memo, useCallback, useRef, useState } from 'react'
import { TextInput, View, ViewProps } from 'react-native'
// no type declarations
// @ts-ignore
import { KeyboardTrackingView } from 'react-native-ui-lib/keyboard'
import { useDispatch } from 'react-redux'

import { KEYBOARD_DURATION, MOCK_CURRENT_USER } from '../../../../consts'
import { Color } from '../../../../enums'
import { addMessage } from '../../../../redux/chat/actions'
import { ChatMessage } from '../../../../redux/chat/models'
import { Icon } from '../../../../components'
import { getID } from '../../../../utils/getID'

import { styles } from './styles'

interface Props extends ViewProps {
  scrollToLastMessage(): void
  onPressAddPoll(): void
}

const ChatInputComponent: FC<Props> = (props) => {
  const { scrollToLastMessage, onPressAddPoll, style, ...restProps } = props

  const inputRef = useRef<TextInput>(null)

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const onPressSend = useCallback(() => {
    const trimmedMessage = message.trim()

    if (trimmedMessage.length === 0) {
      return
    }

    const id = getID()

    const payload: ChatMessage = {
      id,
      user: MOCK_CURRENT_USER,
      text: trimmedMessage,
    }

    dispatch(addMessage(payload))

    setMessage('')

    scrollToLastMessage()
  }, [dispatch, scrollToLastMessage, message])

  const handlePressAddPoll = useCallback(() => {
    inputRef.current?.blur()

    setTimeout(onPressAddPoll, KEYBOARD_DURATION)
  }, [onPressAddPoll])

  const hasMessage = Boolean(message.trim())

  return (
    <KeyboardTrackingView style={styles.trackingToolbarContainer} trackInteractive>
      <View style={[styles.container, style]} {...restProps}>
        <View style={[styles.iconContainer, styles.leftIconContainer]}>
          <Icon onPress={handlePressAddPoll} name='poll-h' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder='Message'
            placeholderTextColor={Color.subtitle}
            keyboardAppearance='dark'
            multiline
          />
        </View>
        <View style={[styles.iconContainer, styles.rightIconContainer]}>
          {hasMessage ? <Icon onPress={onPressSend} name='paper-plane' /> : <Icon name='camera' />}
        </View>
      </View>
    </KeyboardTrackingView>
  )
}

export const ChatInput = memo(ChatInputComponent)
