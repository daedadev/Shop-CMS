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
        for (var n = 0; n < item.colors.length; n++) {
          inventory += item.colors[n].clothing_stock.xs;
          inventory += item.colors[n].clothing_stock.s;
          inventory += item.colors[n].clothing_stock.m;
          inventory += item.colors[n].clothing_stock.l;
          inventory += item.colors[n].clothing_stock.xl;
        }
      }
    }
  });
  setTotalInventoryAmount(inventory);
}

export function getTotalInventoryCost(items) {}
