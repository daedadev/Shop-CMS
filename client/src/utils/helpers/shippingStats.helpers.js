export function getShippingCosts(
  shippingList,
  setShippingIncome,
  setCostOfShipping
) {
  let shippingCost = 0;
  let shippingPrice = 0;

  for (var i = 0; i < shippingList.length; i++) {
    shippingCost += shippingList[i].personal_cost;
    shippingPrice += shippingList[i].price;
  }

  setCostOfShipping(shippingCost);
  setShippingIncome(shippingPrice);
}
