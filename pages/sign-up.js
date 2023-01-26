import Link from "next/link";
import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye, User } from "react-feather";
import MainLayoutAuth from "../components/layouts/MainLayoutAuth";

import { useRouter } from "next/router";
import { registerAction } from "../redux/action/auth";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import YupPassword from "yup-password";
import WithNoAuth from "../components/HOC/WithNoAuth";
YupPassword(Yup); // extend yup

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .password()
    .min(8, "Min length 8")
    .minLowercase(1, "Min Lowecase 1")
    .minUppercase(1, "Min Uppercase 1")
    .minSymbols(1, "Min Symbols 1")
    .minNumbers(1, "Min Numbers 1")
    .required("Required"),
});

const SignUp = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const { messageRegister } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const router = useRouter();

  const showPassword = () => {
    type === "password" ? setType("text") : setType("password");
  };

  const cb = () => {
    router.push("/pin");
  };

  const doRegister = (value) => {
    dispatch(registerAction({ value, cb }));
  };

  return (
    <MainLayoutAuth title="SignUp">
      <>
        <article className="w-[40%] md:w-full md:px-0 lg:w-full h-screen items-center">
          <div className="px-20 py-20 md:px-9 lg:px-24 xl:py-10 h-full overflow-y-scroll items-center justify-center">
            <h1 className="text-2xl font-semibold mb-6 hidden lg:block">
              Sign Up
            </h1>
            <h1 className="text-2xl font-semibold mb-6">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </h1>
            <p className="leading-7 text-[#3A3D4299] text-base">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={registerSchema}
              onSubmit={(value) => doRegister(value)}
            >
              {({ errors, touched, dirty }) => (
                <Form>
                  <div className="relative mt-14">
                    <User className="absolute" style={{ color: "#A9A9A999" }} />
                    <Field
                      type="firstName"
                      name="firstName"
                      className={`w-full border-b-2 focus:outline-none px-12 pb-2 ${
                        errors.firstName &&
                        touched.firstName &&
                        "border-red-500"
                      } ${
                        !errors.firstName &&
                        touched.firstName &&
                        "border-purple-500"
                      }`}
                      placeholder="Enter your firstname"
                    />
                    {errors.firstName && touched.firstName && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.firstName}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="relative mt-14">
                    <User className="absolute" style={{ color: "#A9A9A999" }} />
                    <Field
                      type="lastName"
                      name="lastName"
                      className={`w-full border-b-2 focus:outline-none px-12 pb-2 ${
                        errors.lastName && touched.lastName && "border-red-500"
                      } ${
                        !errors.lastName &&
                        touched.lastName &&
                        "border-purple-500"
                      }`}
                      placeholder="Enter your lastname"
                    />
                    {errors.lastName && touched.lastName && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.lastName}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="relative mt-14">
                    <Mail className="absolute" style={{ color: "#A9A9A999" }} />
                    <Field
                      type="email"
                      name="email"
                      className={`w-full border-b-2 focus:outline-none px-12 pb-2 ${
                        errors.email && touched.email && "border-red-500"
                      } ${
                        !errors.email && touched.email && "border-purple-500"
                      }`}
                      placeholder="Enter your e-mail"
                    />
                    {errors.email && touched.email && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.email}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="relative mt-14 ">
                    <Lock className="absolute" style={{ color: "#A9A9A999" }} />
                    <Field
                      type={type}
                      name="password"
                      className={`w-full border-b-2 focus:outline-none px-12 pb-2 ${
                        errors.password && touched.password && "border-red-500"
                      } ${
                        !errors.password &&
                        touched.password &&
                        "border-purple-500"
                      }`}
                      placeholder="Enter your password"
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
                  {errors.password && touched.password && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors.password}
                      </span>
                    </label>
                  )}
                  <div className="flex justify-end mt-5">
                    <Link href="/forgot-password" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  {messageRegister && (
                    <div className="text-center mt-10">
                      <p className="text-base font-semibold text-red-500">
                        {messageRegister}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!dirty || isLoading}
                    className={`btn bg-primary w-full mt-10 hover:bg-primary ${
                      isLoading && "loading"
                    }`}
                  >
                    Sign Up
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center mt-5 pb-10">
              Already have an account?
              <Link href="/login" className="text-primary">
                Let’s Login
              </Link>
            </div>
          </div>
        </article>
      </>
    </MainLayoutAuth>
  );
};

export default SignUp;
