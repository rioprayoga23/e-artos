import React from "react";
import { Mail } from "react-feather";
import WithNoAuth from "../components/HOC/WithNoAuth";
import MainLayoutAuth from "../components/layouts/MainLayoutAuth";

const ForgotPassword = () => {
  return (
    <MainLayoutAuth title="Forgot Password">
      <>
        <article className="flex w-[40%] md:w-full lg:w-full">
          <div className="px-20 pt-16 md:px-9 lg:px-24 xl:py-10">
            <h1 className="text-2xl font-semibold mb-6 hidden lg:block">
              Forgot Password
            </h1>
            <h1 className="text-2xl font-semibold mb-6">
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </h1>
            <p className="leading-7 text-[#3A3D4299] text-base">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </p>
            <div className="relative mt-14">
              <Mail className="absolute" style={{ color: "#A9A9A999" }} />
              <input
                type="email"
                className="w-full border-b-2 focus:outline-none px-12 pb-2"
                placeholder="Enter your e-mail"
              />
            </div>

            <button className="btn bg-primary w-full mt-10 hover:bg-primary">
              Confirm
            </button>
          </div>
        </article>
      </>
    </MainLayoutAuth>
  );
};

export default WithNoAuth(ForgotPassword);
