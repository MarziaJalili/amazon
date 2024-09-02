import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  delivaryDays: 7,
  priceCents: 0
},{
  id: '2', 
  delivaryDays: 3,
  priceCents: 499 
},{
  id: '3',
  delivaryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(delivaryOptionId) {
  let deliveryOption;

   deliveryOptions.forEach((option) => {
     if (option.id === delivaryOptionId) {
       deliveryOption = option;
     }
   });

   return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const delivaryDays = today.add(deliveryOption.delivaryDays, 'days');
  const dateString = delivaryDays.format(
    'dddd, MMMM D'
  );

  return dateString;
}