import Link from "next/link";
import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "react-feather";
import MainLayoutAuth from "../components/layouts/MainLayoutAuth";

export default function Login() {
  const [type, setType] = useState("password");

  const showPassword = () => {
    type === "password" ? setType("text") : setType("password");
  };

  return (
    <MainLayoutAuth title="Login">
      <>
        <article className="flex w-[40%] md:w-full lg:h-screen lg:overflow-scroll lg:w-full">
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
            <div className="relative mt-14">
              <Mail className="absolute" style={{ color: "#A9A9A999" }} />
              <input
                type="email"
                className="w-full border-b-2 focus:outline-none px-12 pb-2"
                placeholder="Enter your e-mail"
              />
            </div>
            <div className="relative mt-14 ">
              <Lock className="absolute" style={{ color: "#A9A9A999" }} />
              <input
                type={type}
                className="w-full border-b-2 focus:outline-none px-12 pb-2"
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
            <div className="flex justify-end mt-5">
              <Link href="/forgot-password" className="text-primary">
                Forgot password?
              </Link>
            </div>

            <button className="btn bg-primary w-full mt-10 hover:bg-primary">
              Login
            </button>

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
