import { itemDataWithRelationships } from "../../../../../api/seeds/seedData";

import {
  settingIncomeByDate,
  getTotalInventoryAmount,
  getTotalInventoryCost,
} from "../productStats.helpers";

describe("settingIncomeByDate", () => {
  test("Takes in an array of date/price pairs and generates 2 arrays. One array of all the dates, removing duplicates, and another array of all the prices adding the duplicate day prices into one", () => {
    const orderDate = [
      {
        date: "03/20/2022",
        price: 108,
      },
      {
        date: "03/20/2022",
        price: 200,
      },
    ];

    settingIncomeByDate(orderDate, testIncomeDates, testIncomePricesByDate);

    function testIncomeDates(incomeDateArray) {
      expect(incomeDateArray.length).toEqual(1);
    }
    function testIncomePricesByDate(incomePriceArray) {
      expect(incomePriceArray[0]).toEqual(308);
    }
  });
});

describe("getTotalInventoryAmount", () => {
  test("Takes an array of inventory items and adds their stock numbers together", () => {
    getTotalInventoryAmount(
      itemDataWithRelationships,
      testTotalInventoryAmount
    );

    function testTotalInventoryAmount(inventory) {
      expect(inventory).toEqual(54);
    }
  });
});

describe("getTotalInventoryCost", () => {
  test("Takes an array of inventory items and adds each of their cost per unit together then multplies that by the stock number. Doing this per item and adding the results totals to the overal cost", () => {
    getTotalInventoryCost(itemDataWithRelationships, testTotalInventoryCost);

    function testTotalInventoryCost(finalPrice) {
      expect(finalPrice).toEqual(6516.18);
    }
  });
});
