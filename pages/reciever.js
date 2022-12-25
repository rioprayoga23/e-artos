import React from "react";
import { Search } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

const reciever = () => {
  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <div className="mb-10">
          <h3 className="font-semibold mb-5">Search Reciever</h3>
          <div className="py-2 px-5 bg-[#3A3D421A] rounded-md flex items-center">
            <div className="flex flex-1 gap-5">
              <Search />
              <input
                type="text"
                className="outline-none w-full bg-transparent"
                placeholder="Search receiver here"
              />
            </div>
            <div className="bg-third py-2 px-5 rounded-md cursor-pointer md:hidden">
              Search
            </div>
          </div>
          <div className="bg-third py-2 px-5 rounded-md cursor-pointer md:block hidden mt-3 text-center">
            Search
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer">
            <div className="flex gap-3 items-center">
              <img
                src="img/profile3.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Samuel Suhi</h3>
                <p className="text-sm">+62 813-8492-9994</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer">
            <div className="flex gap-3 items-center">
              <img
                src="img/logo-netflix.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Netflix</h3>
                <p className="text-sm">+62 813-8492-9994</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer">
            <div className="flex gap-3 items-center">
              <img
                src="img/profile3.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Samuel Suhi</h3>
                <p className="text-sm">+62 813-8492-9994</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer">
            <div className="flex gap-3 items-center">
              <img
                src="img/logo-netflix.png"
                alt=""
                className="h-[56px] w-[56px]"
              />
              <div>
                <h3 className="font-semibold">Netflix</h3>
                <p className="text-sm">+62 813-8492-9994</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default reciever;
