import Link from "next/link";
import Router from "next/router";
import React from "react";
import { Grid, ArrowUp, Plus, User, LogOut } from "react-feather";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/auth";
import Footer from "../Footer";
import Navbar from "../Navbar";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logout());
    Router.push("/login");
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow bg-third">
        <Navbar />
        <main className="px-24 flex py-10 lg:px-9 3xl:px-[450px] gap-5 md:px-5">
          <aside className="w-[25%] md:hidden">
            <div className="bg-white rounded-lg px-7 py-10 flex flex-col shadow-md lg:h-[450px] h-full">
              <div className="flex-1 flex flex-col gap-10">
                <div className="flex gap-5">
                  <Link href="/home">
                    <Grid />
                  </Link>
                  <Link href="/home">Dashboard</Link>
                </div>
                <div className="flex gap-5">
                  <Link href="/receiver">
                    <ArrowUp />
                  </Link>
                  <Link href="/reciever">Transfer</Link>
                </div>
                <div className="flex gap-5">
                  <label htmlFor="topUp-modal" className="cursor-pointer">
                    <Plus />
                  </label>
                  <label htmlFor="topUp-modal" className="cursor-pointer">
                    Top Up
                  </label>
                </div>
                <div className="flex gap-5">
                  <Link href="/profile">
                    <User />
                  </Link>
                  <Link href="/profile">Profile</Link>
                </div>
              </div>
              <div>
                <div className="flex gap-5 cursor-pointer" onClick={doLogout}>
                  <LogOut />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}

          <section className="w-[85%] md:w-full">{children}</section>

          <input type="checkbox" id="topUp-modal" className="modal-toggle" />
          <label
            htmlFor="topUp-modal"
            className="modal md:modal-bottom cursor-pointer"
          >
            <label className="modal-box" htmlFor="">
              <h3 className="text-lg font-bold">Topup</h3>
              <p className="py-4">
                Enter the amount of money, and click submit
              </p>
              <div className="px-24 py-5 border-2 flex items-center justify-center rounded-lg">
                <input
                  type="number"
                  className="border-b-2 outline-none text-2xl text-center"
                />
              </div>
              <div className="flex justify-end mt-10">
                <div className="btn bg-primary hover:bg-primary cursor-pointer px-10">
                  Submit
                </div>
              </div>
            </label>
          </label>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
