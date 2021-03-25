import React, { useCallback } from 'react'
import { ListRenderItem, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ScreenFC } from 'react-native-navigation-register-screens/dist/types'
import { showModal } from 'react-native-navigation-hooks'

import { Avatar, Icon, InvertedFlatList, NavBar } from '../../components'
import { ChatMessage } from '../../redux/chat/models'
import { chatInvertedMessagesSelector } from '../../redux/chat/selectors'
import { useKeyboardTrackingChat } from '../../hooks'
import { NavigationScreen } from '..'
import { AddPollScreenPassProps } from '../AddPollScreen/models'

import { ChatInput, ChatPollMessage, ChatSeparator, ChatTextMessage } from './components'
import { styles } from './styles'

const ChatScreen: ScreenFC = () => {
  const { bindFlatList, bindTrackingView, scrollToLastMessage } = useKeyboardTrackingChat()

  const messages = useSelector(chatInvertedMessagesSelector)

  const renderChatItem: ListRenderItem<ChatMessage> = useCallback(({ item }) => {
    if (item.poll) {
      return <ChatPollMessage author={item.user} poll={item.poll} />
    }

    return <ChatTextMessage message={item} />
  }, [])

  const onPressAddPoll = useCallback(
    () =>
      showModal<AddPollScreenPassProps>({
        component: { name: NavigationScreen.ADD_POLL, passProps: { scrollToLastMessage } },
      }),
    [scrollToLastMessage]
  )

  return (
    <View style={styles.container}>
      <View style={styles.navBarContainer}>
        <NavBar
          title='Lowkey Squad'
          subtitle='1 member • 1 online'
          left={<Icon name='times' />}
          right={
            <Avatar source={{ uri: 'https://i.ibb.co/gSJzw4v/Screenshot-2021-03-23-at-00-04-06.png' }} size='small' />
          }
        />
      </View>
      <InvertedFlatList
        {...bindFlatList}
        keyboardDismissMode='interactive'
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        data={messages}
        renderItem={renderChatItem}
        keyExtractor={(item: ChatMessage) => String(item.id)}
        ItemSeparatorComponent={ChatSeparator}
      />
      <ChatInput {...bindTrackingView} scrollToLastMessage={scrollToLastMessage} onPressAddPoll={onPressAddPoll} />
    </View>
  )
}

ChatScreen.screenName = NavigationScreen.CHAT

export default ChatScreen
