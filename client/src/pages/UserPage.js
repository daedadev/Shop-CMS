import React, { useEffect, useState } from "react";
import LoadingDefault from "../components/LoadingDefault/LoadingDefault";
import OrderModal from "../components/OrderModal/OrderModal";
import UserItem from "../components/UserItem/UserItem";
import { fetchHelper } from "../utils/helpers/fetchFunction.helpers";

export default function UserPage() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState();

  function openModal(item) {
    setModalItem(item);
    setModal(true);
  }

  useEffect(() => {
    async function getUsers() {
      const userItems = await fetchHelper("user", "GET");
      setUsers(userItems);
      setLoading(false);
    }
    getUsers();
  }, []);

  if (loading) {
    return <LoadingDefault title={"Items Sold"} />;
  }

  return (
    <>
      {modal && <OrderModal setToggle={setModal} id={modalItem} />}
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 md:pl-8 pl-4">
          User Accounts
        </h1>
        <div className="flex flex-col md:w-[98%] w-full h-[95%] items-center mb-5 bg-slate-100 p-5 rounded-lg shadow-md overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300 md:pb-0 pb-[72px]">
          <div className="flex flex-col mb-5 w-full">
            <article className="flex flex-row w-full justify-evenly">
              <h1 className="flex w-full font-bold justify-center">Name</h1>
              <h1 className="flex w-full font-bold justify-center">Email</h1>
              <h1 className="flex w-full font-bold justify-center">
                Join Date
              </h1>
            </article>
            {!loading &&
              users.map((user) => {
                return (
                  <UserItem key={user.id} user={user} openModal={openModal} />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
