import React, { useEffect, useState } from "react";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";
import OrderModal from "../components/OrderModal/OrderModal";
import UserItem from "../components/UserItem/UserItem";

export default function UserPage() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState();

  function openModal(item) {
    console.log(item);
    setModalItem(item);
    setModal(true);
  }

  useEffect(() => {
    async function getUsers() {
      await fetch("http://localhost:3001/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((items) => items.json())
        .then((items) => {
          setUsers(items);
          console.log(items);
          setLoading(false);
        });
    }
    getUsers();
  }, []);

  return (
    <>
      {modal && <OrderModal setToggle={setModal} id={modalItem} />}
      <section className="flex flex-col w-full h-full items-center justify-center bg-slate-200 md:rounded-tr-xl md:rounded-br-xl md:rounded-tl-none md:rounded-bl-none rounded-lg">
        <h1 className="flex text-5xl text-slate-800 text-left w-full pt-5 mb-5 pl-8">
          User Accounts
        </h1>
        <div className="flex flex-col w-[98%] h-[95%] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300">
          {loading && <LoadingIcon />}

          <section className="flex flex-col w-full mb-5 bg-slate-100 p-5 rounded-lg shadow-md ">
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
          </section>
        </div>
      </section>
    </>
  );
}
