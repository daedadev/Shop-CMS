import React, { useEffect } from "react";

export default function MainPage() {
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
      });
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <section className="flex  w-full h-full items-center justify-center bg-slate-100 rounded-tr-xl rounded-br-xl"></section>
  );
}
