import jwtDecode from "jwt-decode";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import http from "../helpers/http";

const History = () => {
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState();
  const [transactionsData, setTransactionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const decoded = jwtDecode(token);

  const getTransactions = async () => {
    const { data } = await http(token).get(
      `/transactions?page=${currentPage}&limit=5`
    );
    setTransactionsData(data.results);
  };

  const getCurrentUser = async () => {
    const { data } = await http(token).get("/profile");
    setUserData(data.results);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getTransactions();
  }, [currentPage]);

  useEffect(() => {
    getCurrentUser();
    getTransactions();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white p-5 rounded-lg shadow-md w-full h-[500px]">
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
          {transactionsData?.map((data) => {
            return (
              <div className="flex justify-between items-center" key={data.id}>
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
      <div className="btn-group grid grid-cols-2 mt-5">
        {currentPage > 1 ? (
          <button
            className="btn bg-primary hover:bg-primary"
            onClick={handlePrev}
          >
            Previous page
          </button>
        ) : (
          <button
            disabled={true}
            className="btn btn-outline"
            onClick={handlePrev}
          >
            Previous page
          </button>
        )}

        <button
          className="btn bg-primary hover:bg-primary"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
};

export default History;
