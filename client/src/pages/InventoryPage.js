import React, { useEffect, useState } from "react";
import EditModal from "../components/EditModal/EditModal";
import InventoryItem from "../components/InventoryItem/InventoryItem";
import InventoryLoading from "../components/loadingComponents/InventoryLoading";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState();
  const [modalToggle, setModalToggle] = useState(false);

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
    <section className="flex  w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl rounded-lg overflow-auto">
      <div className="flex flex-col w-[95%] h-[95%] items-center">
        <h1 className="flex text-5xl text-slate-800 text-left w-full">
          Inventory
        </h1>
        <EditModal
          toggle={modalToggle}
          item={modalItem}
          setToggle={setModalToggle}
        />
        <section className="w-full mt-10">
          {inventory.map((item) => {
            return (
              <InventoryItem
                key={item.name + item.id}
                item={item}
                setModal={modalHandler}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
}
