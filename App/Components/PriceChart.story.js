import React from 'react'
import { storiesOf } from '@storybook/react-native'

import PriceChart from './PriceChart'

storiesOf('PriceChart')
  .add('Default', () => (
    <PriceChart
      chartTitle={'Title'}
      data={[{ date: Date.now(), price: 100 }, { date: Date.now(), price: 200 }]}
    />
  ))
