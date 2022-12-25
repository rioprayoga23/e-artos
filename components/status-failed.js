import React from "react";
import { X } from "react-feather";

const StatusFailed = () => {
  return (
    <div className="flex flex-col items-center pt-10 gap-5">
      <div className="p-4 bg-red-500 rounded-full w-fit">
        <X size="30px" color="white" />
      </div>
      <h3 className="font-semibold text-xl">Transfer Failed</h3>
      <div className="px-20 text-center md:px-0">
        <p className="text-[#7A7886]">
          We can’t transfer your money at the moment, we recommend you to check
          your internet connection and try again.
        </p>
      </div>
    </div>
  );
};

export default StatusFailed;
