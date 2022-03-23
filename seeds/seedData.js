const { ClothingItem, ClothingStock, Color } = require("../models");

const clothingData = [
  {
    name: "Oversized Jacket",
    price: 250,
    description:
      "This jacket was made with love from the most loving places anyone could find.",
  },
  {
    name: "Undersized Hoodie",
    price: 120,
    description: "This hoodie is way too small.",
  },
  {
    name: "Levi Pants",
    price: 100,
    description: "Pants make the man and these pants definitely dont.",
  },
];

const colorData = [
  {
    color: "blue",
    clothing_item_id: 1,
  },
  {
    color: "red",
    clothing_item_id: 1,
  },
  {
    color: "green",
    clothing_item_id: 1,
  },
  {
    color: "blue",
    clothing_item_id: 2,
  },
  {
    color: "red",
    clothing_item_id: 2,
  },
  {
    color: "green",
    clothing_item_id: 2,
  },
  {
    color: "navy",
    clothing_item_id: 3,
  },
];

const stockData = [
  {
    xs: 1,
    s: 20,
    m: 0,
    l: 10,
    xl: 0,
    color_id: 1,
    item_id: 1,
  },
  {
    xs: 1,
    s: 0,
    m: 6,
    l: 0,
    xl: 0,
    color_id: 2,
    item_id: 1,
  },
  {
    xs: 1,
    s: 7,
    m: 0,
    l: 0,
    xl: 8,
    color_id: 3,
    item_id: 1,
  },
  {
    xs: 1,
    s: 0,
    m: 10,
    l: 0,
    xl: 10,
    color_id: 4,
    item_id: 2,
  },
  {
    xs: 11,
    s: 10,
    m: 10,
    l: 1,
    xl: 0,
    color_id: 5,
    item_id: 2,
  },
  {
    xs: 11,
    s: 0,
    m: 10,
    l: 0,
    xl: 20,
    color_id: 6,
    item_id: 2,
  },
  {
    xs: 1,
    s: 40,
    m: 0,
    l: 30,
    xl: 50,
    color_id: 7,
    item_id: 3,
  },
];

const userData = [
  {
    name: "Jacky Chin",
    email: "wabbaJack@jackmail.com",
    password: "password1",
  },
  {
    name: "John Dough",
    email: "jd@doughmail.com",
    password: "password2",
  },
  {
    name: "Catherine Blimp",
    email: "CathyB@Bimple.com",
    password: "password3",
  },
];

// Standard 7.99
// Priority 15.20
// Next Day 34.99

const orderData = [
  {
    name: "Oversized Jacket/blue",
    price: 265.2,
    size: "l",
    shipping_type: "priority",
    Address: "8291 Riverbed Street, Jacksonville, Kentucky",
    order_number: "1350",
    user_id: 1,
  },
  {
    name: "Oversized Jacket/blue",
    price: 284.99,
    size: "s",
    shipping_type: "next-day",
    Address: "3425 Arlington Street, Brokton, Oklahoma",
    order_number: "1350",
    user_id: 2,
  },
  {
    name: "Undersized Hoodie",
    price: 154.99,
    size: "s",
    shipping_type: "next-day",
    Address: "9119 Bingleton Avenue, Ringo, Nevada",
    order_number: "1350",
    user_id: 2,
  },
  {
    name: "Levi Pants",
    price: 107.99,
    size: "l",
    shipping_type: "standard",
    Address: "8291 Riverbed Street, Jacksonville, California",
    order_number: "1350",
    user_id: 3,
  },
];

module.exports = { clothingData, colorData, stockData, userData, orderData };
