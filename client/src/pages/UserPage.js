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
      <section className="flex  w-full h-full items-center justify-center bg-slate-200 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col w-[95%] h-[95%] items-center">
          <div className="flex justify-start w-full h-16">
            <h1 className="flex text-5xl text-slate-800 text-left w-full pl-3 pt-5">
              User Accounts
            </h1>
          </div>

          {loading && <LoadingIcon />}

          <section className="flex flex-col w-full mb-5 bg-slate-100 p-5 rounded-lg shadow-md mt-10">
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
