import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";
import { fetchHelper } from "../utils/helpers/fetchFunction.helpers";
import { getCompletedOrderCount } from "../utils/helpers/ordersMain.helpers";
import { getTotalInventoryAmount } from "../utils/helpers/productStats.helpers";

export default function MainPage() {
  const [completedCount, setCompletedCount] = useState({});
  const [totalInventoryAmount, setTotalInventoryAmount] = useState([]);
  const [totalUserAmount, setTotalUserAmount] = useState([]);

  const [loading, setLoading] = useState(true);

  async function getInventory() {
    const orderItems = await fetchHelper("order", "GET");
    const inventoryItems = await fetchHelper("clothing", "GET");
    const userItems = await fetchHelper("clothing", "GET");

    setTotalUserAmount(userItems.length);
    getCompletedOrderCount(orderItems, setCompletedCount);
    getTotalInventoryAmount(inventoryItems, setTotalInventoryAmount);
    setLoading(false);
  }

  useEffect(() => {
    getInventory();
  }, []);

  if (loading) {
    return <LoadingDefault title={"Welcome"} />;
  }

  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg ">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 md:pl-8 pl-4">
          Welcome
        </h1>
        <div className="flex flex-row  md:w-[98%] w-full h-[95%] mb-5 justify-center overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          <div className="flex w-fit h-fit flex-wrap">
            <section className="flex flex-col lg:w-[330px] w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md m-3">
              <article>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total Item Amount
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {totalInventoryAmount}
                </h1>
              </article>
              <Link to={{ pathname: "/inventory" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Items
                </h1>
              </Link>
            </section>
            <section className="flex flex-col lg:w-[330px] w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md m-3">
              <article>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total Orders
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {completedCount.completed + completedCount.incompleted}
                </h1>
              </article>
              <article className="flex flex-row">
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Completed:
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center ml-2">
                  {completedCount.completed}
                </h1>
              </article>
              <article className="flex flex-row">
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Incomplete:
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center ml-2">
                  {completedCount.incompleted}
                </h1>
              </article>
              <Link to={{ pathname: "/sold" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Orders
                </h1>
              </Link>
            </section>
            <section className="flex flex-col lg:w-[330px] w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md m-3">
              <article>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total User Amount
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {totalUserAmount}
                </h1>
              </article>
              <Link to={{ pathname: "/user" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Users
                </h1>
              </Link>
            </section>
            <section className="flex flex-col lg:w-[680px] w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md m-3">
              <article>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total User Amount
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {totalUserAmount}
                </h1>
              </article>
              <Link to={{ pathname: "/user" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Users
                </h1>
              </Link>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
