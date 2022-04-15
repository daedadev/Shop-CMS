import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";
import { fetchHelper } from "../utils/helpers/fetchFunction.helpers";
import { getCompletedOrderCount } from "../utils/helpers/ordersMain.helpers";
import {
  getTotalInventoryAmount,
  getTotalInventoryCost,
  settingIncomeByDate,
} from "../utils/helpers/productStats.helpers";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getStockByCategory } from "../utils/helpers/categoryStats.helpers";

export default function MainPage() {
  const [completedCount, setCompletedCount] = useState({});
  const [totalInventoryAmount, setTotalInventoryAmount] = useState([]);
  const [totalUserAmount, setTotalUserAmount] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);

  const [totalInventoryCost, setTotalInventoryCost] = useState(0);
  const [uniqueInventoryAmount, setUniqueInventoryAmount] = useState(0);

  const [stockPerCategory, setStockPerCategory] = useState(0);
  const [stockCategoryNames, setStockCategoryNames] = useState([]);

  const [loading, setLoading] = useState(true);

  async function getInventory() {
    const orderItems = await fetchHelper("order", "GET");
    const inventoryItems = await fetchHelper("clothing", "GET");
    const userItems = await fetchHelper("user", "GET");
    const categoryItems = await fetchHelper("category", "GET");

    let money = 0;
    let moneyByDate = [];
    let shippingList = [];
    let orderList = [];

    userItems.forEach((user) => {
      if (user.orders.length !== 0) {
        for (var i = 0; i < user.orders.length; i++) {
          money += user.orders[i].price;
          orderList.push(user.orders[i]);
          shippingList.push(user.orders[i].shipping);
          moneyByDate.push({
            price: user.orders[i].price,
            date: user.orders[i].updatedAt,
          });
        }
      }
    });
    getStockByCategory(
      categoryItems,
      setStockPerCategory,
      setStockCategoryNames
    );
    getTotalInventoryCost(inventoryItems, setTotalInventoryCost);
    setTotalIncome(parseFloat(money.toFixed(2)));
    setTotalUserAmount(userItems.length);
    getCompletedOrderCount(orderItems, setCompletedCount);
    getTotalInventoryAmount(inventoryItems, setTotalInventoryAmount);
    setUniqueInventoryAmount(inventoryItems.length);

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
        <div className="flex flex-col  md:w-[98%] w-full h-[95%] mb-5 items-center overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          <section className="flex md:flex-row flex-col md:w-full w-[94%] justify-center md:items-stretch items-center">
            <article className="flex flex-col w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Unique Items
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {uniqueInventoryAmount}
                </h1>
              </div>
              <Link to={{ pathname: "/inventory" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Inventory
                </h1>
              </Link>
            </article>
            <article className="flex flex-col w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total Orders
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {completedCount.completed + completedCount.incompleted}
                </h1>
              </div>
              <div className="flex flex-row">
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Completed:
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center ml-2">
                  {completedCount.completed}
                </h1>
              </div>
              <div className="flex flex-row">
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Incomplete:
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center ml-2">
                  {completedCount.incompleted}
                </h1>
              </div>
              <Link to={{ pathname: "/sold" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Orders
                </h1>
              </Link>
            </article>
            <article className="flex flex-col w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total User Amount
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {totalUserAmount}
                </h1>
              </div>
              <Link to={{ pathname: "/user" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Users
                </h1>
              </Link>
            </article>
          </section>
          <section className="flex md:flex-row flex-col md:w-full w-[94%] md:justify-between items-center">
            <article className="flex flex-col xl:w-[660px] md:w-2/3 w-full h-fit bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6 z-30">
              <Bar
                data={{
                  labels: ["Expenses"],
                  datasets: [
                    {
                      label: "Total Income",
                      data: [totalIncome],
                      backgroundColor: ["rgb(0, 214, 11, .6)"],
                      borderColor: ["rgb(0, 214, 11)"],
                      borderWidth: 1,
                    },
                    {
                      label: "Total Cost",
                      data: [totalInventoryCost],
                      backgroundColor: ["rgb(206, 0, 0, .7)"],
                      borderColor: ["rgb(206, 0, 0)"],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </article>
            <article className="flex flex-col xl:w-[360px] md:w-1/3 w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total Revenue
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {parseFloat(totalIncome - totalInventoryCost).toFixed(2) +
                    "$"}
                </h1>
              </div>
              <Link to={{ pathname: "/stats" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Statistics
                </h1>
              </Link>
            </article>
          </section>
          <section className="flex md:flex-row flex-col md:w-full w-[94%] md:justify-between items-center">
            <article className="flex flex-col xl:w-[660px] md:w-2/3 w-full h-fit bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6">
              <Bar
                data={{
                  labels: [...stockCategoryNames],
                  datasets: [
                    {
                      label: "Stock Numbers",
                      data: [...stockPerCategory],
                      backgroundColor: ["rgb(236, 233, 33, .7)"],
                      borderColor: ["rgb(236, 233, 33)"],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </article>
            <article className="flex flex-col xl:w-[360px] md:w-1/3 w-full h-[180px] bg-slate-100 p-3 items-center justify-center rounded-xl shadow-md md:m-3 md:mb-0 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 text-center">
                  Total Inventory Amount
                </h1>
                <h1 className="text-2xl font-bold text-slate-800 text-center">
                  {totalInventoryAmount}
                </h1>
              </div>
              <Link to={{ pathname: "/stats" }}>
                <h1 className="font-semibold underline text-blue-500 text-center">
                  View Statistics
                </h1>
              </Link>
            </article>
          </section>
        </div>
      </section>
    </>
  );
}
