import React from "react";
import { Phone } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";

const ManagePhoneNumber = () => {
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
          <div className="relative mt-14">
            <Phone className="absolute" style={{ color: "#A9A9A999" }} />
            <input
              type="email"
              className="w-full border-b-2 focus:outline-none px-12 pb-2"
              placeholder="+62 081393877946"
            />
          </div>
          <div className="btn bg-primary hover:bg-primary mt-14 w-full">
            Edit Phone Number
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagePhoneNumber;
