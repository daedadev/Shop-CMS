import React, { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";

export default function StatsPage() {
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        });
    }
    getUsers();
  }, []);

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
