import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

const ChangePassword = () => {
  const [type, setType] = useState("password");

  const showPassword = () => {
    type === "password" ? setType("text") : setType("password");
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
          <div className="relative mt-14 ">
            <Lock className="absolute" style={{ color: "#A9A9A999" }} />
            <input
              type={type}
              className="w-full border-b-2 focus:outline-none px-12 pb-2"
              placeholder="Current password"
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
          <div className="relative mt-14 ">
            <Lock className="absolute" style={{ color: "#A9A9A999" }} />
            <input
              type={type}
              className="w-full border-b-2 focus:outline-none px-12 pb-2"
              placeholder="New password"
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
          <div className="relative mt-14 ">
            <Lock className="absolute" style={{ color: "#A9A9A999" }} />
            <input
              type={type}
              className="w-full border-b-2 focus:outline-none px-12 pb-2"
              placeholder="Repeat new password"
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
          <div className="btn bg-primary hover:bg-primary mt-14">
            Change Password
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChangePassword;
