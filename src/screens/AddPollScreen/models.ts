import { TextInput } from 'react-native'

export interface AddPollScreenPassProps {
  scrollToLastMessage(): void
}

export interface PollOptionRefs {
  [key: number]: TextInput
}
