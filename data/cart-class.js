class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (cartItemsFromStorage && Array.isArray(cartItemsFromStorage)) {
      this.cartItems = cartItemsFromStorage;
    } else {
      this.cartItems = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    }
  }

  saveToCart() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = quantitySelector ? Number(quantitySelector.value) : 0; // Handle null quantitySelector
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToCart();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
    this.saveToCart();
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.cartItems.find((item) => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToCart();
    }
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find((item) => item.productId === productId);
    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToCart();
    }
  }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);