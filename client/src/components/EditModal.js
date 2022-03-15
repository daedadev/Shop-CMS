import React, { useEffect, useState, useRef } from "react";

export default function EditModal({ setToggle, toggle, item }) {
  // Variables referencing user input
  if (toggle) {
    return (
      <section className="flex absolute bg-slate-100 h-3/4 w-10/12 z-10 mt-5 rounded-lg shadow-md">
        <form className="flex flex-col w-full min-h-fit">
          <h1 className="w-full text-black text-3xl text-center mt-10 font-semibold">
            {item.name}
          </h1>
          <section className="flex w-full items-center justify-end">
            <button
              className="flex bg-blue-500 text-white w-fit pl-5 pr-5 mr-10 rounded-lg hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                setToggle(false);
              }}
            >
              Close
            </button>
          </section>
        </form>
      </section>
    );
  }

  return <></>;
}
