import React from "react";

export default function InventoryItem({ item }) {
  return (
    <article className="flex flex-col w-full bg-slate-300 mb-5">
      <div className="flex flex-row">
        <h1 className="text-xl w-1/3">Name: {item.name}</h1>
        <h1 className="text-xl w-1/3">Price: ${item.price} </h1>
        <h1 className="text-xl w-1/3">Total Stock: 10 </h1>
      </div>
      <h1 className="text-lg">Variants</h1>
      <div className="flex flex-col bg-cyan-200">
        {item.colors.map((color) => {
          return (
            <div className="flex flex-col bg-blue-300 group">
              <h1 className="text-lg">{color.color}</h1>
              <section className="hidden flex-row w-full justify-around group-hover:flex">
                <div>
                  <h1 className="text-lg">Size</h1>
                  <h1 className="text-lg">Stock</h1>
                </div>
                <div>
                  <h1 className="text-lg">XS</h1>
                  <h1>{color.clothing_stock.xs}</h1>
                </div>
                <div>
                  <h1 className="text-lg">S</h1>
                  <h1>{color.clothing_stock.s}</h1>
                </div>
                <div>
                  <h1 className="text-lg">M</h1>
                  <h1>{color.clothing_stock.m}</h1>
                </div>
                <div>
                  <h1 className="text-lg">L</h1>
                  <h1>{color.clothing_stock.l}</h1>
                </div>
                <div>
                  <h1 className="text-lg">XL</h1>
                  <h1>{color.clothing_stock.xl}</h1>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </article>
  );
}
