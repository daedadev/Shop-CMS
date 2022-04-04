import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileSideBar() {
  const [showNavigation, setShowNavigtion] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowNavigtion(!showNavigation)}
        className="md:hidden absolute flex bottom-0 z-50 bg-slate-800 text-white p-3 rounded-tr-xl w-16 h-16 items-center justify-center"
      >
        <div className="flex flex-col w-full h-full items-center justify-center">
          <div
            className={
              showNavigation
                ? "w-full h-1 bg-slate-200 rotate-45 translate-y-1 duration-500"
                : "w-full h-1 bg-slate-200 duration-500 mb-2"
            }
          ></div>
          <div
            className={
              showNavigation ? "hidden" : "w-full h-1 bg-slate-200 mb-2"
            }
          ></div>
          <div
            className={
              showNavigation
                ? "w-full h-1 bg-slate-200 -rotate-45 duration-500"
                : "w-full h-1 bg-slate-200 duration-500"
            }
          ></div>
        </div>
      </button>
      <section
        className={
          showNavigation
            ? "absolute md:hidden flex-col bottom-0 bg-slate-800 w-16 h-2/3 z-40 mb-10 items-center justify-center rounded-tr-lg duration-500"
            : "absolute md:hidden flex-col bottom-0 w-0 bg-slate-800 h-2/3  z-40 mb-10 items-center justify-center rounded-tr-lg duration-500"
        }
      >
        <section
          className={
            showNavigation
              ? "flex flex-col w-full h-full items-center justify-evenly pt-3 duration-500"
              : "hidden flex-col w-full h-full items-center justify-evenly pt-3 duration-500"
          }
        >
          <Link
            onClick={() => setShowNavigtion(!showNavigation)}
            to={{ pathname: "/" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <img
              className="w-10"
              alt="Home icon"
              src="https://img.icons8.com/material-outlined/60/FFFFFF/home--v2.png"
            />
          </Link>

          <Link
            onClick={() => setShowNavigtion(!showNavigation)}
            to={{ pathname: "/inventory" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <img
              className="w-10"
              alt="Inventory Icon"
              src="https://img.icons8.com/ios/60/FFFFFF/bulleted-list.png"
            />
          </Link>

          <Link
            onClick={() => setShowNavigtion(!showNavigation)}
            to={{ pathname: "/sold" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <img
              className="w-10"
              alt="Sold icon"
              src="https://img.icons8.com/ios/60/FFFFFF/money-bag.png"
            />
          </Link>

          <Link
            onClick={() => setShowNavigtion(!showNavigation)}
            to={{ pathname: "/user" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <img
              className="w-10"
              alt="Users icon"
              src="https://img.icons8.com/material-outlined/60/FFFFFF/user--v1.png"
            />{" "}
          </Link>

          <Link
            onClick={() => setShowNavigtion(!showNavigation)}
            to={{ pathname: "/stats" }}
            className="flex flex-col items-center justify-center w-11/12 h-full mb-10"
          >
            <img
              className="w-10"
              alt="Stats icon"
              src="https://img.icons8.com/external-prettycons-solid-prettycons/60/FFFFFF/external-stats-business-and-finance-prettycons-solid-prettycons.png"
            />{" "}
          </Link>
        </section>
      </section>
    </>
  );
}
