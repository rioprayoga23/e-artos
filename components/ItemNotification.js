import React from "react";
import { ArrowDown } from "react-feather";

const ItemNotification = () => {
  return (
    <div className="flex py-3 px-5 shadow-md rounded-lg gap-3 bg-white">
      <ArrowDown color="green" />
      <div>
        <p className="text-[#7A7A7A]">Accept from Joshua Lee</p>
        <h3 className="text-lg font-semibold">Rp220.000</h3>
      </div>
    </div>
  );
};

export default ItemNotification;
