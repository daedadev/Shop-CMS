import React from "react";

export default function LoadingIcon() {
  return (
    <div className="absolute flex flex-row-reverse md:flex-col top-4 right-4 items-center justify-center">
      <svg
        className="animate-spin h-10 w-10"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-40"
          cx={"12"}
          cy={"12"}
          r="10"
          stroke="#454545"
          stroke-width={"2"}
        ></circle>
        <path
          fill="#FFFFFF"
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <h1 className="md:text-slate-200 text-slate-800 mr-2 md:mr-0 opacity-75">
        Loading...
      </h1>
    </div>
  );
}
