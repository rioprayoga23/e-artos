import React, { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import http from "../helpers/http";

import ItemNotification from "./ItemNotification";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth";
import { getProfileAction } from "../redux/action/profile";

import { Bell, Menu } from "react-feather";
import { deleteCookie } from "cookies-next";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { clearProfileAction } from "../redux/reducers/profile";

const topUpSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Required")
    .test(
      "Is positive?",
      "The amount must be greater than 0!",
      (value) => value > 0
    ),
});

const Navbar = () => {
  const [notification, setNotification] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const { firstName } = useSelector((state) => state.profile);
  const { lastName } = useSelector((state) => state.profile);
  const { picture } = useSelector((state) => state.profile);
  const { phoneNumber } = useSelector((state) => state.profile);

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
      setIsLoading(false);
      dispatch(getProfileAction());
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await http(token).get(
        "/transactions/notification?page=1&limit=5"
      );
      setNotification(data.results);
    };
    getNotifications();
  }, [token]);

  return (
    <nav>
      <div className="flex px-24 py-7 md:py-5 items-center md:px-5 lg:px-9 3xl:px-[450px] bg-white">
        <h1 className="flex-1 text-primary font-semibold text-2xl">
          <Link href="/">E-Artos</Link>
        </h1>
        <div className="flex items-center gap-7 md:hidden">
          <div className="flex gap-3 items-center">
            <div className="avatar">
              {picture ? (
                <div className="w-14 rounded-lg">
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + picture}
                    width={50}
                    height={50}
                    alt="profile"
                  />
                </div>
              ) : (
                <div className="w-14 rounded-lg">
                  <Image
                    src="/img/profile.jpg"
                    width={50}
                    height={50}
                    alt="profile"
                  />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h3>
              <p>{phoneNumber ? `+62${phoneNumber}` : phoneNumber}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="dropdown dropdown-bottom dropdown-end">
              <Bell className="cursor-pointer" tabIndex={0} />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-5 shadow bg-base-100 rounded-box w-96 mt-7 flex flex-col gap-5"
              >
                {notification?.map((data) => {
                  return <ItemNotification data={data} key={data.id} />;
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* DROPDOWN MOBILE */}
        <div className="dropdown dropdown-bottom dropdown-end hidden md:block">
          <div tabIndex={0} className="btn bg-primary hover:bg-primary/80 m-1">
            <Menu color="white" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/home">Dashboard</Link>
            </li>
            <li>
              <Link href="/reciever">Transfer</Link>
            </li>
            <li>
              <label htmlFor="my-modal-3" className="cursor-pointer">
                Top Up
              </label>
            </li>
            <li>
              <Link href="/notifications">Notifications</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <div onClick={doLogout}>Logout</div>
            </li>
          </ul>
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
      {/* <input type="checkbox" id="topUp-modal-large" className="modal-toggle" />
      <label
        htmlFor="topUp-modal-large"
        className="modal md:modal-bottom cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
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
          <label
            onClick={() => setMessage("")}
            htmlFor="topUp-modal-large"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Topup</h3>
          <p className="py-4">Enter the amount of money, and click submit</p>
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
                    type="number"
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
                <div className="flex justify-end mt-10">
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
        </label>
      </label> */}
    </nav>
  );
};

export default Navbar;
