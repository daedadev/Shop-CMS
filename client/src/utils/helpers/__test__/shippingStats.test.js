import { getShippingCosts } from "../shippingStats.helpers";

describe("getShippingCosts", () => {
  const shippingData = [
    {
      name: "standard",
      price: 7.99,
      personal_cost: 4.99,
    },
    {
      name: "priority",
      price: 15.99,
      personal_cost: 12.99,
    },
    {
      name: "next-day",
      price: 34.99,
      personal_cost: 29.99,
    },
  ];

  test("Calculate shipping income and shipping costs", () => {
    getShippingCosts(shippingData, testCostOfShipping, testShippingIncome);

    function testCostOfShipping(shippingCost) {
      expect(shippingCost).toEqual(58.97);
    }
    function testShippingIncome(shippingPrice) {
      expect(shippingPrice).toEqual(47.97);
    }
  });
});
