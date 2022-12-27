import React, { useRef, useState } from "react";
import { Check } from "react-feather";
import { useSelector } from "react-redux";
import MainLayoutAuth from "../components/layouts/MainLayoutAuth";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import http from "../helpers/http";

export default function Pin() {
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState("");

  const decoded = jwt_decode(token);

  const pin1 = useRef(null);
  const pin2 = useRef(null);
  const pin3 = useRef(null);
  const pin4 = useRef(null);
  const pin5 = useRef(null);
  const pin6 = useRef(null);

  const changeInput = (e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
    const inputPin = {
      1: pin1,
      2: pin2,
      3: pin3,
      4: pin4,
      5: pin5,
      6: pin6,
    };
    const currentInput = Number(e.target.name);
    if (e.target.value.length) {
      inputPin[currentInput + 1]?.current?.focus();
    } else {
      inputPin[currentInput - 1]?.current?.focus();
      if (currentInput <= 6) {
        for (let i = currentInput; i <= 6; i++) {
          inputPin[i].current.value = "";
        }
      }
    }
  };

  const createPin = async (e) => {
    e.preventDefault();
    const inputPin = [];
    const inputPin1 = e.target.pin1.value;
    const inputPin2 = e.target.pin2.value;
    const inputPin3 = e.target.pin3.value;
    const inputPin4 = e.target.pin4.value;
    const inputPin5 = e.target.pin5.value;
    const inputPin6 = e.target.pin6.value;

    inputPin.push(
      inputPin1,
      inputPin2,
      inputPin3,
      inputPin4,
      inputPin5,
      inputPin6
    );
    const pin = inputPin.join("").toString();

    const form = new URLSearchParams({
      userId: decoded?.id,
      pin,
    });

    try {
      const { data } = await http(token).post("/auth/set-pin", form);
      setMessage(data.results.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayoutAuth title="Pin">
      <>
        {!message ? (
          <article className="flex w-[40%] md:w-full lg:w-full">
            <div className="px-20 pt-16 md:px-9 lg:px-32 xl:py-10 xl:px-16">
              <h1 className="text-2xl font-semibold mb-6 hidden lg:block">
                Create Pin
              </h1>
              <h1 className="text-2xl font-semibold mb-6">
                Secure Your Account, Your Wallet, and Your Data With 6 Digits
                PIN That You Created Yourself.
              </h1>
              <p className="leading-7 text-[#3A3D4299] text-base">
                Create 6 digits pin to secure all your money and your data in
                FazzPay app. Keep it secret and don’t tell anyone about your
                FazzPay account password and the PIN.
              </p>
              <form onSubmit={createPin}>
                <div className="grid grid-cols-6 gap-5 mt-10 md:gap-2 lg:gap-2 xl:gap-3">
                  <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                    <input
                      type="number"
                      name="1"
                      id="pin1"
                      onChange={changeInput}
                      ref={pin1}
                      className="border-b focus:outline-none w-full text-2xl text-center"
                      required
                    />
                  </div>
                  <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                    <input
                      type="number"
                      name="2"
                      id="pin2"
                      onChange={changeInput}
                      ref={pin2}
                      className="border-b focus:outline-none w-full text-2xl text-center"
                      required
                    />
                  </div>
                  <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                    <input
                      type="number"
                      name="3"
                      id="pin3"
                      onChange={changeInput}
                      ref={pin3}
                      className="border-b focus:outline-none w-full text-2xl text-center"
                      required
                    />
                  </div>
                  <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                    <input
                      type="number"
                      name="4"
                      id="pin4"
                      onChange={changeInput}
                      ref={pin4}
                      className="border-b focus:outline-none w-full text-2xl text-center"
                      required
                    />
                  </div>
                  <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                    <input
                      type="number"
                      name="5"
                      id="pin5"
                      onChange={changeInput}
                      ref={pin5}
                      className="border-b focus:outline-none w-full text-2xl text-center"
                      required
                    />
                  </div>
                  <div className="border px-2 pt-4 md:pt-2 pb-2 rounded-md w-full">
                    <input
                      type="number"
                      name="6"
                      id="pin6"
                      onChange={changeInput}
                      ref={pin6}
                      className="border-b focus:outline-none w-full text-2xl text-center"
                      required
                    />
                  </div>
                </div>
                <button className="btn bg-primary w-full mt-10 hover:bg-primary">
                  Confirm
                </button>
              </form>
            </div>
          </article>
        ) : (
          <article className="flex w-[40%] lg:w-full justify-center">
            <div className="px-20 pt-16 md:px-9 lg:px-32">
              <div className="p-4 bg-success rounded-full w-fit">
                <Check size="30px" color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold py-10">
                  Your PIN Was Successfully Created
                </h1>
                <p className="text-[#3A3D4299]">
                  Your PIN was successfully created and you can now access all
                  the features in FazzPay.
                </p>
              </div>
              <Link href="/home">
                <div className="btn bg-primary w-full mt-10 hover:bg-primary">
                  Go To Dashboard
                </div>
              </Link>
            </div>
          </article>
        )}
      </>
    </MainLayoutAuth>
  );
}
