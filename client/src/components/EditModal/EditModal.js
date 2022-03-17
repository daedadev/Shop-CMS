import React, { useState, useRef } from "react";
import CurrentVariant from "../VariantComponents/CurrentVariant";
import AddVariant from "../VariantComponents/AddVariant";

export default function EditModal({ setToggle, toggle, item }) {
  const [variants, setVariants] = useState([]);
  const [addedVariants, setAddedVariants] = useState([]);
  const [deletedVariants, setDeletedVariants] = useState([]);

  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

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
    } catch (err) {
      console.error(err);
    }
  }

  function variantUpdate(variant, index) {
    setVariants((arr) => arr.splice(index, 1, variant));
  }

  function addVariantUpdate(variant, index) {
    let newArray = addedVariants;
    newArray[index] = variant;
    setAddedVariants(newArray);
  }

  function deletingCurrentVariant(variant, index) {
    item.colors.splice(index, 1);
    setDeletedVariants((prev) => [...prev, variant]);
  }

  function deletingAddedVariant(index) {
    setAddedVariants((arr) =>
      arr.filter((variant) => arr.indexOf(variant) !== index)
    );
  }

  function createPayload() {
    const payload = {
      clothing_id: item.id,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      color: variants,
      added_color: addedVariants,
      deleted_color: deletedVariants,
    };
    console.log(payload);
  }

  if (!toggle) {
    return <></>;
  }

  return (
    <section className="flex absolute bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-lg shadow-md">
      <form className="flex flex-col w-full h-full justify-between pl-10 pr-10 overflow-y-auto">
        <section className="flex flex-col w-full mb-20">
          <h1 className="w-full text-black text-3xl text-center mt-10 font-semibold">
            {item.name}
          </h1>
          <section className="flex flex-col md:flex-row justify-evenly">
            <article className="flex flex-col w-full mr-2">
              <label>Name</label>
              <input
                ref={nameRef}
                className="w-full border-2 border-slate-300 rounded-lg pl-2"
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
                className="border-2 border-slate-300 rounded-lg pl-2"
              ></input>
            </article>
          </section>
          <article className="flex flex-col">
            <label className="">Description</label>
            <textarea
              ref={descRef}
              defaultValue={item.description}
              type="text"
              className="border-2 border-slate-300 rounded-lg pl-2"
            ></textarea>
          </article>
          {item.colors.map((color, index) => {
            return (
              <CurrentVariant
                key={color.color + color.id}
                index={index}
                variant={color}
                variantUpdate={variantUpdate}
                removeVariant={deletingCurrentVariant}
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
                  removeVariant={deletingAddedVariant}
                />
              );
            })}
          </div>
        </section>
        <section className="flex justify-between sticky -bottom-1 pb-3 pt-3 w-full mb-7 bg-slate-100">
          <button
            className="group flex bg-blue-500 text-white w-fit pl-3 pr-3 rounded-lg hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              addVariant();
            }}
          >
            +
            <span className="absolute scale-0 group-hover:scale-100 ml-7 text-blue-800 bg-blue-300 border border-blue-600 rounded-md pl-3 pr-3 transition-all">
              Add Variant
            </span>
          </button>
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
