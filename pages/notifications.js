import React from "react";
import ItemNotification from "../components/ItemNotification";
import MainLayout from "../components/layouts/MainLayout";

const notifications = () => {
  return (
    <MainLayout>
      <div className="bg-white md:p-3 rounded-lg shadow-md flex flex-col gap-5 p-7 h-screen">
        <ItemNotification />
        <ItemNotification />
        <ItemNotification />
      </div>
    </MainLayout>
  );
};

export default notifications;
