import 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import InputPurchaseModal from '../../App/Components/InputPurchaseModal'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Button from '../../App/Components/Button';

const emptyFn = () => {};

test('InputPurchaseModal component renders correctly', () => {
  const tree = renderer.create(<InputPurchaseModal onSave={emptyFn} onCancel={emptyFn} onInputChange={emptyFn} isVisible />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('onSave should work properly', () => {
  const onSave = jest.fn()
  const wrapper = shallow(<InputPurchaseModal onSave={onSave} onCancel={emptyFn} onInputChange={emptyFn} isVisible />)
  const saveBtn = wrapper.find(Button).at(0)

  expect(saveBtn.prop('onPress')).toEqual(onSave) // uses the right handler
  saveBtn.simulate('press')
  expect(onSave).toBeCalled()
})

test('onCancel should work properly', () => {
  const onCancel = jest.fn()
  const wrapper = shallow(<InputPurchaseModal onSave={emptyFn} onCancel={onCancel} onInputChange={emptyFn} isVisible />)
  const cancelBtn = wrapper.find(Button).at(1)

  expect(cancelBtn.prop('onPress')).toEqual(onCancel) // uses the right handler
  cancelBtn.simulate('press')
  expect(onCancel).toBeCalled()
})

test('onInputChange should work properly', () => {
  const onInputChange = jest.fn()
  const wrapper = shallow(<InputPurchaseModal onSave={emptyFn} onCancel={emptyFn} onInputChange={onInputChange} isVisible />)
  const input = wrapper.find(TextInput)

  input.simulate('changeText')
  expect(onInputChange).toBeCalled()
})