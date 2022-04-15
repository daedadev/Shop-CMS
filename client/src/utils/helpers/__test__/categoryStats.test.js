import {
  getIncomePerCategory,
  generateCategoryColors,
  getStockByCategory,
} from "../categoryStats.helpers";

import {
  categoryDataWithRelationships,
  orderData,
} from "../../../../../api/seeds/seedData";

function mockFunction() {}

describe("generateCategoryColors", () => {
  test("Takes in an array and generates an equal length array of colors", () => {
    const testArray = [0, 1];
    generateCategoryColors(testArray, testCategoryColors);

    function testCategoryColors(colorArray) {
      expect(colorArray.length).toEqual(2);
    }
  });
});

describe("getIncomePerCategory", () => {
  test("Takes in orderData and outputs two arrays, one of category name and one of category prices", () => {
    getIncomePerCategory(
      orderData,
      testIncomeCategoryNames,
      testIncomePerCategory,
      mockFunction
    );

    function testIncomeCategoryNames(categoryArray) {
      expect(categoryArray).toEqual(["Tops", "Bottoms"]);
    }
    function testIncomePerCategory(priceArray) {
      expect(priceArray).toEqual([705.18, 107.99]);
    }
  });
});

describe("getStockByCategory", () => {
  test("Takes in category array and returns an array of category names and an array of category stock numbers", () => {
    getStockByCategory(
      categoryDataWithRelationships,
      testStockPerCategory,
      testStockCategoryNames
    );

    function testStockPerCategory(categoryStockArray) {
      expect(categoryStockArray[0]).toEqual(54);
    }
    function testStockCategoryNames(categoryNameArray) {
      expect(categoryNameArray[0]).toEqual("Tops");
    }
  });
});
