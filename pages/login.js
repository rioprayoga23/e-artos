import Link from "next/link";
import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "react-feather";
import MainLayoutAuth from "../components/layouts/MainLayoutAuth";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const LoginSchema = Yup.object().shape({
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

export default function Login() {
  const [type, setType] = useState("password");

  const showPassword = () => {
    type === "password" ? setType("text") : setType("password");
  };

  const doLogin = (value) => {
    console.log(value);
  };

  return (
    <MainLayoutAuth title="Login">
      <>
        <article className="flex w-[40%] md:w-full lg:w-full overflow-y-scroll h-screen">
          <div className="px-20 pt-16 md:px-9 lg:px-24 xl:pt-6">
            <h1 className="text-2xl font-semibold mb-6 hidden lg:block">
              Login
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
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(value) => doLogin(value)}
            >
              {({ errors, touched, dirty }) => (
                <Form>
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

                  <button
                    type="submit"
                    disabled={!dirty}
                    className="btn bg-primary w-full mt-10 hover:bg-primary"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center mt-5 pb-10">
              Don’t have an account?
              <Link href="/sign-up" className="text-primary">
                Let’s Sign Up
              </Link>
            </div>
          </div>
        </article>
      </>
    </MainLayoutAuth>
  );
}
