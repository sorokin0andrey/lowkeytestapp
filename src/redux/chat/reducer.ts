import { createReducer, PayloadAction } from '@reduxjs/toolkit'

import { addMessage } from './actions'
import { ChatState, ChatMessage } from './models'

const mockedMessages: ChatMessage[] = [
  {
    id: 10001,
    user: {
      name: 'Andrey Sorokin',
      avatar: 'https://uifaces.co/our-content/donated/Xp0NB-TL.jpg',
    },
    text: 'I’m in also! Mike’s Diner would be a good choice 🔥🔥🔥 how about everyone else? Any ideas?',
  },
  {
    id: 10002,
    user: {
      name: 'Edwin Bass',
      avatar: 'https://uifaces.co/our-content/donated/KtCFjlD4.jpg',
    },
    text: 'Sounds good to me!!!',
  },
  {
    id: 10003,
    user: {
      name: 'Edwin Bass',
      avatar: 'https://uifaces.co/our-content/donated/KtCFjlD4.jpg',
    },
    text: '@kellyhodges are you in???',
  },
  {
    id: 10004,
    user: {
      name: 'Kelley Hodges',
      avatar:
        'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
    },
    text: 'Nice! 12 ppl in total. Let’s gather at the metro station!🚆🚆🚆',
  },
  {
    id: 10005,
    user: {
      name: 'Jared Phillips',
      avatar: 'https://uifaces.co/our-content/donated/gPZwCbdS.jpg',
    },
    text: 'Okie dokie!!',
  },
]

const initialState: ChatState = {
  messages: [...mockedMessages],
}

export const charReducer = createReducer(initialState, {
  [addMessage.type]: (state, action: PayloadAction<ChatMessage>) => {
    state.messages.push(action.payload)
  },
})
