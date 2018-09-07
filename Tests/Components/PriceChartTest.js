import 'react-native'
import React from 'react'
import { Text } from 'react-native'
import PriceChart from '../../App/Components/PriceChart'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

jest.mock('victory-native', () => ({
  VictoryChart: () => 'VictoryChart',
  VictoryVoronoiContainer: () => 'VictoryVoronoiContainer',
  VictoryLine: () => 'VictoryLine',
  VictoryAxis: () => 'VictoryAxis',
  VictoryTheme: () => 'VictoryTheme'
}))

Date.now = jest.fn(() => ({
    getDate: jest.fn(() => 1),
    getMonth: jest.fn(() => 1)
}))

test('PriceChart component renders correctly', () => {
  const tree = renderer.create(
    <PriceChart
      chartTitle={'Title'}
      data={[{ date: Date.now(), price: 100 }, { date: Date.now(), price: 200 }]}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('chartTitle should show correctText', () => {
  const wrapper = shallow(<PriceChart chartTitle={'Title'} data={[]} />)
  const textView = wrapper.find(Text)

  expect(textView.prop('children')).toEqual('Title')
})

test('VictoryAxis should have correct length', () => {
  const wrapper = shallow(<PriceChart chartTitle={'Title'} data={[{ date: Date.now(), price: 100 }, { date: Date.now(), price: 200 }]} />)
  const axisView = wrapper.find('VictoryAxis')
  
  expect(axisView.length).toBe(2);
})

test('VictoryLine should have correct length', () => {
  const wrapper = shallow(<PriceChart chartTitle={'Title'} data={[{ date: Date.now(), price: 100 }, { date: Date.now(), price: 200 }]} />)
  const lineView = wrapper.find('VictoryAxis')
  
  expect(lineView.length).toBe(2);
})