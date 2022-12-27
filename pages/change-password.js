import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import http from "../helpers/http";
import { useSelector } from "react-redux";

YupPassword(Yup); // extend yup

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .password()
    .min(8, "Min length 8")
    .minLowercase(1, "Min Lowecase 1")
    .minUppercase(1, "Min Uppercase 1")
    .minSymbols(1, "Min Symbols 1")
    .minNumbers(1, "Min Numbers 1")
    .required("Required"),
  confirmPassword: Yup.string()
    .password()
    .min(8, "Min length 8")
    .minLowercase(1, "Min Lowecase 1")
    .minUppercase(1, "Min Uppercase 1")
    .minSymbols(1, "Min Symbols 1")
    .minNumbers(1, "Min Numbers 1")
    .required("Required"),
});

const ChangePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const [type3, setType3] = useState("password");
  const [message, setMessage] = useState("");

  const showPassword = () => {
    type === "password" ? setType("text") : setType("password");
  };

  const showPassword2 = () => {
    type2 === "password" ? setType2("text") : setType2("password");
  };

  const showPassword3 = () => {
    type3 === "password" ? setType3("text") : setType3("password");
  };

  const doChangePassword = async (value) => {
    const form = new URLSearchParams({
      currentPassword: value.currentPassword,
      newPassword: value.newPassword,
      confirmPassword: value.confirmPassword,
    });

    try {
      const { data } = await http(token).post("/profile/change-password", form);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <h3 className="font-semibold mb-5">Change Password</h3>
        <div className="w-[45%] md:w-full lg:w-[75%]">
          <p className="text-[#7A7886]">
            You must enter your current password and then type your new password
            twice.
          </p>
        </div>
        <div className="flex flex-col px-48 pb-20 md:px-0 xl:px-20">
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={(value) => doChangePassword(value)}
          >
            {({ errors, touched, dirty }) => (
              <Form>
                <div className="relative mt-14 ">
                  <Lock className="absolute" style={{ color: "#A9A9A999" }} />
                  <Field
                    type={type}
                    name="currentPassword"
                    className={`w-full border-b-2 focus:outline-none px-12 pb-2 bg-white ${
                      errors.currentPassword &&
                      touched.currentPassword &&
                      "border-red-500"
                    } ${
                      !errors.currentPassword &&
                      touched.currentPassword &&
                      "border-purple-500"
                    }`}
                    placeholder="Enter your current password"
                  />
                  {type === "password" ? (
                    <EyeOff
                      className="absolute right-0 top-1 cursor-pointer"
                      style={{ color: "#A9A9A999" }}
                      onClick={showPassword}
                    />
                  ) : (
                    <Eye
                      className="absolute right-0 top-1 cursor-pointer"
                      style={{ color: "#A9A9A999" }}
                      onClick={showPassword}
                    />
                  )}
                </div>
                {errors.currentPassword && touched.currentPassword && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.currentPassword}
                    </span>
                  </label>
                )}

                <div className="relative mt-14 ">
                  <Lock className="absolute" style={{ color: "#A9A9A999" }} />
                  <Field
                    type={type2}
                    name="newPassword"
                    className={`w-full border-b-2 focus:outline-none px-12 pb-2 bg-white ${
                      errors.newPassword &&
                      touched.newPassword &&
                      "border-red-500"
                    } ${
                      !errors.newPassword &&
                      touched.newPassword &&
                      "border-purple-500"
                    }`}
                    placeholder="Enter your password"
                  />
                  {type2 === "password" ? (
                    <EyeOff
                      className="absolute right-0 top-1 cursor-pointer"
                      style={{ color: "#A9A9A999" }}
                      onClick={showPassword2}
                    />
                  ) : (
                    <Eye
                      className="absolute right-0 top-1 cursor-pointer"
                      style={{ color: "#A9A9A999" }}
                      onClick={showPassword2}
                    />
                  )}
                </div>
                {errors.newPassword && touched.newPassword && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.newPassword}
                    </span>
                  </label>
                )}

                <div className="relative mt-14 ">
                  <Lock className="absolute" style={{ color: "#A9A9A999" }} />
                  <Field
                    type={type3}
                    name="confirmPassword"
                    className={`w-full border-b-2 focus:outline-none px-12 pb-2 bg-white ${
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      "border-red-500"
                    } ${
                      !errors.confirmPassword &&
                      touched.confirmPassword &&
                      "border-purple-500"
                    }`}
                    placeholder="Enter your password"
                  />
                  {type3 === "password" ? (
                    <EyeOff
                      className="absolute right-0 top-1 cursor-pointer"
                      style={{ color: "#A9A9A999" }}
                      onClick={showPassword3}
                    />
                  ) : (
                    <Eye
                      className="absolute right-0 top-1 cursor-pointer"
                      style={{ color: "#A9A9A999" }}
                      onClick={showPassword3}
                    />
                  )}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.confirmPassword}
                    </span>
                  </label>
                )}

                {message !== "Data updated!" ? (
                  <div className="text-center mt-10">
                    <p className="text-base font-semibold text-red-500">
                      {message}
                    </p>
                  </div>
                ) : (
                  <div className="text-center mt-10">
                    <p className="text-base font-semibold text-green-500">
                      {message}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!dirty}
                  className="btn bg-primary w-full mt-10 hover:bg-primary"
                >
                  Change Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChangePassword;
