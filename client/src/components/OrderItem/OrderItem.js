import React from "react";

export default function OrderItem({ item }) {
  return (
    <article
      key={item.order_number}
      className="flex flex-row w-full justify-evenly mt-5"
    >
      <h1 className="flex justify-center w-full overflow-hidden overflow-ellipsis">
        {item.name}
      </h1>
      <h1 className="flex justify-center w-full">${item.price}</h1>
      <h1 className="flex justify-center w-full">{item.shipping_type}</h1>
      <h1 className="flex justify-center w-full">{item.createdAt}</h1>
      <h1 className="flex justify-center w-full overflow-hidden overflow-ellipsis">
        {item.order_number}
      </h1>
      <div className="flex w-full justify-center">
        <button className="bg-blue-500 text-white rounded-lg pl-5 pr-5 md:mb-0 md:mr-0 hover:bg-blue-600">
          Details
        </button>
      </div>
    </article>
  );
}
