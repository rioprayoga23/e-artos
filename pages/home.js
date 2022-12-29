import React, { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { ArrowUp, ArrowDown, Plus } from "react-feather";
import Link from "next/link";
import { useSelector } from "react-redux";
import http from "../helpers/http";
import WithAuth from "../components/HOC/WithAuth";
import jwtDecode from "jwt-decode";

const HomePage = () => {
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState();
  const [transactionsData, setTransactionsData] = useState([]);

  const decoded = jwtDecode(token);

  const getTransactions = async () => {
    const { data } = await http(token).get("/transactions?page=1&limit=5");
    setTransactionsData(data.results);
  };

  const getCurrentUser = async () => {
    const { data } = await http(token).get("/profile");
    setUserData(data.results);
  };

  useEffect(() => {
    getCurrentUser();
    getTransactions();
  }, []);

  return (
    <MainLayout>
      <div className="bg-primary p-5 shadow-md rounded-lg flex text-white md:flex-col md:w-full">
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-base">Balance</p>
          <h3 className="text-3xl font-semibold">Rp{userData?.balance}</h3>
          <p className="font-base">{userData?.phoneNumber}</p>
        </div>
        <div className="grid grid-rows-2 gap-3 md:mt-10 md:grid-cols-2 md:grid-rows-1">
          <Link href="/receiver">
            <div className="flex gap-2 p-3 w-32 bg-purple-400 rounded-md items-center cursor-pointer md:w-full justify-center">
              <ArrowUp color="white" />
              <p>Transfer</p>
            </div>
          </Link>

          <div className="flex gap-2 p-3 w-32 bg-purple-400 rounded-md items-center cursor-pointer md:w-full justify-center">
            <Plus color="white" />
            <p>Top Up</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 lg:flex-col">
        <div className="bg-white p-5 mt-5 rounded-lg shadow-md w-[55%] lg:w-full">
          <div className="flex justify-between">
            <div>
              <ArrowDown color="green" />
              <p className="">Income</p>
              <p className="font-semibold">Rp2.120.000</p>
            </div>
            <div>
              <ArrowUp color="red" />
              <p className="">Expense</p>
              <p className="font-semibold">Rp1.560.000</p>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <div>
              <img src="img/graphic.png" alt="" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 mt-5 rounded-lg shadow-md w-[45%] lg:w-full">
          <div className="flex justify-between mb-10">
            <h3 className="font-semibold">Transaction History</h3>
            <Link href="/history" className="text-primary font-semibold">
              See all
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {transactionsData?.map((data) => {
              return (
                <div
                  className="flex justify-between items-center"
                  key={data.id}
                >
                  <div className="flex gap-3 items-center">
                    {data.recipientId === decoded.id &&
                      data.senderId === null && (
                        <div>
                          {data?.recipientPicture ? (
                            <img
                              src={`https://68xkph-8888.preview.csb.app/upload/${data?.recipientPicture}`}
                              alt=""
                              className="h-[56px] w-[56px]"
                            />
                          ) : (
                            <div className="h-[56px] w-[56px] bg-gray-200"></div>
                          )}
                        </div>
                      )}
                    {data.recipientId !== decoded.id && (
                      <div>
                        {data?.recipientPicture ? (
                          <img
                            src={`https://68xkph-8888.preview.csb.app/upload/${data?.recipientPicture}`}
                            alt=""
                            className="h-[56px] w-[56px]"
                          />
                        ) : (
                          <div className="h-[56px] w-[56px] bg-gray-200"></div>
                        )}
                      </div>
                    )}
                    {data.recipientId === decoded.id &&
                      data.senderId !== null && (
                        <div>
                          {data?.senderPicture ? (
                            <img
                              src={`https://68xkph-8888.preview.csb.app/upload/${data?.senderPicture}`}
                              alt=""
                              className="h-[56px] w-[56px]"
                            />
                          ) : (
                            <div className="h-[56px] w-[56px] bg-gray-200"></div>
                          )}
                        </div>
                      )}
                    <div>
                      <h3 className="font-semibold">{data.recipientname}</h3>
                      <p className="text-sm">{data.notes}</p>
                    </div>
                  </div>
                  <h3
                    className={`font-semibold ${
                      data.recipientId === decoded.id
                        ? "text-green-600"
                        : "text-red-500"
                    } `}
                  >
                    Rp{data.amount}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WithAuth(HomePage);
