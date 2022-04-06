const { ClothingItem, ClothingStock, Color } = require("../models");

const clothingData = [
  {
    name: "Oversized Jacket",
    price: 250,
    description:
      "This jacket was made with love from the most loving places anyone could find.",
    price_per_unit: "120.67",
    category_id: 1,
  },
  {
    name: "Undersized Hoodie",
    price: 120,
    description: "This hoodie is way too small.",
    price_per_unit: "87.20",
    category_id: 1,
  },
  {
    name: "Levi Pants",
    price: 100,
    description: "Pants make the man and these pants definitely dont.",
    price_per_unit: "45.90",
    category_id: 2,
  },
  {
    name: "Longsleeve Cardigan",
    price: 55,
    description: "A cardigan amongst cardigans, finest materials in the land.",
    price_per_unit: "32.10",
    category_id: 1,
  },
  {
    name: "Cargo Pants",
    price: 110,
    description: "Pants make the man and these pants definitely dont.",
    price_per_unit: "45.90",
    category_id: 2,
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

const shippingData = [
  {
    name: "standard",
    price: "7.99",
    personal_cost: 4.99,
  },
  {
    name: "priority",
    price: "15.99",
    personal_cost: 12.99,
  },
  {
    name: "next-day",
    price: "34.99",
    personal_cost: 29.99,
  },
];

const categoryData = [
  {
    name: "Tops",
  },
  {
    name: "Bottoms",
  },
  {
    name: "Underwear",
  },
  {
    name: "Dresses",
  },
  {
    name: "Hats",
  },
];

// Standard 7.99
// Priority 15.20
// Next Day 34.99

const orderData = [
  {
    name: "Oversized Jacket/blue",
    price: 284.99,
    size: "small",
    address: "3425 Arlington Street, Brokton, Oklahoma",
    order_number: "2345",
    order_status: true,
    category_name: "Tops",
    updatedAt: "03/10/2022",
    shipping_id: 3,
    user_id: 2,
  },
  {
    name: "Undersized Hoodie",
    price: 154.99,
    size: "small",
    address: "9119 Bingleton Avenue, Ringo, Nevada",
    order_number: "6543",
    order_status: false,
    category_name: "Tops",
    updatedAt: "03/10/2022",
    shipping_id: 3,
    user_id: 2,
  },
  {
    name: "Oversized Jacket/blue",
    price: 265.2,
    size: "large",
    address: "8291 Riverbed Street, Jacksonville, Kentucky",
    order_number: "1350",
    order_status: true,
    category_name: "Tops",
    updatedAt: "03/20/2022",
    shipping_id: 2,
    user_id: 1,
  },
  {
    name: "Levi Pants",
    price: 107.99,
    size: "large",
    address: "8291 Riverbed Street, Jacksonville, California",
    order_number: "1902",
    order_status: false,
    category_name: "Bottoms",
    updatedAt: "03/20/2022",
    shipping_id: 1,
    user_id: 3,
  },
];

module.exports = {
  clothingData,
  colorData,
  stockData,
  userData,
  orderData,
  shippingData,
  categoryData,
};
