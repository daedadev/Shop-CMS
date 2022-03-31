import React from "react";

export default function UserItem({ user, openModal }) {
  function checkOdd(index) {
    return index & 1;
  }

  return (
    <>
      <article className="flex flex-row w-full justify-evenly bg-slate-300 rounded-md shadow-md mt-3">
        <h1 className="w-full font-bold whitespace-nowrap  overflow-hidden overflow-ellipsis md:text-center text-left ml-2">
          {user.name}
        </h1>
        <h1 className=" w-full font-bold whitespace-nowrap  overflow-hidden overflow-ellipsis text-center">
          {user.email}
        </h1>
        <h1 className=" w-full font-bold whitespace-nowrap  overflow-hidden overflow-ellipsis text-center">
          {user.createdAt}
        </h1>
      </article>

      <article className="flex flex-col w-full justify-evenly ">
        <div className="flex flex-row w-full  justify-evenly bg-slate-200 font-semibold border-b border-gray-400 pb-1">
          <h1 className="w-full text-center">Order Number</h1>
          <h1 className="w-full text-center">Price</h1>
          <h1 className="w-full text-center">Shipping Type</h1>
          <div className="w-full text-center"></div>
        </div>
        {user.orders.map((order, index) => {
          return (
            <div
              key={order.id}
              className={
                checkOdd(index)
                  ? "flex flex-row w-full justify-evenly bg-slate-100 pt-3 pb-3"
                  : "flex flex-row w-full justify-evenly bg-slate-200 pt-3 pb-3"
              }
            >
              <h1 className="w-full text-center">#{order.order_number}</h1>
              <h1 className="w-full text-center">${order.price}</h1>
              <h1 className="w-full text-center">{order.shipping.name}</h1>
              <div className="flex w-full justify-center">
                <button
                  onClick={() => openModal(order.id)}
                  className="bg-slate-400 text-white rounded-lg hover:bg-slate-500"
                >
                  <h1 className="md:flex hidden md:pl-3 md:pr-3 md:mb-0 md:mr-0">
                    Details
                  </h1>
                  <h1 className="flex md:hidden pl-3 pr-3 md:mb-0 md:mr-0">
                    Info
                  </h1>
                </button>
              </div>
            </div>
          );
        })}
      </article>
    </>
  );
}
