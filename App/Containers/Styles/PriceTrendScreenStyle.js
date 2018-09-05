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
  profitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
    padding: Metrics.smallMargin
  },
  inputProfitButton: {
    color: Colors.darkGrey,
    padding: Metrics.smallMargin
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
  dateLabel: isLatest => ({
    fontSize: 16,
    color: isLatest ? Colors.primary : Colors.white,
    textAlign: 'left',
    alignSelf: 'center'
  }),
  priceContainer: {
    flexDirection: 'row',
  },
  currencyLabel: isLatest => ({
    fontSize: 12,
    color: isLatest ? Colors.primary : Colors.white,
    textAlign: 'right',
    alignSelf: 'center',
    marginRight: Metrics.smallMargin
  }),
  priceLabel: isLatest => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: isLatest ? Colors.primary : Colors.white,
    textAlign: 'right'
  }),
  emptyLabel: {
    fontSize: 12,
    color: Colors.lightGrey,
    textAlign: 'center'
  },
  chartTextLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.lightGrey,
    marginTop: Metrics.smallMargin,
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
  },
  modalParentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundTransparent
  },
  modalContainer: {
    width: 300,
    height: 100,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputLabel: {
    fontSize: 14,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    textAlign: 'center'
  },
  textInput: {
    fontSize: 16,
    width: 200,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    textAlign: 'center'
  },
  buttonsContainer: {
    flex: 1,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  positiveButton: {
    fontSize: 16,
    color: Colors.green,
    padding: Metrics.smallMargin
  },
  negativeButton: {
    fontSize: 16,
    color: Colors.darkGrey,
    padding: Metrics.smallMargin
  },
  savedText: {
    fontSize: 14,
    color: Colors.darkGrey
  },
  profitLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profitText: isProfit => ({
    fontSize: 20,
    color: isProfit ? Colors.green : Colors.red,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  }),
  savedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  savedButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}
