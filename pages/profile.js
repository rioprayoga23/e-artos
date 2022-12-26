import Link from "next/link";
import React from "react";
import { ArrowRight, Edit2, LogOut } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

const profile = () => {
  return (
    <MainLayout>
      <div className="bg-white flex flex-col items-center justify-center py-14">
        <div className="flex flex-col items-center">
          <img
            src="img/profile2.png"
            alt=""
            className="w-[90px] h-[90px] mb-3"
          />
          <div className="flex gap-3 text-[#7A7886] items-center">
            <Edit2 size="15px" style={{ color: "#7A7886" }} />
            <p>Edit</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold mt-4 mb-2">Robert Chandler</h1>
        <p className="text-[#7A7886]">+62 813-9387-7946</p>
        <div className="text-[#4D4B57] font-semibold text-lg md:text-base mt-16 flex flex-col gap-5">
          <Link href="/personal-info">
            <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p>Personal Information</p>
              <ArrowRight />
            </div>
          </Link>
          <Link href="/personal-info">
            <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p>Change Password</p>
              <ArrowRight />
            </div>
          </Link>
          <Link href="/personal-info">
            <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p>Change PIN</p>
              <ArrowRight />
            </div>
          </Link>
          <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
            <p>Logout</p>
            <LogOut />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default profile;
