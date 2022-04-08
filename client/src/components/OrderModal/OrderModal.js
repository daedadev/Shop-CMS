import React, { useEffect, useState } from "react";

export default function OrderModal({ setToggle, id }) {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      await fetch(`/api/order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          setOrder(items[0]);
          console.log(items);
          setLoading(false);
        });
    }
    getUsers();
  }, [id]);

  if (loading) {
    return (
      <section className="flex absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-full xl:w-1280 md:w-11/12 w-full rounded-xl items-center justify-center z-20 ">
        <section className="flex flex-col absolute items-center justify-center bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-lg shadow-md">
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
          <h1 className=" text-slate-800 mr-2 md:mr-0 opacity-75">
            Loading...
          </h1>
        </section>
      </section>
    );
  }

  return (
    <section className="flex absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-full xl:w-1280 md:w-11/12 w-full rounded-xl items-center justify-center z-20 ">
      <section className="flex absolute items-center justify-center bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-lg shadow-md">
        <form className="flex flex-col w-full h-full justify-between pl-10 pr-10 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          <div className="flex w-full justify-center p-5 font-bold">
            <h1 className="text-2xl text-center">Order Information</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold">Order Number</h1>
            <h1 className="text-center">#{order.order_number}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Item(s) Ordered</h1>
            <h1 className="text-center">{order.name}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Price</h1>
            <h1 className="text-center">${order.price}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Size(s)</h1>
            <h1 className="text-center">{order.size}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Address</h1>
            <h1 className="text-center">{order.address}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Shipping Type</h1>
            <h1 className="text-center">{order.shipping.name}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Customer Name</h1>
            <h1 className="text-center">{order.user.name}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Customer Email</h1>
            <h1 className="text-center">{order.user.email}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Order Status</h1>
            {order.order_status ? <h1>Fufilled</h1> : <h1>Unfulfilled</h1>}
          </div>
          <div className="flex flex-row justify-end w-full p-5">
            <button
              className="flex justify-center font-semibold bg-white border border-gray-400 text-black md:w-24 w-fit pl-5 pr-5 md:mr-5 rounded-lg hover:bg-gray-200"
              onClick={(e) => {
                setToggle(false);
                e.preventDefault();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
