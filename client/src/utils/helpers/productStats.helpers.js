export function settingIncomeByDate(
  income,
  setIncomeDates,
  setIncomePricesByDate
) {
  let newArray = income;
  for (var n = 0; n < income.length; n++) {
    for (var i = 0; i < income.length; i++) {
      if (income[n].date === income[i].date && n !== i) {
        const newPrice = income[n].price + income[i].price;
        newArray.splice(i, 1);
        newArray[n] = { price: newPrice, date: income[n].date };
      }
    }
  }
  const incomeDateArray = newArray.map((item) => {
    return item.date;
  });
  const incomePriceArray = newArray.map((item) => {
    return item.price;
  });

  setIncomeDates(incomeDateArray);
  setIncomePricesByDate(incomePriceArray);
}

export function getTotalInventoryAmount(items, setTotalInventoryAmount) {
  let inventory = 0;

  items.forEach((item) => {
    if (item.colors.length !== 0) {
      for (var i = 0; i < item.colors.length; i++) {
        inventory += item.colors[i].clothing_stock.xs;
        inventory += item.colors[i].clothing_stock.s;
        inventory += item.colors[i].clothing_stock.m;
        inventory += item.colors[i].clothing_stock.l;
        inventory += item.colors[i].clothing_stock.xl;
      }
    }
  });
  setTotalInventoryAmount(inventory);
}

export function getTotalInventoryCost(items, setTotalInventoryCost) {
  let inventory = [];
  let itemCosts = [];
  let finalPriceArray = [];
  let finalPrice = 0;
  items.forEach((item) => {
    itemCosts.push(parseFloat(item.price_per_unit));
    let itemInventory = 0;
    if (item.colors.length !== 0) {
      for (var i = 0; i < item.colors.length; i++) {
        itemInventory += item.colors[i].clothing_stock.xs;
        itemInventory += item.colors[i].clothing_stock.s;
        itemInventory += item.colors[i].clothing_stock.m;
        itemInventory += item.colors[i].clothing_stock.l;
        itemInventory += item.colors[i].clothing_stock.xl;
      }
    }
    inventory.push(itemInventory);
  });
  for (var i = 0; i < inventory.length; i++) {
    finalPriceArray.push(inventory[i] * itemCosts[i]);
  }
  for (var n = 0; n < finalPriceArray.length; n++) {
    finalPrice += finalPriceArray[n];
  }
  setTotalInventoryCost(finalPrice);
}
