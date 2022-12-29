import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemNotification from "../components/ItemNotification";
import MainLayout from "../components/layouts/MainLayout";
import http from "../helpers/http";

const Notifications = () => {
  const token = useSelector((state) => state.auth.token);
  const [notification, setNotification] = useState([]);

  const getNotifications = async () => {
    const { data } = await http(token).get(
      "/transactions/notification?page=1&limit=100"
    );
    setNotification(data.results);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white md:p-3 rounded-lg shadow-md flex flex-col gap-5 p-7">
        {notification?.map((data) => {
          return <ItemNotification data={data} key={data.id} />;
        }, [])}
      </div>
    </MainLayout>
  );
};

export default notifications;
