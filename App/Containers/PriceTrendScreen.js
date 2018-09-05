import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, Modal, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { get, range, random } from 'lodash'
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";

import API from '../Services/Api'
import CoinActions from '../Redux/CoinRedux'

// Styles
import styles from './Styles/PriceTrendScreenStyle'
import { Colors, Metrics } from '../Themes';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CHART_MAX_HEIGHT = 250;
const chartWidth = windowWidth - 30;
const chartHeight = windowHeight/2 > CHART_MAX_HEIGHT ? CHART_MAX_HEIGHT : windowHeight/2;

const MINIMUM_DATA = 0;

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
      transitionData: this.getTransitionData(),
      showModal: false,
      inputPrice: null
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
          isLatest: true
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

  _getPrices = async (latestPrice) => {
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
            isLatest: false
          };
          list.push(item);
        });
        list.push(latestPrice);
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
    const { date, price, isLatest } = item;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateString = date.toDateString();
    return (
      <TouchableOpacity style={styles.row} onPress={this._navigateToDetail(item)}>
        { isLatest && <Text style={styles.latestLabel}>{'LATEST PRICE'}</Text> }
        <View style={styles.rowContainer}>  
          <Text style={styles.dateLabel(isLatest)}>{dateString}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currencyLabel(isLatest)}>{'USD'}</Text>
            <Text style={styles.priceLabel(isLatest)}>{price}</Text>
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
    )
  }

  _renderList = () => {
    return this.state.priceList.length > MINIMUM_DATA ? this._renderPriceList() : this._renderEmptyList();
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

  _renderInputButton = () => (
    <TouchableOpacity onPress={() => this.setupModalVisibility(true)}>
      <Text style={styles.inputProfitButton}>{'+Input Purchase Price'}</Text>
    </TouchableOpacity>
  );

  _renderProfitView = () => {
    const latestPrice = this.state.priceList[0].price;
    const delta = latestPrice - this.props.savedPurchasePrice;
    const isProfit = delta >= 0;
    const profitLabel = isProfit ? 'PROFIT' : 'LOSS';
    const profitText = isProfit ? `↑${delta.toFixed(4)}` : `↓${delta.toFixed(4) * -1}`;
    return (
      <View style={{width: windowWidth, padding: Metrics.smallMargin}}>
        <Text style={styles.profitLabel}>{profitLabel}</Text>
        <Text style={styles.profitText(isProfit)}>{`${profitText}`}</Text>
        <View style={styles.savedContainer}>
          <Text style={styles.savedText}>{`Saved Purchase Price: ${this.props.savedPurchasePrice}`}</Text>
          <View style={styles.savedButtonsContainer}>
          <TouchableOpacity onPress={() => this.setupModalVisibility(true)}>
            <Text style={styles.inputProfitButton}>{'EDIT'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.deletePurchasePrice}>
            <Text style={styles.inputProfitButton}>{'DELETE'}</Text>
          </TouchableOpacity>
          </View>
        </View>
        
      </View>
    )
  };

  _renderProfitSection = () => (
    <View style={styles.profitContainer}>
      {this.props.savedPurchasePrice ? this._renderProfitView() : this._renderInputButton()}
    </View>
  )

  setupModalVisibility = (isShown) => {
    console.log('isShown', isShown);
    this.setState({ showModal: isShown })
  }

  savePurchasePrice = () => {
    this.props.savePurchasePrice(this.state.inputPrice);
    this.setupModalVisibility(false);
  }

  deletePurchasePrice = () => {
    this.props.clearState();
  }

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
      <Text style={styles.chartTextLabel}>{'Price in the last 30 days'}</Text>
      <VictoryChart
        responsive={true}
        width={chartWidth}
        height={chartHeight}
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

  _renderModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.showModal}
      onRequestClose={() => {}}>
      <View style={styles.modalParentContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.textInputLabel}>{'Please input your purchase price:'}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0"
            defaultValue={this.props.savedPurchasePrice}
            onChangeText={(inputPrice) => this.setState({inputPrice})}
            keyboardType={'numeric'}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={this.savePurchasePrice}>
              <Text style={styles.positiveButton}>{'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setupModalVisibility(false)}>
              <Text style={styles.negativeButton}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  keyExtractor = (item, index) => index.toString()

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this._renderModal()}
        {!this.state.isLoading && this.state.priceList.length > MINIMUM_DATA && this._renderProfitSection()}
        <View style={styles.listContainer}>
          {this.state.isLoading ? this._renderLoading() : this._renderList()}
          {!this.state.isLoading && this.state.priceList.length > MINIMUM_DATA && this._renderChart()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    savedPurchasePrice: state.coin.savedPurchasePrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePurchasePrice: (purchasePrice) => dispatch(CoinActions.savePurchasePrice(purchasePrice)),
    clearState: () => dispatch(CoinActions.clearState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceTrendScreen)
