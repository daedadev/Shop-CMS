import React, { useState, useRef, useEffect } from "react";
import AddVariant from "../VariantComponents/AddVariant";
import ConfirmDeleteModal from "../popupModals/ConfirmModal";

export default function CreateModal({ setToggle, toggle, item }) {
  const [titleVar, setTitleVar] = useState([]);

  const [addedVariants, setAddedVariants] = useState([]);
  const [variantToDelete, setVariantToDelete] = useState([]);

  const [confirmModal, setConfirmModal] = useState(false);

  const [loadingState, setLoadingState] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();

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

  function addVariantUpdate(variant, index) {
    let newArray = addedVariants;
    newArray[index] = variant;
    setAddedVariants(newArray);
  }

  function storeVariantToDelete(variant, index, type) {
    setConfirmModal(true);
    const toDelete = [variant, index, type];
    setVariantToDelete(toDelete);
    console.log(toDelete);
  }

  function deleteStoredVariant() {
    const variant = variantToDelete;
    setAddedVariants((arr) =>
      arr.filter((items) => arr.indexOf(items) !== variant[1])
    );
    setConfirmModal(false);
  }

  function onModalCancel() {
    setConfirmModal(false);
    setVariantToDelete("");
  }

  function createPayload() {
    setLoadingState(true);
    const payload = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      color: addedVariants,
    };

    fetch("http://localhost:3001/api/clothing/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: descRef.current.value,
        color: addedVariants,
      }),
    })
      .then((res) => {
        if (res) {
          setLoadingState(false);
          setToggle(false);
          window.location.reload();
        }
        console.log(payload);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(loadingState);
  }

  useEffect(() => {
    if (item) {
      setTitleVar(item.name);
    }
  }, [toggle]);

  if (!toggle) {
    return <></>;
  }

  return (
    <section className="flex absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-[95%] xl:w-1280 md:w-11/12 w-full rounded-xl items-center justify-center z-20">
      <section className="flex absolute items-center justify-center bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-lg shadow-md">
        <ConfirmDeleteModal
          modalToggle={confirmModal}
          onDelete={deleteStoredVariant}
          onCancel={onModalCancel}
          title={"Delete Variant"}
          message={"Are You Sure You Would Like To Delete This Variant?"}
        />

        <form className="flex flex-col w-full h-full justify-between pl-10 pr-10 overflow-y-auto">
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
                className="flex justify-center font-semibold bg-white border border-gray-400 text-black md:w-24 w-fit pl-5 pr-5 md:mr-5 rounded-lg hover:bg-gray-200"
                onClick={(e) => {
                  setToggle(false);
                  e.preventDefault();
                }}
              >
                Close
              </button>
              <button
                className="flex bg-blue-500 text-white w-fit pl-5 pr-5 rounded-lg hover:bg-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  createPayload();
                }}
              >
                Submit
              </button>
            </div>
          </section>
        </form>
      </section>
    </section>
  );
}
