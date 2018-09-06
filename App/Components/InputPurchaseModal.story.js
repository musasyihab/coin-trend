import React from 'react'
import { storiesOf } from '@storybook/react-native'

import InputPurchaseModal from './InputPurchaseModal'

storiesOf('InputPurchaseModal')
  .add('Default', () => (
    <InputPurchaseModal
      isVisible={true}
      onSave={() => window.alert('Do Something!')}
      onCancel={() => window.alert('Canceled!')}
      onInputChange={() => window.alert('Input Changed!')}
    />
  ))
