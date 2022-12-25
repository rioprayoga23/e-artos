import Link from "next/link";
import React from "react";
import MainLayout from "../components/layouts/MainLayout";

const history = () => {
  return (
    <MainLayout>
      <div className="bg-white p-5 rounded-lg shadow-md w-full">
        <div className="flex justify-between mb-10 md:flex md:flex-col md:gap-5">
          <h3 className="font-semibold">Transaction History</h3>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="bg-[#3A3D421A] py-2 px-3 rounded-md cursor-pointer text-center"
            >
              -- Select Filter --
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="img/profile3.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Samuel Suhi</h3>
                <p className="text-sm">Accept</p>
              </div>
            </div>
            <h3 className="font-semibold text-green-600">+Rp50.000</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="img/logo-netflix.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Netflix</h3>
                <p className="text-sm">Transfer</p>
              </div>
            </div>
            <h3 className="font-semibold text-red-500">+Rp50.000</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="img/profile3.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Samuel Suhi</h3>
                <p className="text-sm">Accept</p>
              </div>
            </div>
            <h3 className="font-semibold text-green-600">+Rp50.000</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="img/logo-netflix.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Netflix</h3>
                <p className="text-sm">Transfer</p>
              </div>
            </div>
            <h3 className="font-semibold text-red-500">+Rp50.000</h3>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default history;
