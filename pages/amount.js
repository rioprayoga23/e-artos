import React from "react";
import { Edit2 } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

const amount = () => {
  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <div className="mb-10">
          <h3 className="font-semibold mb-5">Transfer Money</h3>
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
        <div className="w-[40%] py-10 md:w-full lg:w-[80%]">
          <p className="text-[#7A7886]">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <input
              type="text"
              className="text-primary py-7 placeholder:text-4xl outline-none placeholder:text-center"
              placeholder="0.00"
            />
          </div>
          <h3 className="font-semibold">Rp120.000 Available</h3>
          <div className="relative py-14">
            <Edit2 className="absolute" style={{ color: "#A9A9A999" }} />
            <input
              type="email"
              className="w-full border-b-2 focus:outline-none px-12 pb-2 invalid:border-primary"
              placeholder="Add some notes"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="btn bg-primary hover:bg-primary px-6 md:w-full">
            Continue
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default amount;
