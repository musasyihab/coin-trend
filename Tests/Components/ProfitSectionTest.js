import 'react-native'
import React from 'react'
import { Text } from 'react-native'
import ProfitSection from '../../App/Components/ProfitSection'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Button from '../../App/Components/Button';

const emptyFn = () => {};

test('ProfitSection component renders correctly', () => {
  const tree = renderer.create(
    <ProfitSection
      latestPrice={9000}
      savedPurchasePrice={8000}
      sectionWidth={500}
      onPressEdit={() => {}}
      onPressDelete={() => {}}
      onPressInput={() => {}}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('onPressEdit should work properly', () => {
  const onPressEdit = jest.fn()
  const wrapper = shallow(<ProfitSection savedPurchasePrice={8000} onPressEdit={onPressEdit} onPressDelete={emptyFn} onPressInput={emptyFn}/>)
  const editBtn = wrapper.find(Button).at(0)

  expect(editBtn.prop('onPress')).toEqual(onPressEdit) // uses the right handler
  editBtn.simulate('press')
  expect(onPressEdit).toBeCalled()
})

test('onPressDelete should work properly', () => {
  const onPressDelete = jest.fn()
  const wrapper = shallow(<ProfitSection savedPurchasePrice={8000} onPressEdit={emptyFn} onPressDelete={onPressDelete} onPressInput={emptyFn}/>)
  const deleteBtn = wrapper.find(Button).at(1)

  expect(deleteBtn.prop('onPress')).toEqual(onPressDelete) // uses the right handler
  deleteBtn.simulate('press')
  expect(onPressDelete).toBeCalled()
})

test('onPressInput should work properly', () => {
  const onPressInput = jest.fn()
  const wrapper = shallow(<ProfitSection onPressEdit={emptyFn} onPressDelete={emptyFn} onPressInput={onPressInput}/>)
  const inputBtn = wrapper.find(Button).at(0)

  expect(inputBtn.prop('onPress')).toEqual(onPressInput) // uses the right handler
  inputBtn.simulate('press')
  expect(onPressInput).toBeCalled()
})
