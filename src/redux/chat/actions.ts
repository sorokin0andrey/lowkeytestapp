import { createAction } from '@reduxjs/toolkit'

import { ChatMessage } from './models'

export const addMessage = createAction<ChatMessage>('ADD_MESSAGE')
