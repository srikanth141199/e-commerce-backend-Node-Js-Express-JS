export default class CartItemModel {
  constructor(productID, userID, quantity, id) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this.id = id;
  }

  static add(productID, userID, quantity) {
    const cartItem = new CartItemModel(productID, userID, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }

  static getBasedUserID(userID) {
    return cartItems.filter((items) => items.userID == userID);
  }

  static delete(cartItemID, userID) {
    const cartItemIndex = cartItems.findIndex((item) => item.id == cartItemID && item.userID == userID);

    if (cartItemIndex == -1) {
      return "Item not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
  }
}

var cartItems = [new CartItemModel(1, 2, 1, 1)];
