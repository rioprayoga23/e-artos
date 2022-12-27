import React, { useRef, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { useSelector } from "react-redux";
import http from "../helpers/http";

const NewPin = () => {
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState("");

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
      newPin: pin,
    });

    try {
      const { data } = await http(token).post("/profile/change-pin", form);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <h3 className="font-semibold mb-5">Change PIN</h3>
        <div className="w-[45%] md:w-full lg:w-[75%]">
          <p className="text-[#7A7886]">
            Type your new 6 digits security PIN to use in Fazzpay.
          </p>
        </div>
        <form onSubmit={createPin}>
          <div className="grid grid-cols-6 gap-5 mt-20 md:gap-2 lg:gap-2 xl:gap-3 px-48 md:px-0 lg:px-9 xl:px-16">
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

          {message !== "Data updated!" ? (
            <div className="text-center mt-10">
              <p className="text-base font-semibold text-red-500">{message}</p>
            </div>
          ) : (
            <div className="text-center mt-10">
              <p className="text-base font-semibold text-green-500">
                {message}
              </p>
            </div>
          )}

          <div className="px-48 pb-40 md:px-0 lg:px-9 xl:px-16">
            <button
              type="submit"
              className="btn bg-primary hover:bg-primary mt-14 w-full"
            >
              continue
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewPin;
