import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import http from "../helpers/http";

import { ArrowRight, Edit, Edit2, LogOut } from "react-feather";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import MainLayout from "../components/layouts/MainLayout";
import WithAuth from "../components/HOC/WithAuth";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth";
import { clearProfileAction } from "../redux/reducers/profile";
import Image from "next/image";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getProfileAction } from "../redux/action/profile";
import Spinner from "../components/Spinner";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const { firstName } = useSelector((state) => state.profile);
  const { lastName } = useSelector((state) => state.profile);
  const { picture } = useSelector((state) => state.profile);
  const { phoneNumber } = useSelector((state) => state.profile);

  const [message, setMessage] = useState("");
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
    dispatch(clearProfileAction());
  };

  const inputFile = useRef(null);
  const openFile = () => {
    inputFile?.current?.click();
  };

  const doChangePicture = async (e) => {
    const format = ["image/jpg", "image/png", "image/jpeg"];

    const img = e.target.files[0];
    console.log(img);
    if (img) {
      if (format.includes(img.type)) {
        if (img.size < 2000000) {
          let dataForm = new FormData();
          dataForm.append("picture", img);
          try {
            setIsLoadingPicture(true);
            const { data } = await http(token).post("/profile", dataForm, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            await dispatch(getProfileAction());
            setIsLoadingPicture(false);
            MySwal.fire({
              title: <div className="text-primary">{data.message}</div>,
              icon: "success",
            });
          } catch (err) {
            setIsLoadingPicture(false);
            MySwal.fire({
              title: <div className="text-red-500">{err}</div>,
              icon: "error",
            });
          }
        } else {
          MySwal.fire({
            html: (
              <div className="text-red-500">
                Image file size must be less than 2mb
              </div>
            ),
            icon: "error",
          });
        }
      } else {
        MySwal.fire({
          html: <div className="text-red-500">File type must be images</div>,
          icon: "error",
        });
      }
    }
  };

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
          <input
            type="file"
            name="picture"
            id="picture"
            ref={inputFile}
            className="hidden"
            onChange={doChangePicture.bind(this)}
          />
          {picture ? (
            <div className="avatar cursor-pointer relative" onClick={openFile}>
              <div className="w-24 rounded">
                <Image
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + picture}
                  alt="profile"
                  width={100}
                  height={24}
                />
              </div>
              <div className="absolute bottom-[-15px] left-[33px] bg-white p-1">
                <Edit />
              </div>
              {isLoadingPicture && (
                <div className="absolute top-4 left-[29px]">
                  <Spinner />
                </div>
              )}
            </div>
          ) : (
            <div className="cursor-pointer relative" onClick={openFile}>
              <div className="w-24 rounded">
                <Image
                  src="/img/profile.jpg"
                  alt="profile"
                  width={120}
                  height={30}
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div className="absolute bottom-[-15px] left-[33px] bg-white p-1">
                <Edit />
              </div>
            </div>
          )}
        </div>
        <div className="w-44 text-center">
          <h1 className="text-xl font-semibold mt-4 mb-2">
            {firstName.concat(" ", lastName)}
          </h1>
        </div>

        <div className="w-44 text-center">
          <h1 className="text-[#7A7886]">
            {phoneNumber ? `+62${phoneNumber}` : phoneNumber}
          </h1>
        </div>

        <div className="text-[#4D4B57] font-semibold text-lg md:text-base mt-10 flex flex-col gap-5">
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

export default WithAuth(Profile);
