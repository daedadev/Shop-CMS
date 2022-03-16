import React, { useEffect, useState, useRef } from "react";
import ColorInputs from "../ColorInputs/ColorInputs";

export default function EditModal({ setToggle, toggle, item }) {
  const [submitting, setSubmitting] = useState(false);
  const [variants, setVariants] = useState([]);

  // Takes updated variants and adds them to variants one by one
  async function variantUpdate(col) {
    let newArray = variants;
    setSubmitting(newArray.push(col));
  }

  if (toggle && item.colors) {
    return (
      <section className="flex absolute bg-slate-100 h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-5 rounded-lg shadow-md">
        <form className="flex flex-col w-full h-full justify-between pl-10 pr-10 overflow-y-auto">
          <section className="flex flex-col w-full mb-20">
            <h1 className="w-full text-black text-3xl text-center mt-10 font-semibold">
              {item.name}
            </h1>
            <section className="flex flex-col md:flex-row">
              <article className="flex flex-col">
                <label>Name</label>
                <input
                  className="w-full"
                  defaultValue={item.name}
                  type="text"
                ></input>
              </article>
              <article className="flex flex-col">
                <label className="">Price</label>
                <input defaultValue={item.price} type="text"></input>
              </article>
            </section>
            <article className="flex flex-col">
              <label className="">Description</label>
              <textarea defaultValue={item.description} type="text"></textarea>
            </article>
            {item.colors.map((color) => {
              return (
                <ColorInputs
                  key={color.id}
                  variant={color}
                  submitting={submitting}
                  variantUpdate={variantUpdate}
                />
              );
            })}
          </section>
          <section className="absolute bottom-0 right-10 w-fit justify-end mb-7">
            <button
              className="flex bg-blue-500 text-white w-fit pl-5 pr-5 rounded-lg hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                setSubmitting(true);
                // setToggle(false);
              }}
            >
              Close
            </button>
          </section>
        </form>
      </section>
    );
  }

  return <></>;
}
