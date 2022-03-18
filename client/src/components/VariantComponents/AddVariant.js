import React, { useRef } from "react";

export default function AddVariant({
  variant,
  index,
  variantUpdate,
  removeVariant,
}) {
  const variantRef = useRef();
  const xsRef = useRef();
  const sRef = useRef();
  const mRef = useRef();
  const lRef = useRef();
  const xlRef = useRef();

  function inputChanging() {
    const color = {
      color: variantRef.current.value,
      xs: xsRef.current.value,
      s: sRef.current.value,
      m: mRef.current.value,
      l: lRef.current.value,
      xl: xlRef.current.value,
      clothing_id: variant.clothing_id,
    };
    variantUpdate(color, index);
  }

  function deleteVariant() {
    removeVariant("", index, "added");
  }

  return (
    <article className="flex flex-col md:flex-row mt-5">
      <div className="flex flex-col w-full">
        <label>Variant</label>
        <input
          onChange={inputChanging}
          ref={variantRef}
          defaultValue={variant.color}
          className="w-full border-2 border-slate-300 rounded-lg"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteVariant();
          }}
          className="group flex bg-red-700 text-white w-fit pl-3 pr-3 rounded-lg hover:bg-red-600 mt-2"
        >
          -
        </button>
      </div>

      <div className="flex flex-col w-full items-center">
        <label>Stock</label>
        <div className="flex flex-col w-32">
          <div className="flex flex-row w-full justify-between mt-2">
            <label>xs</label>
            <input
              onChange={inputChanging}
              ref={xsRef}
              className="flex w-12 text-center border-2 border-slate-300 rounded-lg"
              defaultValue={variant.xs}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>s</label>
            <input
              onChange={inputChanging}
              ref={sRef}
              className="flex w-12 text-center border-2 border-slate-300 rounded-lg"
              defaultValue={variant.s}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>m</label>
            <input
              onChange={inputChanging}
              ref={mRef}
              className="flex w-12 text-center border-2 border-slate-300 rounded-lg"
              defaultValue={variant.m}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>l</label>
            <input
              onChange={inputChanging}
              ref={lRef}
              className="flex w-12 text-center border-2 border-slate-300 rounded-lg"
              defaultValue={variant.l}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-between mt-2">
            <label>xl</label>
            <input
              onChange={inputChanging}
              ref={xlRef}
              className="flex w-12 text-center border-2 border-slate-300 rounded-lg"
              defaultValue={variant.xl}
            ></input>
          </div>
        </div>
      </div>
    </article>
  );
}
