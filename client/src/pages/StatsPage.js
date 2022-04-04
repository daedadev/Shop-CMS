import React, { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";

export default function StatsPage() {
  const [loading, setLoading] = useState(true);

  const [userAmount, setUserAmount] = useState([]);
  const [income, setIncome] = useState(0);
  const [incomeByDate, setIncomeByDate] = useState([]);
  const [costOfSold, setCostOfSold] = useState(0);
  const [categorySales, setCategorySales] = useState(0);

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
    setIncomeByDate(moneyByDate);
    console.log(moneyByDate);
    setIncome(money);
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
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <div className="flex justify-start w-full h-16">
            <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3 pt-5">
              Statistics
            </h1>
            <h3>Total Income: {income}</h3>
            <h3>Total Users: {userAmount}</h3>
          </div>
          {loading && <LoadingIcon />}
        </div>
      </section>
    </>
  );
}
