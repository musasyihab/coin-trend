import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './Styles/ProfitSectionStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors, Metrics } from '../Themes';
import Button from './Button';

// Note that this file (App/Components/ProfitSection) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('ProfitSection', () =>
  <ProfitSection
    latestPrice={9000}
    savedPurchasePrice={8000}
    sectionWidth={500}
    onPressEdit={() => window.alert('Do Something!')}
    onPressDelete={() => window.alert('Do Something!')}
    onPressInput={() => window.alert('Do Something!')}
  />
)

export default class ProfitSection extends Component {
  static defaultProps = {
    latestPrice: 0,
    sectionWidth: 300,
    sectionHeight: 300
  }
  static propTypes = {
    latestPrice: PropTypes.number,
    savedPurchasePrice: PropTypes.number,
    sectionWidth: PropTypes.number,
    onPressEdit: PropTypes.func.isRequired,
    onPressDelete: PropTypes.func.isRequired,
    onPressInput: PropTypes.func.isRequired
  }

  _renderInputButton = () => (
    <Button
      onPress={this.props.onPressInput}
      isRounded={true}>
      +Input Purchase Price
    </Button>
  );

  _renderProfitView = () => {
    const delta = this.props.latestPrice - this.props.savedPurchasePrice;
    const isProfit = delta >= 0;
    const profitLabel = isProfit ? 'PROFIT' : 'LOSS';
    const profitText = isProfit ? `↑${delta.toFixed(4)}` : `↓${delta.toFixed(4) * -1}`;
    return (
      <View style={{width: this.props.sectionWidth, padding: Metrics.smallMargin}}>
        <Text style={styles.profitLabel}>{profitLabel}</Text>
        <Text style={styles.profitText(isProfit)}>{`${profitText}`}</Text>
        <View style={styles.savedContainer}>
          <Text style={styles.savedText}>{`Saved Purchase Price: ${this.props.savedPurchasePrice}`}</Text>
          <View style={styles.savedButtonsContainer}>
          <Button
            onPress={this.props.onPressEdit}
            backgroundColor={Colors.transparent}
            textColor={Colors.darkGrey}>
            Edit
          </Button>
          <Button
            onPress={this.props.onPressDelete}
            backgroundColor={Colors.transparent}
            textColor={Colors.darkGrey}>
            Delete
          </Button>
          </View>
        </View>
        
      </View>
    )
  };

  render () {
    return (
      <View style={styles.profitContainer}>
        {this.props.savedPurchasePrice ? this._renderProfitView() : this._renderInputButton()}
      </View>
    )
  }
}
