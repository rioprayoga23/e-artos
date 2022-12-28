import Link from "next/link";
import React, { useState } from "react";
import { Download } from "react-feather";
import { useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import StatusFailed from "../components/status-failed";
import StatusSuccess from "../components/status-success";

const Status = () => {
  const status = useSelector((state) => state.transactions.status);

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        {status === "success" ? <StatusSuccess /> : <StatusFailed />}
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
        <div className="mt-10">
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
        {status ? (
          <div className="flex justify-end mt-20 gap-5 md:flex-col md:gap-3">
            <div className="btn bg-purple-600 hover:bg-purple-600 px-6 md:w-full flex gap-3 w-[200px] lg:flex-1">
              <Download />
              Download PDF
            </div>
            <Link href="/home">
              <div className="btn bg-primary hover:bg-primary px-6 md:w-full w-[200px] lg:flex-1">
                Back To Home
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex justify-end mt-20 gap-5">
            <div className="btn bg-primary hover:bg-primary px-6 md:w-full w-[200px]">
              Try Again
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Status;
