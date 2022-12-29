import React from "react";
import { Check } from "react-feather";

const StatusSuccess = () => {
  return (
    <div className="flex flex-col items-center pt-10 gap-5">
      <div className="p-4 bg-success rounded-full w-fit">
        <Check size="30px" color="white" />
      </div>
      <h3 className="font-semibold text-xl">Transfer Success</h3>
    </div>
  );
};

export default StatusSuccess;
