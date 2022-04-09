import React, { useEffect, useState } from "react";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  getTotalInventoryAmount,
  getTotalInventoryCost,
  settingIncomeByDate,
} from "../utils/helpers/productStats.helpers";
import { getShippingCosts } from "../utils/helpers/shippingStats.helpers";
import {
  getIncomePerCategory,
  getStockByCategory,
} from "../utils/helpers/categoryStats.helpers";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";

Chart.register(...registerables);

export default function StatsPage() {
  const [loading, setLoading] = useState(true);

  const [userAmount, setUserAmount] = useState([]);
  const [uniqueInventoryAmount, setUniqueInventoryAmount] = useState(0);
  const [totalInventoryAmount, setTotalInventoryAmount] = useState(0);
  const [stockPerCategory, setStockPerCategory] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const [totalInventoryCost, setTotalInventoryCost] = useState(0);

  const [incomePricesByDate, setIncomePricesByDate] = useState([]);
  const [incomeDates, setIncomeDates] = useState([]);

  const [incomePerCategory, setIncomePerCategory] = useState([]);
  const [incomeCategoryNames, setIncomeCategoryNames] = useState([]);
  const [stockCategoryNames, setStockCategoryNames] = useState([]);
  const [categoryColors, setCategoryColors] = useState([]);

  const [shippingIncome, setShippingIncome] = useState();
  const [costOfShipping, setCostOfShipping] = useState();

  async function parseUsers(users) {
    setUserAmount(users.length);
    let money = 0;
    let moneyByDate = [];
    let shippingList = [];
    let orderList = [];
    users.forEach((user) => {
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
    setTotalIncome(money);
    getIncomePerCategory(
      orderList,
      setIncomeCategoryNames,
      setIncomePerCategory,
      setCategoryColors
    );
    settingIncomeByDate(moneyByDate, setIncomeDates, setIncomePricesByDate);
    getShippingCosts(shippingList, setShippingIncome, setCostOfShipping);
  }

  // fixed expenses
  // Income
  // Net Worth
  // Spendings

  useEffect(() => {
    async function getUsers() {
      await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          parseUsers(items);
        });
    }
    async function getInventory() {
      await fetch("/api/clothing", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          setUniqueInventoryAmount(items.length);
          getTotalInventoryAmount(items, setTotalInventoryAmount);
          getTotalInventoryCost(items, setTotalInventoryCost);
        });
    }

    async function getCategories() {
      await fetch("/api/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          console.log(items);
          getStockByCategory(items, setStockPerCategory, setStockCategoryNames);
        });
      setLoading(false);
    }
    getUsers();
    getInventory();
    getCategories();
  }, []);

  if (loading) {
    return <LoadingDefault title={"Statistics"} />;
  }

  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg ">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 md:pl-8 pl-4">
          Statistics
        </h1>
        <div className="flex flex-col md:w-[98%] w-full h-[95%] items-center mb-5 bg-slate-100 p-5 rounded-lg shadow-md overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300 md:pb-0 pb-[72px]">
          <div className="flex flex-col md:mt-5 w-full items-center justify-center">
            <Bar
              data={{
                labels: incomeDates,
                datasets: [
                  {
                    label: "Daily Income",
                    data: incomePricesByDate,
                    backgroundColor: ["rgb(0, 214, 11, .6)"],
                    borderColor: ["rgb(0, 214, 11)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="flex flex-col mt-5 md:w-[85%] w-full items-center justify-center">
            <h1>Total Cost and Income</h1>
            <Doughnut
              data={{
                labels: [
                  "Shipping Income",
                  "Shipping Costs",
                  "Item Income",
                  "Item Costs",
                ],
                datasets: [
                  {
                    label: "Total Shipping Numbers",
                    data: [
                      shippingIncome,
                      costOfShipping,
                      totalIncome,
                      totalInventoryCost,
                    ],
                    backgroundColor: [
                      "rgb(5, 124, 235, .7)",
                      "rgb(231, 146, 18, .7)",
                      "rgb(0, 214, 11, .6)",
                      "rgb(206, 0, 0, .7)",
                    ],
                    borderColor: [
                      "rgb(5, 124, 235, 1)",
                      "rgb(231, 146, 18, 1)",
                      "rgb(0, 214, 11)",
                      "rgb(206, 0, 0)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="flex flex-col mt-5 md:w-[85%] w-full items-center justify-center">
            <h1>Income By Category</h1>
            <PolarArea
              data={{
                labels: incomeCategoryNames,
                datasets: [
                  {
                    label: "Income By Category",
                    data: incomePerCategory,
                    backgroundColor: categoryColors,
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>

          <div className="flex flex-col mt-5 w-full items-center justify-center mb-10">
            <Bar
              data={{
                labels: ["Total Stock", "Unique Stock", ...stockCategoryNames],
                datasets: [
                  {
                    label: "Stock Numbers",
                    data: [
                      totalInventoryAmount,
                      uniqueInventoryAmount,
                      ...stockPerCategory,
                    ],
                    backgroundColor: ["rgb(236, 233, 33, .7)"],
                    borderColor: ["rgb(236, 233, 33)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
