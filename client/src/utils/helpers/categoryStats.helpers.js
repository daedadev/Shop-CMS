export function getIncomePerCategory(
  orderList,
  setcategoryNames,
  setIncomePerCategory
) {
  let categoryArray = [];
  let priceArray = [];

  console.log(orderList);

  for (var i = 0; i < orderList.length; i++) {
    if (categoryArray.includes(orderList[i].category_name)) {
      const categoryIndex = categoryArray.indexOf(orderList[i].category_name);
      priceArray[categoryIndex] += orderList[i].price;
    } else {
      console.log(false);
      categoryArray.push(orderList[i].category_name);
      priceArray.push(orderList[i].price);
    }
  }
  console.log(categoryArray, priceArray);
  setcategoryNames(categoryArray);
  setIncomePerCategory(priceArray);
}
