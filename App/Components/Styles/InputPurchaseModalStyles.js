import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default {
  modalParentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundTransparent
  },
  modalContainer: {
    width: 300,
    height: 120,
    borderRadius: 5,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputLabel: {
    color: Colors.darkGrey,
    fontSize: 14,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    textAlign: 'center'
  },
  textInput: {
    fontSize: 16,
    width: 200,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    textAlign: 'center',
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1
    },
  buttonsContainer: {
    flex: 1,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}




