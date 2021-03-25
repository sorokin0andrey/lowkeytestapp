import React, { FC, memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'

import { styles } from './styles'

const GRADIENT_COLORS = ['rgba(36, 103, 244, 0.12)', 'transparent', 'rgba(36, 103, 244, 0.06)']

const GRADIENT_START = { x: -0.5, y: 0.25 }

const GRADIENT_END = { x: 0.5, y: 1 }

const GRADIENT_LOCATIONS = [0, 0.5, 1]

const BackgroundGradientComponent: FC = () => (
  <LinearGradient
    colors={GRADIENT_COLORS}
    start={GRADIENT_START}
    end={GRADIENT_END}
    locations={GRADIENT_LOCATIONS}
    style={styles.gradient}
  />
)

export const BackgroundGradient = memo(BackgroundGradientComponent)
