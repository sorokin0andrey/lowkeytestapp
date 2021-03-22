import React from 'react'
import { StatusBar } from 'react-native'
import { ChatScreen } from './screens/ChatScreen'

const App = () => {
  return (
    <>
      <StatusBar barStyle='light-content' />
      <ChatScreen />
    </>
  )
}

export default App
