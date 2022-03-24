import React from "react";
import InventoryPage from "./pages/InventoryPage";
import { render, screen, waitFor, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InventoryItem from "./components/InventoryItem/InventoryItem";

global.fetch = require("jest-fetch-mock");

const clothingData = {
  clothing_id: 1,
  name: "Test Item",
  price: 200,
  description: "This is an update test item",
  colors: [
    {
      color: "purple",
      id: 1,
      clothing_stock: {
        xs: 2,
        s: 40,
        m: 22,
        l: 13,
        xl: 12,
        id: 1,
      },
    },
    {
      color: "orange",
      id: 2,
      clothing_stock: {
        xs: 2,
        s: 40,
        m: 22,
        l: 13,
        xl: 12,
        id: 2,
      },
    },
    {
      color: "black",
      id: 3,
      clothing_stock: {
        xs: 2,
        s: 40,
        m: 22,
        l: 13,
        xl: 12,
        id: 3,
      },
    },
  ],
};

describe("<InventoryItem>", () => {
  test("Item should display the item name", async () => {
    render(<InventoryItem item={clothingData} />);

    expect(await screen.getByTestId("Title").textContent).toBe(
      clothingData.name
    );
  });

  test("Total stock should equal all of the stock numbers added", async () => {
    let stock = clothingData.colors[0].clothing_stock;
    const currentStock = stock.xs + stock.s + stock.m + stock.l + stock.xl;

    expect(currentStock).toBe(89);
  });
});
