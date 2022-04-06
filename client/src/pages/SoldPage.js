import React, { useEffect, useState } from "react";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";
import OrderItem from "../components/OrderItem/OrderItem";
import OrderModal from "../components/OrderModal/OrderModal";

export default function SoldPage() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [fulfilledLoading, setFulfilledLoading] = useState(false);

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
    return <LoadingDefault title={"Items Sold"} />;
  }

  return (
    <>
      {modal && <OrderModal setToggle={setModal} id={modalItem} />}
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 pl-8">
          Items Sold
        </h1>
        <div className="flex flex-col w-[98%] h-[95%] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          <section className="flex flex-col w-full mb-5 bg-slate-100 p-5 rounded-lg shadow-md">
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
              {!loading &&
                orders.map((item) => {
                  return (
                    <OrderItem
                      key={item.order_number}
                      item={item}
                      openModal={openModal}
                      setLoading={setFulfilledLoading}
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
