import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Modal, View, TextInput } from 'react-native'
import styles from './Styles/InputPurchaseModalStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes';
import Button from './Button';

// Note that this file (App/Components/InputPurchaseModal) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('InputPurchaseModal', () =>
  <InputPurchaseModal
    isVisible={true}
    onSave={() => window.alert('Do Something!')}
    onCancel={() => window.alert('Canceled!')}
    onInputChange={() => window.alert('Input Changed!')}
  />
)

export default class InputPurchaseModal extends Component {
  static defaultProps = {
    isVisible: false,
    onRequestClose: () => {},
    animationType: 'fade'
  }
  static propTypes = {
    isVisible: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    animationType: PropTypes.string
  }

  render () {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onRequestClose}>
        <View style={styles.modalParentContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.textInputLabel}>{'Please input your purchase price:'}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0"
              defaultValue={this.props.defaultValue}
              onChangeText={(inputPrice) => this.props.onInputChange(inputPrice)}
              keyboardType={'numeric'}
            />
            <View style={styles.buttonsContainer}>
              <Button
                onPress={this.props.onSave}
                backgroundColor={Colors.transparent}
                textColor={Colors.green}>
                Save
              </Button>
              <Button
                onPress={this.props.onCancel}
                backgroundColor={Colors.transparent}
                textColor={Colors.darkGrey}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
