import React, { useEffect, useState } from "react";
import EditModal from "../components/EditModal/EditModal";
import InventoryItem from "../components/InventoryItem/InventoryItem";
import InventoryLoading from "../components/loadingComponents/InventoryLoading";
import ConfirmDeleteModal from "../components/popupModals/ConfirmDeleteModal";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState();
  const [modalToggle, setModalToggle] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  function modalHandler(item) {
    setModalToggle(true);
    setModalItem(item);
  }

  async function getInventory() {
    setLoading(true);
    await fetch("http://localhost:3001/api/clothing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((items) => items.json())
      .then((items) => {
        setInventory(items);
        console.log(items);
        setLoading(false);
      });
  }

  function addItem() {}

  function deleteItem() {}

  function exitConfirmModal() {
    setConfirmModal(false);
  }

  useEffect(() => {
    getInventory();
  }, []);

  if (loading) {
    return (
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl rounded-lg overflow-auto">
        <div className="w-[95%] h-[95%]">
          <div>
            <h1 className="text-5xl text-slate-800">Inventory</h1>
          </div>
          <section className="w-full mt-10">
            <InventoryLoading />
          </section>
        </div>
      </section>
    );
  }
  return (
    <>
      <div
        className={
          confirmModal
            ? "absolute bg-slate-500 bg-opacity-30 h-5/6 xl:w-1280 w-11/12 rounded-xl"
            : "hidden"
        }
      >
        <ConfirmDeleteModal
          modalToggle={confirmModal}
          onDelete={deleteItem}
          onCancel={exitConfirmModal}
          message={"Are You Sure You Want To Delete This Item?"}
          title={"Delete Item"}
        />
      </div>
      <EditModal
        toggle={modalToggle}
        item={modalItem}
        setToggle={setModalToggle}
      />
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl rounded-lg overflow-auto">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <h1 className="flex text-5xl text-slate-800 text-left w-full">
            Inventory
          </h1>

          <section className="w-full h-full mt-10 justify-between">
            {inventory.map((item) => {
              return (
                <InventoryItem
                  key={item.name + item.id}
                  item={item}
                  setModal={modalHandler}
                  deleteModal={setConfirmModal}
                />
              );
            })}
          </section>
          <div className="flex sticky bottom-0 w-full justify-end">
            <button className="bg-blue-500 text-white rounded-lg pl-5 pr-5 hover:bg-blue-600">
              Add Item
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
