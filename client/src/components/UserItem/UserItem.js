import React, { useEffect, useState } from "react";

export default function UserItem({ user, openModal }) {
  const [orders, setOrders] = useState();

  if (!user) {
    return (
      <article className="flex flex-row w-full justify-evenly">
        <h1 className="flex w-full font-bold justify-center">Name</h1>
        <h1 className="flex w-full font-bold justify-center">Email</h1>
        <h1 className="flex w-full font-bold justify-center">Date</h1>
      </article>
    );
  }

  return (
    <>
      <article className="flex flex-row w-full justify-evenly">
        <h1 className="flex w-full font-bold justify-center">{user.name}</h1>
        <h1 className="flex w-full font-bold justify-center">{user.email}</h1>
        <h1 className="flex w-full font-bold justify-center">
          {user.createdAt}
        </h1>
      </article>

      <article className="flex flex-col w-full justify-evenly">
        <div className="flex flex-row w-full  justify-evenly">
          <h1 className="w-full text-center">Order Number</h1>
          <h1 className="w-full text-center">Price</h1>
          <h1 className="w-full text-center">Shipping Type</h1>
        </div>
        {user.orders.map((order) => {
          return (
            <div
              key={order.id}
              className="flex flex-row w-full  justify-evenly"
            >
              <h1 className="w-full text-center">#{order.order_number}</h1>
              <h1 className="w-full text-center">${order.price}</h1>
              <h1 className="w-full text-center">{order.shipping_type}</h1>
            </div>
          );
        })}
      </article>
    </>
  );
}
