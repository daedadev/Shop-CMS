import React, { useEffect } from "react";

export default function MainPage() {
  async function getInventory() {
    await fetch("/api/clothing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((items) => items.json())
      .then((items) => {});
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl"></section>
  );
}
