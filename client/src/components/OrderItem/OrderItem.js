import React, { useEffect, useState } from "react";

export default function OrderItem({ item, openModal, index }) {
  const [dateSmall, setDateSmall] = useState("");
  const [isEven, setIsEven] = useState(false);

  useEffect(() => {
    async function smallDate() {
      const date = item.updatedAt.split("/");
      const newDate = date[0] + "/" + date[1];
      setDateSmall(newDate);
    }

    if (index % 2 === 0) {
      setIsEven(true);
    }

    smallDate();
  }, []);

  async function orderFufilled(event) {
    console.log(event.target.checked);
    const payload = {
      order_id: item.id,
      order_status: event.target.checked,
    };
    await fetch("http://localhost:3001/api/order/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  return (
    <>
      <article
        className={
          isEven
            ? "flex flex-row w-full justify-evenly pt-3 pb-3 pl-2 h-full "
            : "flex flex-row w-full justify-evenly pt-3 pb-3 pl-2 h-full bg-slate-200"
        }
      >
        <h1 className="h-8 w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-center">
          {item.name}
        </h1>
        <h1 className="flex justify-center w-full">${item.price}</h1>
        <h1 className="hidden md:flex justify-center w-full">
          {item.shipping.name}
        </h1>
        <h1 className="hidden md:flex justify-center w-full">
          {item.updatedAt}
        </h1>
        <h1 className="md:hidden flex justify-center w-full">{dateSmall}</h1>
        <h1 className="flex justify-center w-full overflow-hidden overflow-ellipsis">
          #{item.order_number}
        </h1>
        <input
          className="hidden md:flex justify-center w-full"
          onChange={(e) => orderFufilled(e)}
          type="checkbox"
          defaultChecked={item.order_status}
        ></input>
        <div className="flex w-full justify-center">
          <button
            onClick={() => openModal(item.id)}
            className="bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <h1 className="md:flex hidden md:pl-3 md:pr-3 md:mb-0 md:mr-0">
              Details
            </h1>
            <h1 className="flex md:hidden pl-3 pr-3 md:mb-0 md:mr-0">Info</h1>
          </button>
        </div>
      </article>
    </>
  );
}
