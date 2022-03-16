import React, { useState, useRef } from "react";
import ColorInputs from "../VariantComponents/ColorInputs";
import AddVariant from "../VariantComponents/AddVariant";

export default function EditModal({ setToggle, toggle, item }) {
  const [variants, setVariants] = useState([]);
  const [addedVariants, setAddedVariants] = useState([]);
  // const [deletedVariants, setDeletedVariants] = useState([]);

  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

  // Takes updated variants and adds them to variants one by one
  async function variantUpdate(col, colIndex) {
    let newArray = variants;
    newArray[colIndex] = col;
    setVariants(newArray);
    console.log(variants);
  }

  function addVariant() {
    try {
      const newVariant = {
        color: "",
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        clothing_id: item.id,
      };
      setAddedVariants((prev) => [...prev, newVariant]);
      console.log(addedVariants);
    } catch (err) {
      console.error(err);
    }
  }

  function addVariantUpdate(col, colIndex) {
    let newArray = addedVariants;
    newArray[colIndex] = col;
    setAddedVariants(newArray);
    console.log(addedVariants);
  }

  function createPayload() {
    const payload = {
      clothing_id: item.id,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      color: variants,
      added_color: addedVariants,
      deleted_color: [],
    };
    console.log(payload);
  }

  if (!toggle) {
    return <></>;
  }

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
                ref={nameRef}
                className="w-full"
                defaultValue={item.name}
                type="text"
              ></input>
            </article>
            <article className="flex flex-col">
              <label className="">Price</label>
              <input
                ref={priceRef}
                defaultValue={item.price}
                type="text"
              ></input>
            </article>
          </section>
          <article className="flex flex-col">
            <label className="">Description</label>
            <textarea
              ref={descRef}
              defaultValue={item.description}
              type="text"
            ></textarea>
          </article>
          {item.colors.map((color, index) => {
            return (
              <ColorInputs
                key={color.color + color.id}
                index={index}
                variant={color}
                variantUpdate={variantUpdate}
              />
            );
          })}

          <div>
            {addedVariants.map((color, index) => {
              return (
                <AddVariant
                  key={"newVariant" + index}
                  index={index}
                  variant={color}
                  variantUpdate={addVariantUpdate}
                />
              );
            })}
            <button
              className="flex bg-blue-500 text-white w-fit pl-5 pr-5 rounded-lg hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                addVariant();
              }}
            >
              New Variant
            </button>
          </div>
        </section>
        <section className="absolute bottom-0 right-10 w-fit justify-end mb-7">
          <button
            className="flex bg-blue-500 text-white w-fit pl-5 pr-5 rounded-lg hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              createPayload();
            }}
          >
            Close
          </button>
        </section>
      </form>
    </section>
  );
}
