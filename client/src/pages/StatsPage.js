import React, { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function StatsPage() {
  const [loading, setLoading] = useState(true);

  const [userAmount, setUserAmount] = useState([]);
  const [income, setIncome] = useState(0);
  const [incomeDates, setIncomeDates] = useState([]);
  const [incomePrices, setIncomePrices] = useState([]);

  const [costOfSold, setCostOfSold] = useState(0);
  const [categorySales, setCategorySales] = useState(0);

  const [data, setData] = useState();

  async function settingIncomeByDate(income) {
    let newArray = income;
    for (var n = 0; n < income.length; n++) {
      for (var i = 0; i < income.length; i++) {
        if (income[n].date === income[i].date && n !== i) {
          const newPrice = income[n].price + income[i].price;
          newArray.splice(i, 1);
          newArray[n] = { price: newPrice, date: income[n].date };
        }
      }
    }
    const incomeDateArray = newArray.map((item) => {
      return item.date;
    });
    const incomePriceArray = newArray.map((item) => {
      return item.price;
    });

    setIncomeDates(incomeDateArray);
    setIncomePrices(incomePriceArray);
  }

  function getTotalSoldCost(orders) {}

  async function parseUsers(users) {
    setUserAmount(users.length);
    let money = 0;
    let moneyByDate = [];
    users.forEach((user) => {
      for (var i = 0; i < user.orders.length; i++) {
        money += user.orders[i].price;
        moneyByDate.push({
          price: user.orders[i].price,
          date: user.orders[i].updatedAt,
        });
      }
    });
    setIncome(money);
    settingIncomeByDate(moneyByDate);
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
      setLoading(false);
    }
    getUsers();
  }, []);

  if (loading) {
    return (
      <>
        <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl">
          <div className="flex flex-col w-[95%] h-[95%] items-center">
            <div className="flex justify-start w-full h-16">
              <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3 pt-5">
                Statistics
              </h1>
            </div>
            {loading && <LoadingIcon />}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 pl-8">
          Statistics
        </h1>
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <div className="w-full">
            <Bar
              data={{
                labels: incomeDates,
                datasets: [
                  {
                    label: "Daily Income",
                    data: incomePrices,
                    backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="flex justify-start w-full h-16">
            <h3>Total Income: {income}</h3>
            <h3>Total Users: {userAmount}</h3>
          </div>

          {loading && <LoadingIcon />}
        </div>
      </section>
    </>
  );
}
