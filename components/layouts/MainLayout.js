import Link from "next/link";
import React, { useState } from "react";
import { Grid, ArrowUp, Plus, User, LogOut } from "react-feather";

import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/action/profile";
import { logout } from "../../redux/reducers/auth";
import { clearProfileAction } from "../../redux/reducers/profile";

import Footer from "../Footer";
import Navbar from "../Navbar";

import http from "../../helpers/http";
import { deleteCookie } from "cookies-next";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

const MainLayout = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
    dispatch(clearProfileAction());
    deleteCookie("token");
  };

  const doTopUp = async (value) => {
    const form = new URLSearchParams({
      amount: value.amount,
    });
    try {
      setIsLoading(true);
      const { data } = await http(token).post("/transactions/topup", form);
      setMessage(data.message);
      dispatch(getProfileAction());
      setIsLoading(false);
      setMessage("");
    } catch (error) {
      setIsLoading(false);
      setMessage("");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-third">
        <Navbar />
        <main className="px-24 flex py-10 lg:px-9 3xl:px-[450px] gap-5 md:px-5">
          <aside className="w-[25%] md:hidden">
            <div className="bg-white rounded-lg px-7 py-10 flex flex-col shadow-md lg:h-[450px] h-full">
              <div className="flex-1 flex flex-col gap-10">
                <div className="flex gap-5">
                  <Link href="/home">
                    <Grid />
                  </Link>
                  <Link href="/home">Dashboard</Link>
                </div>
                <div className="flex gap-5">
                  <Link href="/receiver">
                    <ArrowUp />
                  </Link>
                  <Link href="/reciever">Transfer</Link>
                </div>
                <div className="flex gap-5">
                  <label htmlFor="my-modal-3" className="cursor-pointer">
                    <Plus />
                  </label>
                  <label htmlFor="my-modal-3" className="cursor-pointer">
                    Top Up
                  </label>
                </div>
                <div className="flex gap-5">
                  <Link href="/profile">
                    <User />
                  </Link>
                  <Link href="/profile">Profile</Link>
                </div>
              </div>
              <div>
                <div className="flex gap-5 cursor-pointer" onClick={doLogout}>
                  <LogOut />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}

          <section className="w-[85%] md:w-full">{children}</section>
          {/* Put this part before </body> tag */}
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
                          !errors.amount &&
                          touched.amount &&
                          "border-purple-500"
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
          {/* <input type="checkbox" id="topUp-modal" className="modal-toggle" />
          <label
            htmlFor="topUp-modal"
            className="modal md:modal-bottom cursor-pointer"
          >
            <label className="modal-box" htmlFor="">
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
              <h3 className="text-lg font-bold">Topup</h3>
              <p className="py-4">
                Enter the amount of money, and click submit
              </p>
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
                          !errors.amount &&
                          touched.amount &&
                          "border-purple-500"
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
                    <div className="flex justify-end mt-10">
                      <button
                        type="submit"
                        disabled={!dirty}
                        className="btn bg-primary hover:bg-primary cursor-pointer px-10"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </label>
          </label> */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
