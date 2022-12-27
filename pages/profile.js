import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowRight, Edit2, LogOut } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import http from "../helpers/http";
import { logout } from "../redux/reducers/auth";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const profile = () => {
  const [userData, setUserData] = useState();
  const token = useSelector((state) => state.auth.token);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logout());
    Router.push("/login");
  };

  const getCurrentUser = async () => {
    const { data } = await http(token).get("/profile");
    setUserData(data.results);
  };

  if (selectedImage) {
    const uploadFile = async () => {
      const { data } = await http(token).post(
        "/profile",
        { picture: selectedImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(true);
      setMessage(data.message);
    };
    uploadFile();
  }
  useEffect(() => {
    getCurrentUser();
  }, [success]);

  return (
    <MainLayout>
      <div className="bg-white flex flex-col items-center justify-center py-14">
        <div className="py-5">
          {message && (
            <div className="text-base text-green-500 font-semibold">
              {message}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {userData?.picture ? (
            <img
              src={`https://68xkph-8888.preview.csb.app/upload/${userData?.picture}`}
              alt=""
              className="w-[90px] h-[90px] mb-3 rounded-lg"
            />
          ) : (
            <img
              src="img/profile2.png"
              alt=""
              className="w-[90px] h-[90px] mb-3 rounded-lg"
            />
          )}

          <div className="flex gap-3 text-[#7A7886] items-center justify-center">
            <input
              type="file"
              onChange={(event) => setSelectedImage(event.target.files[0])}
            ></input>
          </div>
        </div>
        <div className="w-44 text-center">
          <h1 className="text-xl font-semibold mt-4 mb-2">
            {userData?.firstName.concat(" ", userData?.lastName) || (
              <Skeleton />
            )}
          </h1>
        </div>

        <div className="w-44 text-center">
          <h1 className="text-[#7A7886]">
            {userData?.phoneNumber || <Skeleton />}
          </h1>
        </div>

        <div className="text-[#4D4B57] font-semibold text-lg md:text-base mt-16 flex flex-col gap-5">
          <Link href="/personal-info">
            <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p>Personal Information</p>
              <ArrowRight />
            </div>
          </Link>
          <Link href="/change-password">
            <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p>Change Password</p>
              <ArrowRight />
            </div>
          </Link>
          <Link href="/change-pin">
            <div className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center">
              <p>Change PIN</p>
              <ArrowRight />
            </div>
          </Link>
          <div
            className="bg-[#E5E8ED] w-96 md:w-full p-4 rounded-lg shadow-sm flex justify-between items-center cursor-pointer"
            onClick={doLogout}
          >
            <p>Logout</p>
            <LogOut />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default profile;
