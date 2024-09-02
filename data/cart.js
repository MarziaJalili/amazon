export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }] ;
  
}




function saveToCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
  let matchingItem;
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = quantitySelector ? Number(quantitySelector.value) : 0; // Handle null quantitySelector
      
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
  saveToCart();
}

export function removeFromCart(productId) {
  const newCart = [];
  
  cart.forEach((cartItem)=> {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })
  cart = newCart;
  saveToCart();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToCart();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToCart();

}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)

    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}