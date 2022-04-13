import { orderData } from "../../../../../api/seeds/seedData";

import { getCompletedOrderCount } from "../ordersMain.helpers";

describe("getCompletedOrderCount", () => {
  test("Takes in an array of orders and returns an object detailing completed and incompleted orders", () => {
    getCompletedOrderCount(orderData, testCompletedCount);

    function testCompletedCount(completedObject) {
      expect(completedObject).toEqual({ completed: 2, incompleted: 2 });
    }
  });
});
