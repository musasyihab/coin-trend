import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default {
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
  divider: {
    flex: 1,
    height: 1,
    marginVertical: 16,
    backgroundColor: Colors.divider
  },
  listContent: {
    marginTop: Metrics.baseMargin,
    paddingTop: 16
  }
}
