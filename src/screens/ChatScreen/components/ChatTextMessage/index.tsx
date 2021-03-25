import React, { FC, Fragment, memo, useMemo } from 'react'
import { Alert, View } from 'react-native'

import { ChatMessage } from '../../../../redux/chat/models'
import { Avatar, Text } from '../../../../components'

import { styles } from './styles'

interface Props {
  message: ChatMessage
}

const ChatTextMessageComponent: FC<Props> = (props) => {
  const { message } = props

  const renderedMessage = useMemo(() => {
    const splittedText = message.text.split(/(@\w+)/)

    return splittedText.map((textPart) => (
      <Fragment key={textPart}>
        {textPart.startsWith('@') ? (
          <Text style={styles.link} weight='semibold' onPress={() => Alert.alert('Mention', textPart)}>
            {textPart}
          </Text>
        ) : (
          textPart
        )}
      </Fragment>
    ))
  }, [message.text])

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: message.user.avatar }} />
      <View style={styles.messageContainer}>
        <Text style={styles.name} weight='semibold'>
          {message.user.name}
        </Text>
        <Text style={styles.messageText}>{renderedMessage}</Text>
      </View>
    </View>
  )
}

export const ChatTextMessage = memo(ChatTextMessageComponent)
