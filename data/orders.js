export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(order) {
  order.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('order', JSON.stringify(orders))
}