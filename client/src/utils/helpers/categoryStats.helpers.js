export function getIncomePerCategory(
  orderList,
  setIncomeCategoryNames,
  setIncomePerCategory,
  setCategoryColors
) {
  let categoryArray = [];
  let priceArray = [];

  // console.log(orderList);

  for (var i = 0; i < orderList.length; i++) {
    if (categoryArray.includes(orderList[i].category_name)) {
      const categoryIndex = categoryArray.indexOf(orderList[i].category_name);
      priceArray[categoryIndex] += orderList[i].price;
    } else {
      // console.log(false);
      categoryArray.push(orderList[i].category_name);
      priceArray.push(orderList[i].price);
    }
  }
  for (var j = 0; j < priceArray.length; j++) {
    priceArray[j] = parseFloat(priceArray[j].toFixed(2));
  }
  // console.log(categoryArray, priceArray);
  setIncomeCategoryNames(categoryArray);
  setIncomePerCategory(priceArray);
  generateCategoryColors(categoryArray, setCategoryColors);
}

export function generateCategoryColors(categoryArray, setCategoryColors) {
  let colorArray = [];
  for (var i = 0; i < categoryArray.length; i++) {
    if (i % 2 === 0) {
      const randomInt = Math.random() * (231 - 22) + 22;
      colorArray.push(`rgb(18,${randomInt},213, .5)`);
    } else {
      const randomInt = Math.random() * (231 - 22) + 22;
      colorArray.push(`rgb(224,18,${randomInt}, .5)`);
    }
  }
  setCategoryColors(colorArray);
}

export function getStockByCategory(
  items,
  setStockPerCategory,
  setStockCategoryNames
) {
  let categoryStockArray = [];
  let categoryNameArray = [];

  // console.log(items);

  items.forEach((item) => {
    let inventory = 0;
    if (item.clothing_items.length > 0) {
      categoryNameArray.push(item.name);
      for (var j = 0; j < item.clothing_items.length; j++) {
        if (item.clothing_items[j].colors.length !== 0) {
          for (var i = 0; i < item.clothing_items[j].colors.length; i++) {
            inventory += item.clothing_items[j].colors[i].clothing_stock.xs;
            inventory += item.clothing_items[j].colors[i].clothing_stock.s;
            inventory += item.clothing_items[j].colors[i].clothing_stock.m;
            inventory += item.clothing_items[j].colors[i].clothing_stock.l;
            inventory += item.clothing_items[j].colors[i].clothing_stock.xl;
          }
        }
      }
      categoryStockArray.push(inventory);
    }
  });

  setStockPerCategory(categoryStockArray);
  setStockCategoryNames(categoryNameArray);
}
