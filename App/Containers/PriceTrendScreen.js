import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
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
      priceList: []
    }
    this._getCurrentPrice();
  }

  _getCurrentPrice = async () => {
    try {
      const api = API.create();
      const result = await api.getCurrentPrice();
      const currentDate = result.data.time.updatedISO;
      const currentRate = result.data.bpi.USD.rate;
      if(currentRate){
        const date = currentDate.substring(0,10);
        const dateSplit = date.split('-');
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        alert(`${year}, ${month}, ${day}`)
        const item = {
          date: new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]),
          price: currentRate
        };
        this._getPrices(item);
      }
    } catch (error) {
      alert(error);
    }
  }

  _getPrices = async (currentItem) => {
    try {
      const list = [];
      const api = API.create();
      const result = await api.getPrices();
      const prices = result.data.bpi;
      if(prices){
        Object.keys(prices).forEach( key => {
          const dateSplit = key.split('-');
          const item = {
            date: new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2]),
            price: prices[key]
          };
          list.push(item);
          console.log(`${key}`, prices[key] );
        });
        list.push(currentItem);
        this.setState({
          priceList: list.reverse()
        })
      }
    } catch (error) {
      alert(error);
    }
  }

  _navigateToDetail = (selectedNews) => () => {
    // const { selectSource, navigation: { navigate } } = this.props;
    // selectSource(selectedNews.id);
    // navigate(Constants.Routes.NewsListScreen, { headerTitle: selectedNews.name });
  }

  _renderPriceItem ({item}) {
    const event = item.date;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateString = event.toDateString();
    // const dateString = event.toLocaleDateString('en-US', options);

    console.log(dateString);
    return (
      <TouchableOpacity style={styles.row} onPress={this._navigateToDetail(item)}>
        <View style={styles.rowContainer}>
          <Text style={styles.dateLabel}>{dateString}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currencyLabel}>{'USD'}</Text>
            <Text style={styles.priceLabel}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
    )
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

  _renderLoading = () => (
    <ActivityIndicator size="large" color={Colors.charcoal} />
  );

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {this.state.priceList.length > 0 ? this._renderPriceList() : this._renderLoading()}
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
