import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/CoinRedux'

test('savePurchasePrice', () => {
  const state = reducer(INITIAL_STATE, Actions.savePurchasePrice(900))

  expect(state.savedPurchasePrice).toBe(900)
})

test('clearState', () => {
  const state = reducer(INITIAL_STATE, Actions.clearState())
  expect(state.savedPurchasePrice).toBe(null)
})
