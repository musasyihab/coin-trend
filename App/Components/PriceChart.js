import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import {
    VictoryChart,
    VictoryVoronoiContainer,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
  } from 'victory-native';

import styles from './Styles/PriceChartStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes';


// Note that this file (App/Components/PriceChart) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('PriceChart', () =>
  <PriceChart
    chartTitle={'Title'}
    data={[{ date: Date.now(), price: 100 }, { date: Date.now(), price: 200 }]}
  />
)

export default class PriceChart extends Component {
  static defaultProps = {
    chartTitle: '',
    data: [],
    chartWidth: 300,
    chartHeight: 300
  }
  static propTypes = {
    chartTitle: PropTypes.string,
    data: PropTypes.array,
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number
  }

  generateChartData = () => {
    const list = this.props.data.slice().reverse();
    const result = list.map((item, i) => {
      const day = item.date.getDate();
      const month = item.date.getMonth() + 1;
      const label = `${day}/${month}`;
      return {
        date: label,
        price: parseInt(item.price)
      }
    })
    return result;
  }

  render () {
    return (
      <View
        style={styles.chartContainer}>
        <Text style={styles.chartTextLabel}>{this.props.chartTitle}</Text>
        <VictoryChart
          responsive={true}
          width={this.props.chartWidth}
          height={this.props.chartHeight}
          animate={{ duration: 1000 }}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ date, price }) => `${date}: ${price}`}
              responsive={true}
            />
          }
          style={{
            label: { fill: Colors.white }
          }}
        >
          <VictoryLine
            style={{
              data: { stroke: Colors.primary },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.generateChartData()}
            x="date"
            y="price"
          />
          <VictoryAxis
            fixLabelOverlap={true}
            style={{
              axis: { stroke: Colors.primary },
              ticklables: { fill: Colors.white }
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: Colors.primary },
              ticklables: { fill: Colors.white }
            }}
          />
        </VictoryChart>
      </View>
    )
  }
}
