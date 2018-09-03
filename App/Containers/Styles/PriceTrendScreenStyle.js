import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default {
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  latestLabel: {
    flex: 1,
    fontSize: 12,
    color: Colors.white,
    backgroundColor: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: Metrics.smallMargin,
    alignSelf: 'center'
  },
  dateLabel: isFirst => ({
    fontSize: 16,
    color: isFirst ? Colors.primary : Colors.white,
    textAlign: 'left',
    alignSelf: 'center'
  }),
  priceContainer: {
    flexDirection: 'row',
  },
  currencyLabel: isFirst => ({
    fontSize: 12,
    color: isFirst ? Colors.primary : Colors.white,
    textAlign: 'right',
    alignSelf: 'center',
    marginRight: Metrics.smallMargin
  }),
  priceLabel: isFirst => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: isFirst ? Colors.primary : Colors.white,
    textAlign: 'right'
  }),
  emptyLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    textAlign: 'center'
  },
  reloadLabel: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center'
  },
  reloadButton: {
    marginTop: Metrics.smallMargin,
    backgroundColor: Colors.primary,
    padding: Metrics.smallMargin
  },
  divider: {
    flex: 1,
    height: 1,
    marginVertical: 16,
    backgroundColor: Colors.divider
  },
  listContent: {
    marginTop: Metrics.baseMargin,
    paddingTop: 16
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.darkPrimary,
    padding: Metrics.padding
  },
  categoryItem: {
    padding: 5,
    backgroundColor: Colors.transparent
  },
  categoryItemSelected: {
    padding: 5,
    backgroundColor: Colors.white
  },
  categoryText: {
    fontSize: 16,
    color: Colors.white
  },
  categoryTextSelected: {
    fontSize: 16,
    color: Colors.primary
  },
  categoryLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow
  },
  chartContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
