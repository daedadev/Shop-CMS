import React, { useState, useRef, useEffect } from "react";
import CurrentVariant from "../VariantComponents/CurrentVariant";
import AddVariant from "../VariantComponents/AddVariant";
import ConfirmDeleteModal from "../popupModals/ConfirmModal";

export default function EditModal({ setToggle, toggle, item, categories }) {
  const [titleVar, setTitleVar] = useState([]);

  const [variants, setVariants] = useState([]);
  const [addedVariants, setAddedVariants] = useState([]);
  const [deletedVariants, setDeletedVariants] = useState([]);
  const [variantToDelete, setVariantToDelete] = useState([]);

  const [confirmModal, setConfirmModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();

  function updateTitle() {
    setTitleVar(nameRef.current.value);
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

  function storeVariantToDelete(variant, index, type) {
    setConfirmModal(true);
    const toDelete = [variant, index, type];
    setVariantToDelete(toDelete);
  }

  function deleteStoredVariant() {
    const variant = variantToDelete;

    if (variant[2] === "added") {
      setAddedVariants((arr) =>
        arr.filter((items) => arr.indexOf(items) !== variant[1])
      );
      setConfirmModal(false);
    } else if (variant[2] === "current") {
      item.colors.splice(variant[1], 1);
      setDeletedVariants((prev) => [...prev, variant[0]]);
      setConfirmModal(false);
    }
  }

  function onModalCancel() {
    setConfirmModal(false);
    setVariantToDelete("");
  }

  async function createPayload() {
    try {
      setLoading(true);
      const payload = {
        clothing_id: item.id,
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: descRef.current.value,
        category_id: parseInt(categoryRef.current.value),
        color: variants,
        added_color: addedVariants,
        deleted_color: deletedVariants,
      };
      fetch("/api/clothing/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((res) => {
        if (res) {
          window.location.reload();
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (item) {
      setTitleVar(item.name);
    }
  }, [toggle, item]);

  if (!toggle) {
    return <></>;
  }

  if (loading) {
    return (
      <section className="flex absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-[95%] xl:w-1280 md:w-11/12 w-full rounded-xl items-center justify-center z-20 ">
        <section className="flex absolute items-center justify-center bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-lg shadow-md">
          <form className="flex flex-col md:w-[98%] h-full justify-between pl-10 pr-10 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
            <section className="flex flex-col w-full h-full mb-20">
              <h1 className="w-full text-black text-3xl text-center mt-10 font-semibold">
                {titleVar}
              </h1>
              <div className="flex flex-col w-full h-full items-center justify-center">
                <svg
                  className="animate-spin h-20 w-20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-40"
                    cx={"12"}
                    cy={"12"}
                    r="10"
                    stroke="#454545"
                    stroke-width={"2"}
                  ></circle>
                  <path
                    fill="#FFFFFF"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <h1 className="text-slate-800 mr-2 md:mr-0 font-semibold">
                  Submitting Form
                </h1>
              </div>
            </section>
          </form>
        </section>
      </section>
    );
  }

  return (
    <section className="flex absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-full xl:w-1280 md:w-11/12 w-full rounded-xl items-center justify-center z-20 ">
      <section className="flex absolute justify-center bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-xl shadow-md">
        <ConfirmDeleteModal
          modalToggle={confirmModal}
          onDelete={deleteStoredVariant}
          onCancel={onModalCancel}
          title={"Delete Variant"}
          message={"Are You Sure You Would Like To Delete This Variant?"}
        />

        <form className="flex flex-col md:w-[98%] md:h-[98%] md:mt-2 w-full justify-between pl-10 pr-10 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          <section className="flex flex-col w-full mb-20">
            <h1 className="w-full text-black text-3xl text-center mt-10 font-semibold">
              {titleVar}
            </h1>
            <section className="flex flex-col md:flex-row justify-evenly">
              <article className="flex flex-col w-full mr-2">
                <label>Name</label>
                <input
                  onChange={updateTitle}
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
            <article className="flex flex-col">
              <label className="">Category</label>
              <select
                ref={categoryRef}
                type="text"
                className="border-2 border-slate-300 rounded-lg pl-2"
              >
                <option value={item.category_id} hidden="hidden">
                  {categories[item.category_id - 1].name}
                </option>
                {categories.map((category, index) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </article>
            {item.colors.map((color, index) => {
              return (
                <CurrentVariant
                  key={color.color + color.id}
                  index={index}
                  variant={color}
                  variantUpdate={variantUpdate}
                  removeVariant={storeVariantToDelete}
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
                    removeVariant={storeVariantToDelete}
                  />
                );
              })}
            </div>
          </section>
          <section className="flex justify-between sticky -bottom-1 pb-5 pt-5 w-full mb-7 bg-slate-100 border-t-2 border-slate-300">
            <button
              className="group flex bg-blue-500 text-white w-fit pl-3 pr-3 rounded-lg hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                addVariant();
              }}
            >
              +
              <span className="absolute scale-0 lg:group-hover:scale-100 ml-7 text-blue-800 bg-blue-300 border border-blue-600 rounded-md pl-3 pr-3 transition-all">
                Add Variant
              </span>
            </button>
            <div className="flex flex-row">
              <button
                disabled={loading}
                className="flex justify-center font-semibold bg-white border border-gray-400 text-black md:w-24 w-fit pl-5 pr-5 md:mr-5 rounded-lg hover:bg-gray-200 disabled:bg-gray-200"
                onClick={(e) => {
                  setToggle(false);
                  e.preventDefault();
                }}
              >
                Close
              </button>
              <button
                disabled={loading}
                className="flex items-center justify-center bg-blue-500 text-white w-fit pl-5 pr-5 rounded-lg hover:bg-blue-600 "
                onClick={(e) => {
                  e.preventDefault();
                  createPayload();
                }}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-40"
                      cx={"12"}
                      cy={"12"}
                      r="10"
                      stroke="#FFFFFF"
                      stroke-width={"4"}
                    ></circle>
                    <path
                      fill="#FFFFFF"
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "" : "Save"}
              </button>
            </div>
          </section>
        </form>
      </section>
    </section>
  );
}
