export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem =  cartItems.find(item => cartItemToAdd.id === item.id);

  if(existingCartItem) {
    return cartItems.map(item =>
      cartItemToAdd.id === item.id ? {...item, quantity: item.quantity + 1 } : item
    )
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}