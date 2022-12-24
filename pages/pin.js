import React, { useState } from "react";
import { Check } from "react-feather";
import MainLayoutAuth from "../components/layouts/MainLayoutAuth";

export default function Pin() {
  const [succes, setSuccess] = useState(true);
  return (
    <MainLayoutAuth title="Pin">
      <>
        {!succes ? (
          <article className="flex w-[40%] md:w-full lg:w-full">
            <div className="px-20 pt-16 md:px-9 lg:px-32 xl:py-10 xl:px-16">
              <h1 className="text-2xl font-semibold mb-6 hidden lg:block">
                Create Pin
              </h1>
              <h1 className="text-2xl font-semibold mb-6">
                Secure Your Account, Your Wallet, and Your Data With 6 Digits
                PIN That You Created Yourself.
              </h1>
              <p className="leading-7 text-[#3A3D4299] text-base">
                Create 6 digits pin to secure all your money and your data in
                FazzPay app. Keep it secret and don’t tell anyone about your
                FazzPay account password and the PIN.
              </p>
              <div className="grid grid-cols-6 gap-5 mt-10 md:gap-2 lg:gap-2 xl:gap-3">
                <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                  <input
                    type="text"
                    className="border-b focus:outline-none w-full"
                  />
                </div>
                <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                  <input
                    type="text"
                    className="border-b focus:outline-none w-full"
                  />
                </div>
                <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                  <input
                    type="text"
                    className="border-b focus:outline-none w-full"
                  />
                </div>
                <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                  <input
                    type="text"
                    className="border-b focus:outline-none w-full"
                  />
                </div>
                <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                  <input
                    type="text"
                    className="border-b focus:outline-none w-full"
                  />
                </div>
                <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                  <input
                    type="text"
                    className="border-b focus:outline-none w-full"
                  />
                </div>
              </div>
              <button className="btn bg-primary w-full mt-10 hover:bg-primary">
                Confirm
              </button>
            </div>
          </article>
        ) : (
          <article className="flex w-[40%] lg:w-full justify-center">
            <div className="px-20 pt-16 md:px-9 lg:px-32">
              <div className="p-4 bg-success rounded-full w-fit">
                <Check size="30px" color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold py-10">
                  Your PIN Was Successfully Created
                </h1>
                <p className="text-[#3A3D4299]">
                  Your PIN was successfully created and you can now access all
                  the features in FazzPay.
                </p>
              </div>
              <button className="btn bg-primary w-full mt-10 hover:bg-primary">
                Go To Dashboard
              </button>
            </div>
          </article>
        )}
      </>
    </MainLayoutAuth>
  );
}
