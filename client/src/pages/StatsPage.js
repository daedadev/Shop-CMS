import React, { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  getTotalInventoryAmount,
  settingIncomeByDate,
} from "../utils/helpers/productStats.helpers";
import { getShippingCosts } from "../utils/helpers/shippingStats.helpers";
import { getIncomePerCategory } from "../utils/helpers/categoryStats.helpers";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";

Chart.register(...registerables);

export default function StatsPage() {
  const [loading, setLoading] = useState(true);

  const [userAmount, setUserAmount] = useState([]);
  const [uniqueInventoryAmount, setUniqueInventoryAmount] = useState(0);
  const [totalInventoryAmount, setTotalInventoryAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const [totalCost, setTotalCost] = useState(0);

  const [costForItems, setCostForItems] = useState(0);

  const [currentRevenue, setCostPerItem] = useState(0);

  const [incomePricesByDate, setIncomePricesByDate] = useState([]);
  const [incomeDates, setIncomeDates] = useState([]);

  const [incomePerCategory, setIncomePerCategory] = useState([]);
  const [categoryNames, setcategoryNames] = useState([]);

  const [costPerCategory, setCostPerCategory] = useState();

  const [shippingIncome, setShippingIncome] = useState();
  const [costOfShipping, setCostOfShipping] = useState();

  const [data, setData] = useState();

  function getTotalSoldCost(orders) {}

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
    getIncomePerCategory(orderList, setcategoryNames, setIncomePerCategory);
    settingIncomeByDate(moneyByDate, setIncomeDates, setIncomePricesByDate);
    getShippingCosts(shippingList, setShippingIncome, setCostOfShipping);
  }

  async function parseInventory(items) {
    setUniqueInventoryAmount(items.length);
    getTotalInventoryAmount(items, setTotalInventoryAmount);
  }

  // fixed expenses
  // Income
  // Net Worth
  // Spendings

  useEffect(() => {
    async function getUsers() {
      await fetch("http://localhost:3001/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          console.log(items);
          parseUsers(items);
          getTotalSoldCost(items);
        });
    }
    async function getInventory() {
      await fetch("http://localhost:3001/api/clothing", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          console.log(items);
          parseInventory(items);
        });
      setLoading(false);
    }
    getUsers();
    getInventory();
  }, []);

  if (loading) {
    return <LoadingDefault title={"Statistics"} />;
  }

  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 pl-8">
          Statistics
        </h1>
        <div className="flex flex-col w-[98%] h-[95%] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          <div className="w-full">
            <Bar
              data={{
                labels: incomeDates,
                datasets: [
                  {
                    label: "Daily Income",
                    data: incomePricesByDate,
                    backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="w-full">
            <Doughnut
              data={{
                labels: categoryNames,
                datasets: [
                  {
                    data: incomePerCategory,
                    backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="w-full">
            <Bar
              data={{
                labels: ["Shipping Income", "Shipping Costs"],
                datasets: [
                  {
                    label: "Total Shipping Numbers",
                    data: [shippingIncome, costOfShipping],
                    backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="flex justify-start w-full h-16">
            <h3>Total Income: {totalIncome}</h3>
            <h3>Total Users: {userAmount}</h3>
          </div>

          {loading && <LoadingIcon />}
        </div>
      </section>
    </>
  );
}
