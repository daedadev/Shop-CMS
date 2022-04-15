const categoryDataWithRelationships = [
  {
    id: 1,
    name: "Tops",
    clothing_items: [
      {
        name: "Oversized Jacket",
        price: 250,
        description:
          "This jacket was made with love from the most loving places anyone could find.",
        price_per_unit: "120.67",
        category_id: 1,
        colors: [
          {
            id: 1,
            color: "blue",
            clothing_item_id: 1,
            clothing_stock: {
              id: 1,
              xs: 1,
              s: 20,
              m: 0,
              l: 10,
              xl: 0,
              color_id: 1,
              item_id: 1,
            },
          },
          {
            id: 2,
            color: "red",
            clothing_item_id: 1,
            clothing_stock: {
              id: 2,
              xs: 1,
              s: 0,
              m: 6,
              l: 0,
              xl: 0,
              color_id: 2,
              item_id: 1,
            },
          },
          {
            id: 3,
            color: "green",
            clothing_item_id: 1,
            clothing_stock: {
              id: 3,
              xs: 1,
              s: 7,
              m: 0,
              l: 0,
              xl: 8,
              color_id: 3,
              item_id: 1,
            },
          },
        ],
      },
    ],
  },
];

const itemDataWithRelationships = [
  {
    name: "Oversized Jacket",
    price: 250,
    description:
      "This jacket was made with love from the most loving places anyone could find.",
    price_per_unit: "120.67",
    category_id: 1,
    colors: [
      {
        id: 1,
        color: "blue",
        clothing_item_id: 1,
        clothing_stock: {
          id: 1,
          xs: 1,
          s: 20,
          m: 0,
          l: 10,
          xl: 0,
          color_id: 1,
          item_id: 1,
        },
      },
      {
        id: 2,
        color: "red",
        clothing_item_id: 1,
        clothing_stock: {
          id: 2,
          xs: 1,
          s: 0,
          m: 6,
          l: 0,
          xl: 0,
          color_id: 2,
          item_id: 1,
        },
      },
      {
        id: 3,
        color: "green",
        clothing_item_id: 1,
        clothing_stock: {
          id: 3,
          xs: 1,
          s: 7,
          m: 0,
          l: 0,
          xl: 8,
          color_id: 3,
          item_id: 1,
        },
      },
    ],
  },
];

module.exports = {
  categoryDataWithRelationships,
  itemDataWithRelationships,
};
