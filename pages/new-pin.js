import React from "react";
import MainLayout from "../components/layouts/MainLayout";

const NewPin = () => {
  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <h3 className="font-semibold mb-5">Change PIN</h3>
        <div className="w-[45%] md:w-full lg:w-[75%]">
          <p className="text-[#7A7886]">
            Type your new 6 digits security PIN to use in Fazzpay..
          </p>
        </div>
        <div className="grid grid-cols-6 gap-5 mt-20 md:gap-2 lg:gap-2 xl:gap-3 px-48 md:px-0 lg:px-9 xl:px-16">
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
        <div className="px-48 pb-40 md:px-0 lg:px-9 xl:px-16">
          <div className="btn bg-primary hover:bg-primary mt-14 w-full">
            Change Pin
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewPin;
