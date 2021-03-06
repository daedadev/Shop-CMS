import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <section className="hidden md:flex flex-col bg-slate-800 w-1/6 h-full justify-between rounded-tl-xl rounded-bl-xl">
      <section className="flex flex-col w-full h-full items-center">
        <article className="flex items-center justify-center h-24">
          <h1 className="text-slate-200 font-bold">Dashboard</h1>
        </article>
        <article className="flex flex-col w-full h-fit items-center justify-between mt-20">
          <Link
            to={{ pathname: "/" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <h1 className="text-slate-200 font-semibold">Home Page</h1>
          </Link>

          <Link
            to={{ pathname: "/inventory" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <h1 className="text-slate-200 font-semibold">Inventory</h1>
          </Link>

          <Link
            to={{ pathname: "/sold" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <h1 className="text-slate-200 font-semibold">Sold</h1>
          </Link>

          <Link
            to={{ pathname: "/user" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <h1 className="text-slate-200 font-semibold">Users</h1>
          </Link>

          <Link
            to={{ pathname: "/stats" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <h1 className="text-slate-200 font-semibold">Statistics</h1>
          </Link>
        </article>
      </section>

      <section className="flex items-center justify-center h-1/5 bg-slate-900 pl-10 pr-10 rounded-bl-xl">
        <h1 className="text-center text-slate-200">Created By: Daniel Moore</h1>
      </section>
    </section>
  );
}
