export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem =  cartItems.find(item => cartItemToAdd.id === item.id);

  if(existingCartItem) {
    return cartItems.map(item =>
      cartItemToAdd.id === item.id ? {...item, quantity: item.quantity + 1 } : item
    )
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const clearItemFromTheCart = (cartItems, cartItemIdToRemove) => {
  const cartItemsFiltered = cartItems.filter(item => item.id !== cartItemIdToRemove);

  return [...cartItemsFiltered ]
};

export const removeItemFromCart = (cartItems, cartItemIdToRemove) => {
  const existingCartItem = cartItems.find(item => item.id === cartItemIdToRemove);

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== cartItemIdToRemove);
  }

  return cartItems.map(
    cartItem => cartItem.id === cartItemIdToRemove ?
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  )
};