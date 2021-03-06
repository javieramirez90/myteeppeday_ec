import { CartActionTypes } from './cart.types'

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItemFromCart = itemId => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: itemId
})

export const removeItem = itemId => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: itemId
})