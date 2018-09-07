import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ProfitSection from './ProfitSection'

storiesOf('ProfitSection')
  .add('Default', () => (
    <ProfitSection
      latestPrice={9000}
      savedPurchasePrice={8000}
      sectionWidth={500}
      onPressEdit={() => window.alert('Do Something!')}
      onPressDelete={() => window.alert('Do Something!')}
      onPressInput={() => window.alert('Do Something!')}
    />
  ))
