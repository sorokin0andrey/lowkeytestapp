import React, { forwardRef, memo, useCallback } from 'react'
import { FlatList, FlatListProps, ListRenderItem, View } from 'react-native'

import { isIOS } from '../../consts'

import { styles } from './styles'

const InvertedFlatListComponent = forwardRef<FlatList, FlatListProps<any>>((props, ref) => {
  const { renderItem, style, ...restProps } = props

  const invertedRenderItem: ListRenderItem<any> = useCallback(
    (data) => {
      if (!renderItem) {
        return null
      }

      const content = renderItem(data)

      if (isIOS) {
        return content
      }

      return <View style={styles.inverted}>{content}</View>
    },
    [renderItem]
  )

  return (
    <FlatList
      ref={ref}
      {...restProps}
      style={[styles.inverted, style]}
      renderItem={invertedRenderItem}
      inverted={isIOS}
    />
  )
})

export const InvertedFlatList = memo(InvertedFlatListComponent)
