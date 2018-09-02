import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
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
  dateLabel: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'left',
    alignSelf: 'center'
  },
  priceContainer: {
    flexDirection: 'row',
  },
  currencyLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    textAlign: 'right',
    alignSelf: 'center',
    marginRight: Metrics.smallMargin
  },
  priceLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondaryText,
    textAlign: 'right'
  },
  titleLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondaryText,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
  },
  descriptionLabel: {
    color: Colors.secondaryText
  },
  divider: {
    flex: 1,
    height: 1,
    marginVertical: 16,
    backgroundColor: Colors.divider
  },
  listContent: {
    marginTop: Metrics.baseMargin,
    paddingTop: 16,
    backgroundColor: Colors.white
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
  }
})
