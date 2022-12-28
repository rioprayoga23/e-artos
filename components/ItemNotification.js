import React from "react";
import { ArrowDown, ArrowUp } from "react-feather";

const ItemNotification = ({ data }) => {
  return (
    <div className="flex py-3 px-5 shadow-md rounded-lg gap-3 bg-white items-center">
      {data.type === "CREDIT" ? (
        <ArrowDown color="green" />
      ) : (
        <ArrowUp color="red" />
      )}
      <div>
        <p className="text-[#7A7A7A]">{data.notes}</p>
        <h3 className="text-lg font-semibold">Rp{data.amount}</h3>
      </div>
    </div>
  );
};

export default ItemNotification;
