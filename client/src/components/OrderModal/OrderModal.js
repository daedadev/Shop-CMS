export default function OrderModal({ setToggle, item }) {
  return (
    <section className="flex absolute bg-slate-500 bg-opacity-30 md:h-5/6 h-[95%] xl:w-1280 md:w-11/12 w-full rounded-xl items-center justify-center z-20 ">
      <section className="flex absolute items-center justify-center bg-slate-100 h-5/6 md:h-3/4 w-10/12 md:w-2/3 lg:w-[700px] z-10 mt-2 md:mt-5 rounded-lg shadow-md">
        <form className="flex flex-col w-full h-full justify-between pl-10 pr-10 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-400">
          <div className="flex w-full justify-center p-5 font-bold">
            <h1 className="text-2xl text-center">Order Information</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold">Order Number</h1>
            <h1 className="text-center">#{item.order_number}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Item(s) Ordered</h1>
            <h1 className="text-center">{item.name}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Price</h1>
            <h1 className="text-center">${item.price}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Size(s)</h1>
            <h1 className="text-center">{item.size}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Address</h1>
            <h1 className="text-center">{item.address}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Shipping Type</h1>
            <h1 className="text-center">{item.shipping_type}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Customer Name</h1>
            <h1 className="text-center">{item.user.name}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Customer Name</h1>
            <h1 className="text-center">{item.user.email}</h1>
          </div>
          <div className="flex flex-col w-full justify-evenly items-center">
            <h1 className="font-semibold text-center">Order Status</h1>
            {item.order_status ? <h1>Fufilled</h1> : <h1>Unfulfilled</h1>}
          </div>
          <div className="flex flex-row justify-end w-full p-5">
            <button
              className="flex justify-center font-semibold bg-white border border-gray-400 text-black md:w-24 w-fit pl-5 pr-5 md:mr-5 rounded-lg hover:bg-gray-200"
              onClick={(e) => {
                setToggle(false);
                e.preventDefault();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
