import { Fonts, Metrics } from '../../Themes/'

export default {
  button: (isRounded, backgroundColor) => ({
    borderRadius: isRounded ? 5 : 0,
    padding: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    backgroundColor: backgroundColor,
    justifyContent: 'center'
  }),
  buttonText: textColor => ({
    color: textColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium
  })
}
