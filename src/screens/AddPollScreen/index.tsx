import React, { useCallback, useMemo, useRef, useState } from 'react'
import { LayoutAnimation, TextInput, View } from 'react-native'
import { ScreenFC } from 'react-native-navigation-register-screens/dist/types'
import { useNavigation } from 'react-native-navigation-hooks'
import { useDispatch } from 'react-redux'

import { NavigationScreen } from '..'
import {
  Cell,
  FormInput,
  FormSection,
  Icon,
  KeyboardScrollView,
  NavBar,
  NavBarActionButton,
  SwitchControl,
} from '../../components'
import { Color } from '../../enums'
import { ChatMessage, ChatPollOption } from '../../redux/chat/models'
import { MOCK_CURRENT_USER } from '../../consts'
import { addMessage } from '../../redux/chat/actions'
import { getID } from '../../utils/getID'

import { AddOptionButton, BackgroundGradient, OptionInput } from './components'
import { POLL_OPTIONS_MAX_COUNT, POLL_QUESTION_MAX_LENGTH } from './consts'
import { AddPollScreenPassProps, PollOptionRefs } from './models'
import { styles } from './styles'

const addOptionReducer = (s: ChatPollOption[]): ChatPollOption[] => {
  if (s.length === POLL_OPTIONS_MAX_COUNT) {
    return s
  }

  const id = getID()

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

  return [...s, { id, value: '' }]
}

const AddPollScreen: ScreenFC<AddPollScreenPassProps> = (props) => {
  const { scrollToLastMessage } = props

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const [anonymous, setAnonymous] = useState(true)

  const [editable, setEditable] = useState(false)

  const [question, setQuestion] = useState('')

  const [options, setOptions] = useState<ChatPollOption[]>([])

  const filledOptions = useMemo(
    () =>
      options
        .map(({ value, ...option }) => ({ ...option, value: value.trim() }))
        .filter(({ value }) => value.length > 0),
    [options]
  )

  const canSubmit = filledOptions.length > 1 && question.trim().length > 0

  const optionRefs = useRef<PollOptionRefs>({})

  /**
   * to avoid extra renders
   */
  const currentOptions = useRef(options)
  currentOptions.current = options

  const handleOptionRef = useCallback((id: number, ref: TextInput) => {
    optionRefs.current[id] = ref
  }, [])

  const onChangeOption = useCallback((id: number, value: string) => {
    setOptions((prevOptions) => {
      let nextOptions = prevOptions.map((option) => (option.id === id ? { ...option, value } : option))

      const currentIndex = prevOptions.findIndex((option) => option.id === id)
      const lastOptionIndex = prevOptions.length - 1
      const prevValue = prevOptions[currentIndex].value

      // add the next option
      if (currentIndex === lastOptionIndex && prevValue.length < value.length) {
        nextOptions = addOptionReducer(nextOptions)
      }

      return nextOptions
    })
  }, [])

  const focusNextOption = useCallback((id: number) => {
    const currentFocusedOptionIndex = currentOptions.current.findIndex((option) => option.id === id)

    if (currentFocusedOptionIndex !== -1) {
      const nextIndex = currentFocusedOptionIndex + 1
      const nextOption = currentOptions.current[nextIndex]

      if (nextOption) {
        optionRefs.current[nextOption.id]?.focus()
      }
    }
  }, [])

  const onPressAddOption = useCallback(() => {
    const firstEmptyOptionIndex = options.findIndex((option) => option.value === '')

    // if has an empty option then focus on it
    if (firstEmptyOptionIndex > 0) {
      const id = options[firstEmptyOptionIndex].id
      const ref = optionRefs.current[id]

      if (ref && !ref.isFocused()) {
        ref.focus()
        return
      }
    }

    // else add one more option
    setOptions(addOptionReducer)
  }, [options])

  const deleteOption = useCallback((id: number) => {
    setOptions((prevOptions) => {
      const currentIndex = prevOptions.findIndex((option) => option.id === id)
      const prevIndex = currentIndex - 1

      // focus on the previous option before delete
      if (prevIndex !== -1 && optionRefs.current[id]?.isFocused()) {
        const prevOptionId = prevOptions[prevIndex].id

        optionRefs.current[prevOptionId]?.focus()
      }

      const nextOptions = prevOptions.filter((option) => option.id !== id)

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

      return nextOptions
    })
  }, [])

  const dismissModal = useCallback(() => navigation.dismissModal(), [navigation])

  const onChangeAnonymousSwitch = useCallback(() => setAnonymous((s) => !s), [])

  const onChangeAddMoreAbility = useCallback(() => setEditable((s) => !s), [])

  const submitPoll = useCallback(() => {
    if (!canSubmit) {
      return
    }

    const id = getID()

    const payload: ChatMessage = {
      id,
      user: MOCK_CURRENT_USER,
      text: 'poll',
      poll: {
        question,
        options: filledOptions,
        anonymous,
        editable,
      },
    }

    dispatch(addMessage(payload))

    scrollToLastMessage()

    dismissModal()
  }, [canSubmit, question, filledOptions, anonymous, editable, dispatch, dismissModal, scrollToLastMessage])

  const questionAsideText = `${question.length}/${POLL_QUESTION_MAX_LENGTH}`

  const optionsAsideText = `${options.length}/${POLL_OPTIONS_MAX_COUNT}`

  const addOptionButtonVisible = options.length < POLL_OPTIONS_MAX_COUNT

  return (
    <View style={styles.container}>
      <BackgroundGradient />
      <NavBar
        type='modal'
        title='New Poll'
        left={<Icon onPress={dismissModal} name='times' />}
        right={<NavBarActionButton label='Create' onPress={submitPoll} disabled={!canSubmit} />}
      />
      <KeyboardScrollView
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <FormSection label='Question' aside={questionAsideText}>
          <FormInput
            value={question}
            onChangeText={setQuestion}
            maxLength={POLL_QUESTION_MAX_LENGTH}
            placeholder='Ask a question'
            multiline
          />
        </FormSection>
        <FormSection label='Options' aside={optionsAsideText}>
          {options.map(({ id, value }, index) => (
            <OptionInput
              key={id}
              value={value}
              id={id}
              index={index}
              blurOnSubmit={index === options.length - 1}
              onChangeOption={onChangeOption}
              deleteOption={deleteOption}
              onEndEditing={focusNextOption}
              getRef={handleOptionRef}
            />
          ))}
          {addOptionButtonVisible && <AddOptionButton onPress={onPressAddOption} />}
        </FormSection>
        <Cell
          label='Anonymous voting'
          icon={<Icon name='user-secret' />}
          aside={<SwitchControl value={anonymous} onChange={onChangeAnonymousSwitch} />}
        />
        <Cell
          label='Ability to add more options'
          icon={<Icon name='th-list' />}
          aside={<SwitchControl value={editable} onChange={onChangeAddMoreAbility} />}
        />
      </KeyboardScrollView>
    </View>
  )
}

AddPollScreen.screenName = NavigationScreen.ADD_POLL

AddPollScreen.options = {
  layout: {
    backgroundColor: Color.transparent,
    componentBackgroundColor: Color.transparent,
  },
}

export default AddPollScreen
