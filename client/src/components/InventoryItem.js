import React from "react";

export default function InventoryItem({ item }) {
  return (
    <article className="flex flex-col w-full mb-5 bg-slate-100 p-5 rounded-lg shadow-lg">
      <div className="flex flex-row text-black ml-2">
        <h1 className="text-xl w-1/3">{item.name}</h1>
        <h1 className="text-xl w-1/3">${item.price} </h1>
        <h1 className="text-xl w-1/3">Total Stock: 10 </h1>
      </div>
      <h1 className="text-lg text-black ml-2">Variants</h1>
      <div className="flex flex-col ">
        {item.colors.map((color) => {
          return (
            <div className="relative flex-col group bg-slate-300 mt-1 rounded-lg">
              <label for={item.name + color.color}>
                <h1 className="text-lg bg-slate-400 w-[full] pl-5 pr-5  p-1 hover:bg-slate-300 hover:cursor-pointer transition-all rounded-lg">
                  {color.color}
                </h1>
              </label>
              <input
                className="sr-only peer"
                type="checkbox"
                id={item.name + color.color}
              />
              <section className="hidden flex-row w-[full] justify-around peer-checked:flex text-slate-700 bg-slate-200 rounded-lg transition-all">
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
