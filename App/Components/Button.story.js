import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Button from './Button'

storiesOf('Button')
  .add('Default', () => (
    <Button
      text='A simple rounded button'
    />
  ))
  .add('Rounded Button', () => (
    <Button
      text='A simple rounded button'
      isRounded={true}
    />
  ))
