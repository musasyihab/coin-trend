import { Colors, Metrics } from '../../Themes/'

export default {
  savedText: {
    fontSize: 14,
    color: Colors.darkGrey
  },
  profitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
    padding: Metrics.smallMargin
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
