import React, { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { ArrowUp, ArrowDown, Plus } from "react-feather";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import http from "../helpers/http";
import WithAuth from "../components/HOC/WithAuth";
import jwtDecode from "jwt-decode";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getProfileAction } from "../redux/action/profile";
import Image from "next/image";

const topUpSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Must be number")
    .required("Required")
    .test(
      "Is positive?",
      "The amount must be greater than 0!",
      (value) => value > 0
    ),
});

const HomePage = ({ transactionsData }) => {
  console.log(transactionsData);
  const token = useSelector((state) => state.auth.token);
  const { id } = useSelector((state) => state.profile);
  const { balance } = useSelector((state) => state.profile);
  const { phoneNumber } = useSelector((state) => state.profile);

  // const [transactionsData, setTransactionsData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const doTopUp = async () => {
    const form = new URLSearchParams({
      amount: value.amount,
    });
    try {
      setIsLoading(true);
      const { data } = await http(token).post("/transactions/topup", form);
      setMessage(data.message);
      dispatch(getProfileAction());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessage("");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const getTransactions = async () => {
  //     const { data } = await http(token).get("/transactions?page=1&limit=5");
  //     setTransactionsData(data.results);
  //   };
  //   getTransactions();
  // }, [token, balance]);

  return (
    <MainLayout>
      <div className="bg-primary p-5 shadow-md rounded-lg flex text-white md:flex-col md:w-full">
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-base">Balance</p>
          <h3 className="text-3xl font-semibold">{`${Intl.NumberFormat(
            "id-ID",
            {
              style: "currency",
              currency: "IDR",
            }
          ).format(balance)}`}</h3>
          <p className="font-base">
            {phoneNumber ? `+62${phoneNumber}` : phoneNumber}
          </p>
        </div>
        <div className="grid grid-rows-2 gap-3 md:mt-10 md:grid-cols-2 md:grid-rows-1">
          <Link href="/reciever">
            <div className="flex gap-2 p-3 w-32 bg-purple-400 rounded-md items-center cursor-pointer md:w-full justify-center">
              <ArrowUp color="white" />
              <p>Transfer</p>
            </div>
          </Link>

          <label htmlFor="my-modal-3" className="cursor-pointer">
            <div className="flex gap-2 p-3 w-32 bg-purple-400 rounded-md items-center cursor-pointer md:w-full justify-center">
              <Plus color="white" />
              <p>Top Up</p>
            </div>
          </label>
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
              <Image
                src="/img/graphic.png"
                alt="graphic"
                width={350}
                height={358}
              />
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
            {transactionsData.map((data) => {
              return (
                <div
                  className="flex justify-between items-center"
                  key={data.id}
                >
                  <div className="flex gap-3 items-center">
                    {data.recipientId === id && data.senderId === null && (
                      <div>
                        {data?.recipientPicture ? (
                          <div className="avatar">
                            <div className="w-12 rounded-xl">
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  data?.recipientPicture
                                }
                                alt="profile"
                                width={50}
                                height={30}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar">
                            <div className="w-12 rounded-xl">
                              <Image
                                src="/img/profile.jpg"
                                alt="profile"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {data.recipientId !== id && (
                      <div>
                        {data?.recipientPicture ? (
                          <div className="avatar">
                            <div className="w-12 rounded-xl">
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  data?.recipientPicture
                                }
                                alt="profile"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar">
                            <div className="w-12 rounded-xl">
                              <Image
                                src="/img/profile.jpg"
                                alt="profile"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {data.recipientId === id && data.senderId !== null && (
                      <div>
                        {data?.senderPicture ? (
                          <div className="avatar">
                            <div className="w-12 rounded-xl">
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  data?.senderPicture
                                }
                                alt="profile"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar">
                            <div className="w-12 rounded-xl">
                              <Image
                                src="/img/profile.jpg"
                                alt="profile"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
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
                      data.recipientId === id
                        ? "text-green-600"
                        : "text-red-500"
                    } `}
                  >
                    {data.recipientId === id
                      ? `+${Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data.amount)}`
                      : `-${Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data.amount)}`}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={() => setMessage("")}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-5">Top Up</h3>
          {message && (
            <div className="alert alert-success shadow-lg mb-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}
          <Formik
            initialValues={{
              amount: "",
            }}
            validationSchema={topUpSchema}
            onSubmit={(value) => doTopUp(value)}
          >
            {({ errors, touched, dirty }) => (
              <Form>
                <div className="px-24 md:px-9 py-5 border-2 flex items-center justify-center rounded-lg">
                  <Field
                    type="text"
                    name="amount"
                    className={`w-full outline-none text-2xl text-center border-b-2 focus:outline-none px-12 md:px-0 pb-2 bg-white  ${
                      errors.amount && touched.amount && "border-red-500"
                    } ${
                      !errors.amount && touched.amount && "border-purple-500"
                    }`}
                  />
                </div>
                {errors.amount && touched.amount && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.amount}
                    </span>
                  </label>
                )}
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!dirty || isLoading}
                    className={`btn bg-primary hover:bg-primary cursor-pointer px-10 ${
                      isLoading && "loading"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const { data } = await http(token).get("/transactions");
  return {
    props: { transactionsData: data.results },
  };
}

export default WithAuth(HomePage);
