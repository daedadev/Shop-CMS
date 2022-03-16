import React, { useRef } from "react";

export default function ColorInputs({ variant, index, variantUpdate }) {
  const variantRef = useRef();
  const xsRef = useRef();
  const sRef = useRef();
  const mRef = useRef();
  const lRef = useRef();
  const xlRef = useRef();

  function inputChanging() {
    const color = {
      color: variantRef.current.value,
      id: variant.id,
      xs: xsRef.current.value,
      s: sRef.current.value,
      m: mRef.current.value,
      l: lRef.current.value,
      xl: xlRef.current.value,
      stock_id: variant.clothing_stock.id,
    };
    variantUpdate(color, index);
  }

  return (
    <article className="flex flex-row mt-5">
      <div className="flex flex-col">
        <label>Variant</label>
        <input
          onChange={inputChanging}
          ref={variantRef}
          defaultValue={variant.color}
        ></input>
      </div>

      <div className="flex flex-col w-full items-center">
        <label>Stock</label>
        <div className="flex flex-col w-32">
          <div className="flex flex-row w-full justify-between mt-2">
            <label>xs</label>
            <input
              onChange={inputChanging}
              ref={xsRef}
              className="flex w-12 text-center"
              defaultValue={variant.clothing_stock.xs}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>s</label>
            <input
              onChange={inputChanging}
              ref={sRef}
              className="flex w-12 text-center"
              defaultValue={variant.clothing_stock.s}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>m</label>
            <input
              onChange={inputChanging}
              ref={mRef}
              className="flex w-12 text-center"
              defaultValue={variant.clothing_stock.m}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>l</label>
            <input
              onChange={inputChanging}
              ref={lRef}
              className="flex w-12 text-center"
              defaultValue={variant.clothing_stock.l}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>xl</label>
            <input
              onChange={inputChanging}
              ref={xlRef}
              className="flex w-12 text-center"
              defaultValue={variant.clothing_stock.xl}
            ></input>
          </div>
        </div>
      </div>
    </article>
  );
}
