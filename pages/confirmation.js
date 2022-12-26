import React from "react";
import { Edit2 } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

const confirmation = () => {
  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <div className="mb-10">
          <h3 className="font-semibold mb-5">Transfer To</h3>
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
        </div>
        <h3 className="font-semibold mb-5 mt-10">Details</h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Amount</p>
              <h3 className="font-semibold">Rp100.000</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Balance Left</p>
              <h3 className="font-semibold">Rp20.000</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Date & Time</p>
              <h3 className="font-semibold">May 11, 2020 - 12.20</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Notes</p>
              <h3 className="font-semibold">For buying some socks</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <label
            className="btn bg-primary hover:bg-primary px-6 md:w-full"
            htmlFor="pin-confirmation-modal"
          >
            Continue
          </label>
        </div>
      </div>

      <input
        type="checkbox"
        id="pin-confirmation-modal"
        className="modal-toggle"
      />
      <label
        htmlFor="pin-confirmation-modal"
        className="modal md:modal-bottom cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Enter PIN to Transfer</h3>
          <p className="py-4">
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </p>
          <div className="grid grid-cols-6 gap-5 py-7 md:gap-2 lg:gap-2 xl:gap-3">
            <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
              <input
                type="text"
                className="border-b focus:outline-none w-full text-2xl text-center"
              />
            </div>
            <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
              <input
                type="text"
                className="border-b focus:outline-none w-full text-2xl text-center"
              />
            </div>
            <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
              <input
                type="text"
                className="border-b focus:outline-none w-full text-2xl text-center"
              />
            </div>
            <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
              <input
                type="text"
                className="border-b focus:outline-none w-full text-2xl text-center"
              />
            </div>
            <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
              <input
                type="text"
                className="border-b focus:outline-none w-full text-2xl text-center"
              />
            </div>
            <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
              <input
                type="text"
                className="border-b focus:outline-none w-full text-2xl text-center"
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <div className="btn bg-primary hover:bg-primary cursor-pointer">
              Continue
            </div>
          </div>
        </label>
      </label>
    </MainLayout>
  );
};

export default confirmation;
