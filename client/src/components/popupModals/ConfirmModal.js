import React from "react";

export default function ConfirmModal({
  modalToggle,
  onDelete,
  onCancel,
  message,
  title,
}) {
  return (
    <div
      className={
        modalToggle
          ? "flex flex-col absolute items-center justify-center w-full h-full bg-slate-500 bg-opacity-50 z-20 md:rounded-xl"
          : "hidden"
      }
    >
      <div className="flex flex-col absolute items-center justify-between md:w-[60%] w-[90%] md:h-[20%] h-[30%] bg-white border border-slate-300 rounded-lg text-center pt-5">
        <h1 className="text-black text-3xl font-semibold ">{title}</h1>
        <p className="text-slate-500">{message}</p>
        <div className="flex flex-row items-center md:justify-end justify-evenly w-full bg-slate-100 rounded-br-lg rounded-bl-lg pt-4 pb-4">
          <button
            onClick={onCancel}
            className="flex justify-center font-semibold bg-white border border-gray-400 text-black w-24 pl-5 pr-5 md:mr-5 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex justify-center font-semibold bg-red-600 border border-red-500 text-white w-24 pl-5 pr-5 md:mr-5 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
