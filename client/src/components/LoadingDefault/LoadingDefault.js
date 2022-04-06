import React from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function LoadingDefault({ title }) {
  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg">
        <LoadingIcon />
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 pl-8">
          {title}
        </h1>
        <div className="flex flex-col w-[95%] h-[95%] items-center"></div>
      </section>
    </>
  );
}
