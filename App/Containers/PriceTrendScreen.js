import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { get, range, random } from 'lodash'
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
  Vic
} from "victory-native";

import API from '../Services/Api'

// Styles
import styles from './Styles/PriceTrendScreenStyle'
import { Colors } from '../Themes';

const windowWidth = Dimensions.get('window').width - 30;

class PriceTrendScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Price Trend',
    /* No more header config here! */
  };

  constructor (props) {
    super(props)
  
    this.state = {
      isLoading: true,
      priceList: [],
      transitionData: this.getTransitionData()
    }
    this._getCurrentPrice();
  }

  _getCurrentPrice = async () => {
    try {
      const api = API.create();
      this.setState({ isLoading: true });
      const result = await api.getCurrentPrice();
      const currentDate = get(result, 'data.time.updatedISO');
      const currentRate = get(result, 'data.bpi.USD.rate_float');
      if(currentRate && currentDate){
        const date = currentDate.substring(0,10);
        const dateSplit = date.split('-');
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        const item = {
          date: new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]),
          price: currentRate,
          isFirst: true
        };
        this._getPrices(item);
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  }

  _getPrices = async (currentPrice) => {
    try {
      const list = [];
      const api = API.create();
      const result = await api.getPrices();
      const prices = get(result, 'data.bpi');
      if(prices){
        Object.keys(prices).forEach( key => {
          const dateSplit = key.split('-');
          const item = {
            date: new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]),
            price: prices[key],
            isFirst: false
          };
          list.push(item);
        });
        list.push(currentPrice);
        this.setState({
          priceList: list.reverse()
        })
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({ isLoading: false });
  }

  _navigateToDetail = (selectedNews) => () => {
    // const { selectSource, navigation: { navigate } } = this.props;
    // selectSource(selectedNews.id);
    // navigate(Constants.Routes.NewsListScreen, { headerTitle: selectedNews.name });
  }

  _renderPriceItem ({item}) {
    const { date, price, isFirst } = item;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateString = date.toDateString();
    // const dateString = date.toLocaleDateString('id-ID', options);

    console.log(dateString);
    return (
      <TouchableOpacity style={styles.row} onPress={this._navigateToDetail(item)}>
        { isFirst && <Text style={styles.latestLabel}>{'LATEST PRICE'}</Text> }
        <View style={styles.rowContainer}>  
          <Text style={styles.dateLabel(isFirst)}>{dateString}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currencyLabel(isFirst)}>{'USD'}</Text>
            <Text style={styles.priceLabel(isFirst)}>{price}</Text>
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
    )
  }

  _renderList = () => {
    return this.state.priceList.length > 0 ? this._renderPriceList() : this._renderEmptyList();
  }

  _renderPriceList = () => (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={this.state.priceList}
      renderItem={this._renderPriceItem.bind(this)}
      keyExtractor={this.keyExtractor}
      initialNumToRender={this.oneScreensWorth}
    />
  );

  _renderEmptyList = () => (
    <View
      style={styles.listContainer}
    >
      <Text style={styles.emptyLabel}>{'No data found'}</Text>
      <TouchableOpacity
        style={styles.reloadButton}
        onPress={this._getCurrentPrice}
      >
        <Text style={styles.reloadLabel}>{'RELOAD'}</Text>
      </TouchableOpacity>
    </View>
  );

  _renderLoading = () => (
    <ActivityIndicator size="large" color={Colors.charcoal} />
  );

  generateChartData = () => {
    const list = this.state.priceList.slice().reverse();
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

  getTransitionData = () => {
    const n = 30;
    return range(n).map(i => {
      return {
        x: i,
        y: random(6000, 7500),
        label: 'abc'
      };
    });
  };

  _renderChart = () => (
    <View
      style={styles.chartContainer}>
      <VictoryChart
        responsive={true}
        width={windowWidth}
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
  );

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {this.state.isLoading ? this._renderLoading() : this._renderList()}
          {!this.state.isLoading && this._renderChart()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // selectSource: (sourceId) => dispatch(NewsActions.selectSource(sourceId)),
    // clearState: () => dispatch(NewsActions.clearState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceTrendScreen)
