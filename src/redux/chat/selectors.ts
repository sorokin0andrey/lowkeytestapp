import { createSelector } from 'reselect'

import { AppState } from '../models'

const chatSelector = (state: AppState) => state.chat

export const chatMessagesSelector = createSelector(chatSelector, (s) => s.messages)

export const chatInvertedMessagesSelector = createSelector(chatMessagesSelector, (messages) => [...messages].reverse())
