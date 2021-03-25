import { combineReducers } from 'redux'

import { charReducer } from './chat/reducer'

export const reducer = combineReducers({
  chat: charReducer,
})
