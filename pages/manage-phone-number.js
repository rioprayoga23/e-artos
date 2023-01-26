import React, { useState } from "react";
import { Phone } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone";
import { useDispatch, useSelector } from "react-redux";
import http from "../helpers/http";
import Router from "next/router";
import { getProfileAction } from "../redux/action/profile";

YupPassword(Yup); // extend yup

const editPhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Required")
    .phone("ID", true, "Invalid phone number"),
});

const ManagePhoneNumber = () => {
  const token = useSelector((state) => state.auth.token);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const editPhone = async (value) => {
    const form = new URLSearchParams({
      phoneNumber: value.phoneNumber,
    });
    try {
      setIsLoading(true);
      const { data } = await http(token).post("/profile/phone-number", form);
      setMessage(data.message);
      setIsLoading(false);
      await dispatch(getProfileAction());
      setTimeout(() => {
        Router.push("/profile");
        setMessage("");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.response.data.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <h3 className="font-semibold mb-5">Edit Phone Number</h3>
        <div className="w-[45%] md:w-full lg:w-[75%]">
          <p className="text-[#7A7886]">
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </p>
        </div>
        <div className="px-48 pb-40 mt-20 md:px-0 md:pb-10 lg:px-9">
          {message && (
            <div className="alert alert-success shadow-lg w-[100%]">
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}
          <Formik
            initialValues={{
              phoneNumber: "",
            }}
            validationSchema={editPhoneSchema}
            onSubmit={(value) => editPhone(value)}
          >
            {({ errors, touched, dirty }) => (
              <Form>
                <div className="relative mt-14">
                  <Phone className="absolute" style={{ color: "#A9A9A999" }} />
                  <Field
                    type="number"
                    name="phoneNumber"
                    className={`w-full border-b-2 focus:outline-none px-12 pb-2 bg-white  ${
                      errors.phoneNumber &&
                      touched.phoneNumber &&
                      "border-red-500"
                    } ${
                      !errors.phoneNumber &&
                      touched.phoneNumber &&
                      "border-purple-500"
                    }`}
                    placeholder="Write your phone number"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.phoneNumber}
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  disabled={!dirty || isLoading}
                  className={`btn bg-primary hover:bg-primary mt-14 w-full ${
                    isLoading && "loading"
                  }`}
                >
                  Edit Phone Number
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagePhoneNumber;
