import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'
import API from '../Services/Api'

// Styles
import styles from './Styles/PriceTrendScreenStyle'
import { Colors } from '../Themes';

class PriceTrendScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Price Trend',
    /* No more header config here! */
  };

  constructor (props) {
    super(props)
  
    this.state = {
      isLoading: true,
      priceList: []
    }
    this._getCurrentPrice();
  }

  _getCurrentPrice = async () => {
    try {
      const api = API.create();
      this.setState({ isLoading: true });
      const result = await api.getCurrentPrice();
      const currentDate = get(result, 'data.time.updatedISO');
      const currentRate = get(result, 'data.bpi.USD.rate');
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

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {this.state.isLoading ? this._renderLoading() : this._renderList()}
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
