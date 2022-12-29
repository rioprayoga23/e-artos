import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Download } from "react-feather";
import { useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import StatusFailed from "../components/StatusFailed";
import StatusSuccess from "../components/StatusSuccess";
import http from "../helpers/http";

const Status = () => {
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.transactions.status);
  const amount = useSelector((state) => state.transactions.amount);
  const notes = useSelector((state) => state.transactions.notes);
  const recipientId = useSelector((state) => state.transactions.recipientId);

  const [recipientData, setRecipientData] = useState();
  const [userData, setUserData] = useState();

  const getCurrentUser = async () => {
    const { data } = await http(token).get("/profile");
    setUserData(data.results);
  };

  const getRecipient = async () => {
    const { data } = await http(token).get(
      `/transactions/recipient/${recipientId}`
    );
    setRecipientData(data.results);
  };

  useEffect(() => {
    getRecipient();
    getCurrentUser();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        {status === "success" ? <StatusSuccess /> : <StatusFailed />}
        <h3 className="font-semibold mb-5 mt-10">Details</h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Amount</p>
              <h3 className="font-semibold">{amount}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Balance Left</p>
              <h3 className="font-semibold">{userData?.balance}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Date & Time</p>
              <h3 className="font-semibold">
                {new Date()
                  .toLocaleString("default", {
                    month: "long",
                  })
                  .concat(" ", new Date().getDay(), ", ")
                  .concat(new Date().getFullYear())
                  .concat("-", new Date().getHours(), ".")
                  .concat(new Date().getMinutes())}
              </h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Notes</p>
              <h3 className="font-semibold">{notes}</h3>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="font-semibold mb-5">Transfer To</h3>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer">
            <div className="flex gap-3 items-center">
              {recipientData?.picture ? (
                <img
                  src={`https://68xkph-8888.preview.csb.app/upload/${recipientData?.picture}`}
                  alt=""
                  className="w-[60px] h-[60px] rounded-lg"
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-lg bg-gray-200"></div>
              )}
              <div>
                <h3 className="font-semibold">{`${recipientData?.firstName} ${recipientData?.lastName}`}</h3>
                <p className="text-sm">{recipientData?.phoneNumber}</p>
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
