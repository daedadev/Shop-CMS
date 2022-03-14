import React, { useEffect, useState } from "react";
import InventoryItem from "../components/InventoryItem";
import InventoryLoading from "../components/loadingComponents/InventoryLoading";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl overflow-auto">
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
    <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl">
      <div className="w-[95%] h-[95%]">
        <div>
          <h1 className="text-5xl text-slate-800">Inventory</h1>
        </div>
        <section className="w-full mt-10">
          {inventory.map((item) => {
            return <InventoryItem item={item} />;
          })}
        </section>
      </div>
    </section>
  );
}
