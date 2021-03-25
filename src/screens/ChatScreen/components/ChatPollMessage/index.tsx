import { Touchable } from '@busfor/react-native-touchable'
import React, { FC, memo, useCallback, useState } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Avatar, Text } from '../../../../components'
import { ChatPoll, ChatUser } from '../../../../redux/chat/models'

import { styles } from './styles'

interface Props {
  author: ChatUser
  poll: ChatPoll
}

const GRADIENT_COLORS = [
  'rgba(168, 61, 127, 1)',
  'rgba(111, 29, 122, 0.65)',
  'rgba(76, 9, 119, 0.4)',
  'rgba(3, 17, 67, 0.6)',
]

const GRADIENT_ANGLE_CENTER = { x: 0.3, y: 0.5 }

const GRADIENT_LOCATIONS = [0, 0.4, 0.75, 1]

const ChatPollMessageComponent: FC<Props> = (props) => {
  const {
    author: { name, avatar },
    poll: { anonymous, question, options },
  } = props

  const type = anonymous ? 'Anonymous Poll' : 'Public Poll'

  const [count, setCount] = useState(0)

  const increaseCount = useCallback(() => setCount((s) => s + 1), [])

  return (
    <LinearGradient
      style={styles.container}
      colors={GRADIENT_COLORS}
      angleCenter={GRADIENT_ANGLE_CENTER}
      locations={GRADIENT_LOCATIONS}
      angle={134}
      useAngle
    >
      <View style={styles.topContainer}>
        <Avatar source={{ uri: avatar }} />
        <View style={styles.infoContainer}>
          <Text style={styles.pollType}>{type}</Text>
          <Text style={styles.pollAuthorName} weight='semibold'>
            {name}
          </Text>
        </View>
        <View style={styles.counterContainer}>
          <Text style={styles.counterValue} weight='semibold' numberOfLines={1} adjustsFontSizeToFit>
            {count}
          </Text>
          <Text style={styles.counterLabel} numberOfLines={1} adjustsFontSizeToFit>
            votes
          </Text>
        </View>
      </View>

      <Text style={styles.question} weight='medium'>
        {question}
      </Text>

      {options.map((option) => (
        <Touchable key={option.id} style={styles.optionContainer} onPress={increaseCount}>
          <View style={styles.option}>
            <Text style={styles.optionLabel}>{option.value}</Text>
          </View>
        </Touchable>
      ))}
    </LinearGradient>
  )
}

export const ChatPollMessage = memo(ChatPollMessageComponent)
