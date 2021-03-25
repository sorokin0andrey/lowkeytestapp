export interface ChatUser {
  name: string
  avatar: string
}

export interface ChatPollOption {
  id: number
  value: string
}

export interface ChatPoll {
  question: string
  options: ChatPollOption[]
  anonymous: boolean
  editable: boolean
}

export interface ChatMessage {
  id: number
  user: ChatUser
  text: string
  poll?: ChatPoll
}

export interface ChatState {
  messages: ChatMessage[]
}
