import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";

import "react-loading-skeleton/dist/skeleton.css";

const PersonalInfo = () => {
  const { firstName } = useSelector((state) => state.profile);
  const { lastName } = useSelector((state) => state.profile);
  const { email } = useSelector((state) => state.profile);
  const { phoneNumber } = useSelector((state) => state.profile);

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <h3 className="font-semibold mb-5">Personal Information</h3>
        <div className="w-[45%] md:w-full lg:w-[75%]">
          <p className="text-[#7A7886]">
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div className="w-[60%]">
              <p className="text-sm">First Name</p>
              <h3 className="font-semibold">{firstName}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div className="w-[60%]">
              <p className="text-sm">Last Name</p>
              <h3 className="font-semibold">{lastName}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div className="w-[60%]">
              <p className="text-sm">Verified E-mail</p>
              <h3 className="font-semibold">{email}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div className="w-[60%]">
              <div className="flex-1">
                <p className="text-sm">Phone Number</p>
                <h3 className="font-semibold">
                  {phoneNumber ? `+62${phoneNumber}` : phoneNumber}
                </h3>
              </div>
            </div>
            <Link href="/manage-phone-number" className="text-purple-600">
              Manage
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalInfo;
