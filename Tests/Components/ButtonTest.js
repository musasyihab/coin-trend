import 'react-native'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Button from '../../App/Components/Button'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Metrics, Colors } from '../../App/Themes'

test('Button component renders correctly', () => {
  const tree = renderer.create(<Button onPress={() => {}} text='hi' />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('onPress should work properly', () => {
  let i = 0
  const onPress = () => i++
  const wrapperPress = shallow(<Button onPress={onPress} text='hi' />)

  expect(wrapperPress.prop('onPress')).toBe(onPress) // uses the right handler
  expect(i).toBe(0)
  wrapperPress.simulate('press')
  expect(i).toBe(1)
})

test('if isRounded true it should have borderRadius of 5', () => {
  const btn = shallow(<Button text='hi' isRounded />)
  const btnStyle = btn.find(TouchableOpacity).prop('style');

  expect(btnStyle.borderRadius).toEqual(5)
})

test('if backgroundColor defined it should have correct style', () => {
  const btn = shallow(<Button text='hi' backgroundColor={'#000000'} />)
  const btnStyle = btn.find(TouchableOpacity).prop('style');
  
  expect(btnStyle.backgroundColor).toEqual('#000000')
})

test('if isUppercase is false it will show original text', () => {
  const btn = shallow(<Button text='Not Uppercase' isUppercase={false}/>)
  const text = btn.find(Text).prop('children');
  
  expect(text).toEqual('Not Uppercase')
})