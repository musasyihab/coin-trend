import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  savePurchasePrice: ['savedPurchasePrice'],
  clearState: null
})

export const CoinTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  savedPurchasePrice: null
})

/* ------------- Reducers ------------- */

export const savePurchasePrice = (state, { savedPurchasePrice }) =>
  state.merge({ savedPurchasePrice })

export const clearState = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_PURCHASE_PRICE]: savePurchasePrice,
  [Types.CLEAR_STATE]: clearState
})
