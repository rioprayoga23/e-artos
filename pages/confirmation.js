import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import http from "../helpers/http";
import { transactionsAction } from "../redux/action/transactions";

const confirmation = () => {
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const recipientId = useSelector((state) => state.transactions.recipientId);
  const amount = useSelector((state) => state.transactions.amount);
  const notes = useSelector((state) => state.transactions.notes);
  const [recipientData, setRecipientData] = useState();
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

  const checkPin = async (e) => {
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
    if (pin === userData?.pin) {
      const cb = () => {
        router.push("/status");
      };

      const value = {
        recipientId,
        amount,
        notes,
        pin,
      };

      dispatch(transactionsAction({ value, token, cb }));
      // setMessage("Transfer Success");
    } else {
      setMessage("Pin not valid");
    }
  };

  const getRecipient = async () => {
    const { data } = await http(token).get(
      `/transactions/recipient/${recipientId}`
    );
    setRecipientData(data.results);
  };

  const getCurrentUser = async () => {
    const { data } = await http(token).get("/profile");
    setUserData(data.results);
  };

  useEffect(() => {
    getRecipient();
  }, [recipientId]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <div className="mb-10">
          <h3 className="font-semibold mb-5">Transfer To</h3>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg cursor-pointer">
            <div className="flex gap-3 items-center">
              {recipientData?.picture ? (
                <img
                  src={`https://68xkph-8888.preview.csb.app/upload/${recipientData?.picture}`}
                  alt=""
                  className="w-[60px] h-[60px] rounded-lg"
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-lg bg-gray-200"></div>
              )}
              <div>
                <h3 className="font-semibold">{`${recipientData?.firstName} ${recipientData?.lastName}`}</h3>
                <p className="text-sm">{recipientData?.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="font-semibold mb-5 mt-10">Details</h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Amount</p>
              <h3 className="font-semibold">{amount}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Balance Left</p>
              <h3 className="font-semibold">{userData?.balance - amount}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Date & Time</p>
              <h3 className="font-semibold">
                {new Date()
                  .toLocaleString("default", {
                    month: "long",
                  })
                  .concat(" ", new Date().getDay(), ", ")
                  .concat(new Date().getFullYear())
                  .concat("-", new Date().getHours(), ".")
                  .concat(new Date().getMinutes())}
              </h3>
            </div>
          </div>
          <div className="flex justify-between items-center shadow-md p-4 rounded-lg">
            <div>
              <p className="text-sm">Notes</p>
              <h3 className="font-semibold">{notes}</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <label
            className="btn bg-primary hover:bg-primary px-6 md:w-full"
            htmlFor="pin-confirmation-modal"
          >
            Continue
          </label>
        </div>
      </div>

      <input
        type="checkbox"
        id="pin-confirmation-modal"
        className="modal-toggle"
      />
      <label
        htmlFor="pin-confirmation-modal"
        className="modal md:modal-bottom cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Enter PIN to Transfer</h3>
          <p className="py-4">
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </p>
          {message === "Pin not valid" ? (
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
          <form onSubmit={checkPin}>
            <div className="grid grid-cols-6 gap-5 mt-5 md:gap-2 lg:gap-2 xl:gap-3 md:px-0 lg:px-9 xl:px-16">
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

            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="btn bg-primary hover:bg-primary cursor-pointer"
              >
                Continue
              </button>
            </div>
          </form>
        </label>
      </label>
    </MainLayout>
  );
};

export default confirmation;
