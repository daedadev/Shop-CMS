import React, { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem/OrderItem";
import OrderModal from "../components/OrderModal/OrderModal";

export default function SoldPage() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState();

  function openModal(item) {
    setModal(true);
    setModalItem(item);
  }

  useEffect(() => {
    async function getOrders() {
      await fetch("http://localhost:3001/api/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          setOrders(items);
          console.log(items);
          setLoading(false);
        });
    }
    getOrders();
  }, []);

  if (loading) {
    return (
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3">
            Items Sold
          </h1>
          <section className="flex flex-col w-full mb-5 bg-slate-100 p-5 rounded-lg shadow-md mt-10">
            <div className="mb-5">
              <article className="flex flex-row w-full justify-evenly">
                <h1 className="flex w-full font-bold justify-center">
                  Item Ordered
                </h1>
                <h1 className="flex w-full font-bold justify-center">Price</h1>
                <h1 className="flex w-full font-bold justify-center">
                  Shipping Type
                </h1>
                <h1 className="flex w-full font-bold justify-center">Date</h1>
                <h1 className="flex w-full font-bold justify-center">
                  Order Number
                </h1>
                <div className="w-full font-bold"></div>
              </article>
            </div>
          </section>
        </div>
      </section>
    );
  }

  return (
    <>
      {modal && <OrderModal setToggle={setModal} item={modalItem} />}

      <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3">
            Items Sold
          </h1>
          <section className="flex flex-col w-full mb-5 bg-slate-100 p-5 rounded-lg shadow-md mt-10">
            <div className="mb-5">
              <article className="flex flex-row w-full justify-evenly">
                <h1 className="flex w-full font-bold justify-center text-center">
                  Item Ordered
                </h1>
                <h1 className="flex w-full font-bold justify-center text-center">
                  Price
                </h1>
                <h1 className="hidden md:flex w-full font-bold justify-center text-center">
                  Shipping Type
                </h1>
                <h1 className="flex w-full font-bold justify-center text-center">
                  Date
                </h1>
                <h1 className="flex w-full font-bold justify-center text-center">
                  Order Number
                </h1>
                <h1 className="hidden md:flex w-full font-bold justify-center text-center">
                  Fufilled
                </h1>
                <div className="w-full font-bold"></div>
              </article>
              {orders.map((item) => {
                return (
                  <OrderItem
                    key={item.order_number}
                    item={item}
                    openModal={openModal}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
