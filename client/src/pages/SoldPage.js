import React, { useEffect, useState } from "react";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";
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
      await fetch("/api/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          setOrders(items);
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
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 md:pl-8 pl-4">
          Items Sold
        </h1>
        <div className="flex flex-col md:w-[98%] w-full h-[95%] mb-5 bg-slate-100 p-5 rounded-lg shadow-md overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300 md:pb-0 pb-[72px]">
          <div className="flex flex-col items-center justify-center">
            <article className="flex flex-row w-full justify-evenly pl-2">
              <h1 className="md:flex hidden w-full font-bold justify-center text-center">
                Item Ordered
              </h1>
              <h1 className="flex md:hidden w-full font-bold justify-center text-center">
                Item
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
              <h1 className="md:flex hidden w-full font-bold justify-center text-center">
                Order Number
              </h1>
              <h1 className="flex md:hidden w-full font-bold justify-center text-center">
                Number
              </h1>
              <h1 className="hidden md:flex w-full font-bold justify-center text-center">
                Fufilled
              </h1>
              <div className="w-full font-bold"></div>
            </article>
            {!loading &&
              orders.map((item, index) => {
                return (
                  <OrderItem
                    key={item.order_number}
                    item={item}
                    openModal={openModal}
                    index={index}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
