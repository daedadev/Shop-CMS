import React from "react";

export default function InventoryLoading() {
  return (
    <article className="flex flex-col w-full justify-evenly">
      <div className="flex flex-col w-full bg-slate-100 justify-evenly pb-3 rounded-lg mb-7 shadow-md">
        <div className="animate-pulse  grid grid-cols-3 gap-10 mt-6 mb-3 ml-3 rounded-lg">
          <div className="text-xl bg-slate-300 h-7 w-32 rounded-lg"></div>
          <div className="text-xl bg-slate-300 h-7  w-32 rounded-lg"></div>
          <div className="text-xl bg-slate-300 h-7  w-32 rounded-lg"></div>
        </div>
        <div className="animate-pulse  bg-slate-300 h-7  w-32 ml-3 rounded-lg"></div>
        <div className="animate-pulse flex flex-col h-fit w-full items-center mt-3">
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
        </div>
      </div>
      <div className="flex flex-col w-full bg-slate-100 justify-evenly pb-3 rounded-lg mb-7 shadow-md">
        <div className="animate-pulse  grid grid-cols-3 gap-10 mt-6 mb-3 ml-3 rounded-lg">
          <div className="text-xl bg-slate-300 h-7 w-32 rounded-lg"></div>
          <div className="text-xl bg-slate-300 h-7  w-32 rounded-lg"></div>
          <div className="text-xl bg-slate-300 h-7  w-32 rounded-lg"></div>
        </div>
        <div className="animate-pulse  bg-slate-300 h-7  w-32 ml-3 rounded-lg"></div>
        <div className="animate-pulse flex flex-col h-fit w-full items-center mt-3">
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
        </div>
      </div>
      <div className="flex flex-col w-full bg-slate-100 justify-evenly pb-3 rounded-lg mb-7 shadow-md">
        <div className="animate-pulse  grid grid-cols-3 gap-10 mt-6 mb-3 ml-3 rounded-lg">
          <div className="text-xl bg-slate-300 h-7 w-32 rounded-lg"></div>
          <div className="text-xl bg-slate-300 h-7  w-32 rounded-lg"></div>
          <div className="text-xl bg-slate-300 h-7  w-32 rounded-lg"></div>
        </div>
        <div className="animate-pulse  bg-slate-300 h-7  w-32 ml-3 rounded-lg"></div>
        <div className="animate-pulse flex flex-col h-fit w-full items-center mt-3">
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
          <div className="bg-slate-300 h-10 w-[95%] rounded-lg mb-2"></div>
        </div>
      </div>
    </article>
  );
}
