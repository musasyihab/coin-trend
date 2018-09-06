import React from 'react'
import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Button from '../Components/Button'
import InputPurchaseModal from '../Components/InputPurchaseModal'
import PriceChart from '../Components/PriceChart'
import ProfitSection from '../Components/ProfitSection'

import API from '../Services/Api'
import CoinActions from '../Redux/CoinRedux'

// Styles
import styles from './Styles/PriceTrendScreenStyle'
import { Colors } from '../Themes';

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
        const month = dateSplit[1]-1;
        const day = dateSplit[2];
        const item = {
          date: new Date(year, month, day),
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

  _renderPriceItem ({item}) {
    const { date, price, isLatest } = item;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateString = date.toDateString();
    return (
      <View style={styles.row}>
        { isLatest && <Text style={styles.latestLabel}>{'LATEST PRICE'}</Text> }
        <View style={styles.rowContainer}>  
          <Text style={styles.dateLabel(isLatest)}>{dateString}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currencyLabel(isLatest)}>{'USD'}</Text>
            <Text style={styles.priceLabel(isLatest)}>{price}</Text>
          </View>
        </View>
        <View style={styles.divider}/>
      </View>
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
      <Button
        onPress={this._getCurrentPrice}
        isRounded={true}>
        Reload
      </Button>
    </View>
  );

  _renderLoading = () => (
    <ActivityIndicator size="large" color={Colors.charcoal} />
  );

  _renderProfitSection = () => {
    const latestPrice = this.state.priceList[0].price;
    return (
      <ProfitSection
        latestPrice={latestPrice}
        savedPurchasePrice={this.props.savedPurchasePrice}
        sectionWidth={windowWidth}
        onPressEdit={() => this.setupModalVisibility(true)}
        onPressDelete={this.deletePurchasePrice}
        onPressInput={() => this.setupModalVisibility(true)}
      />
    )
  }

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

  _renderPriceChart = () => (
    <PriceChart
      chartTitle={'Price in the last 30 days'}
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      data={this.state.priceList}
    />
  )

  _renderInputPurchaseModal = () => (
    <InputPurchaseModal
      isVisible={this.state.showModal}
      onSave={this.savePurchasePrice}
      onCancel={() => this.setupModalVisibility(false)}
      onInputChange={(inputPrice) => this.setState({inputPrice})}
      defaultValue={this.props.savedPurchasePrice}
    />
  );

  keyExtractor = (item, index) => index.toString()

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this._renderInputPurchaseModal()}
        {!this.state.isLoading && this.state.priceList.length > MINIMUM_DATA && this._renderProfitSection()}
        <View style={styles.listContainer}>
          {this.state.isLoading ? this._renderLoading() : this._renderList()}
          {!this.state.isLoading && this.state.priceList.length > MINIMUM_DATA && this._renderPriceChart()}
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
