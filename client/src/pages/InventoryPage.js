import React, { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal/CreateModal";
import EditModal from "../components/EditModal/EditModal";
import InventoryItem from "../components/InventoryItem/InventoryItem";
import InventoryLoading from "../components/loadingComponents/InventoryLoading";
import ConfirmDeleteModal from "../components/popupModals/ConfirmModal";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState();
  const [modalToggle, setModalToggle] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [idToDelete, setIdToDelete] = useState();

  const blankItem = {
    id: "",
    name: "",
    price: 0,
    description: "",
    colors: [
      {
        color: "",
        clothing_stock: {
          id: "",
          item_id: "",
          xs: 0,
          s: 0,
          m: 0,
          l: 0,
          xl: 0,
        },
      },
    ],
  };

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

  function deleteItem() {
    setLoading(true);
    exitConfirmModal();
    fetch(`http://localhost:3001/api/clothing/delete/${idToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setLoading(false);
        window.location.reload();
        console.log("Successfully Deleted Item");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function exitConfirmModal() {
    setConfirmModal(false);
  }

  useEffect(() => {
    getInventory();
  }, []);

  if (loading) {
    return (
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg overflow-auto">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3">
            Inventory
          </h1>
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
            ? "absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-[95%] xl:w-1280 md:w-11/12 w-full md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg"
            : "hidden"
        }
      >
        <ConfirmDeleteModal
          modalToggle={confirmModal}
          onDelete={deleteItem}
          onCancel={exitConfirmModal}
          idToDelete={idToDelete}
          message={"Are You Sure You Want To Delete This Item?"}
          title={"Delete Item"}
        />
      </div>
      <EditModal
        toggle={modalToggle}
        item={modalItem}
        setToggle={setModalToggle}
      />
      <CreateModal
        toggle={createModal}
        item={blankItem}
        setToggle={setCreateModal}
      />
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg overflow-y-auto">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3">
            Inventory
          </h1>
          <section className="w-full h-full mt-10 justify-between mb-96">
            <div className="flex flex-col w-full md:pb-0 pb-44">
              {inventory.map((item) => {
                return (
                  <InventoryItem
                    key={item.name + item.id}
                    item={item}
                    setModal={modalHandler}
                    deleteModal={setConfirmModal}
                    deleteMe={setIdToDelete}
                  />
                );
              })}
            </div>
          </section>
          <div className="flex md:sticky absolute bottom-0 w-full md:h-fit justify-end bg-slate-200 border-t-2 border-slate-400 pb-5">
            <button
              onClick={() => setCreateModal(true)}
              className="bg-blue-500 text-white rounded-lg pl-5 pr-5 md:mb-0 md:mr-0 mt-5 mr-3 hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
