export default {
  // Functions return fixtures
  getCurrentPrice: () => {
    return {
      ok: true,
      data: require('../Fixtures/current.json')
    }
  },
  getPrices: () => {
    return {
      ok: true,
      data: require('../Fixtures/prices.json')
    }
  }
}
