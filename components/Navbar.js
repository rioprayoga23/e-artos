import Link from "next/link";
import React from "react";
import { ArrowDown, ArrowUp, Bell, Menu } from "react-feather";
import ItemNotification from "./ItemNotification";

const Navbar = () => {
  return (
    <nav>
      <div className="flex px-24 py-7 md:py-5 items-center md:px-5 lg:px-9 3xl:px-[450px] bg-white">
        <h1 className="flex-1 text-primary font-semibold text-2xl">
          <Link href="/">E-Artos</Link>
        </h1>
        <div className="flex items-center gap-7 md:hidden">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <img src="img/profile3.png" alt="" />
            </Link>
            <div>
              <h3 className="text-lg font-semibold">Robert Chandler</h3>
              <p>+62 8139 3877 7946</p>
            </div>
          </div>
          <div>
            <div className="dropdown dropdown-bottom dropdown-end">
              <Bell className="cursor-pointer" tabIndex={0} />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-5 shadow bg-base-100 rounded-box w-96 mt-7 flex flex-col gap-5"
              >
                <ItemNotification />
                <ItemNotification />
                <ItemNotification />
              </ul>
            </div>
          </div>
        </div>

        {/* DROPDOWN MOBILE */}
        <div className="dropdown dropdown-bottom dropdown-end hidden md:block">
          <div tabIndex={0} className="btn bg-primary hover:bg-primary/80 m-1">
            <Menu color="white" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/home">Dashboard</Link>
            </li>
            <li>
              <Link href="/reciever">Transfer</Link>
            </li>
            <li>
              <label htmlFor="topUp-modal-large" className="cursor-pointer">
                Top Up
              </label>
            </li>
            <li>
              <Link href="/notifications">Notifications</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>

      <input type="checkbox" id="topUp-modal-large" className="modal-toggle" />
      <label
        htmlFor="topUp-modal-large"
        className="modal md:modal-bottom cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Topup</h3>
          <p className="py-4">Enter the amount of money, and click submit</p>
          <div className="px-24 py-5 border-2 flex items-center justify-center rounded-lg">
            <input
              type="text"
              className="border-b-2 outline-none text-xl text-center"
            />
          </div>
          <div className="flex justify-end mt-10">
            <div className="btn bg-primary hover:bg-primary cursor-pointer px-10">
              Submit
            </div>
          </div>
        </label>
      </label>
    </nav>
  );
};

export default Navbar;
