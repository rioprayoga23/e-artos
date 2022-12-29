import React, { useEffect, useState } from "react";
import { Divide, Edit2 } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import http from "../helpers/http";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { chooseAmount } from "../redux/reducers/transactions";
import { useRouter } from "next/router";

const amountSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Required")
    .test(
      "Is positive?",
      "The amount must be greater than 0!",
      (value) => value > 0
    ),
  notes: Yup.string().required("Required"),
});

const amount = () => {
  const token = useSelector((state) => state.auth.token);
  const recipientId = useSelector((state) => state.transactions.recipientId);
  const [userData, setUserData] = useState("");
  const [recipientData, setRecipientData] = useState();
  const [message, setMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

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

  const transfer = (value) => {
    if (value.amount > userData?.balance) {
      setMessage("The balance is not enough");
    } else {
      dispatch(chooseAmount({ amount: value.amount, notes: value.notes }));
      router.push("/confirmation");
    }
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
          <h3 className="font-semibold mb-5">Transfer Money</h3>
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
        <div className="w-[40%] py-10 md:w-full lg:w-[80%]">
          <p className="text-[#7A7886]">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </p>
        </div>
        <Formik
          initialValues={{
            amount: "",
            notes: "",
          }}
          validationSchema={amountSchema}
          onSubmit={transfer}
        >
          {({ errors, touched, dirty }) => (
            <Form>
              <div className="flex flex-col items-center justify-center">
                {message && (
                  <div className="alert alert-error shadow-lg w-[50%]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{message}</span>
                    </div>
                  </div>
                )}
                <div>
                  <Field
                    name="amount"
                    type="number"
                    className={`text-primary py-7 placeholder:text-4xl text-4xl outline-none text-center md:w-[180px] ${
                      errors.amount && touched.amount && "border-red-500"
                    } ${
                      !errors.amount && touched.amount && "border-purple-500"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.amount && touched.amount && (
                    <div className="flex items-center justify-center">
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.amount}
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold">
                  Rp{`${userData?.balance}`} Available
                </h3>
                <div className="relative py-14">
                  <Edit2 className="absolute" style={{ color: "#A9A9A999" }} />
                  <Field
                    name="notes"
                    type="text"
                    className={`w-full border-b-2 focus:outline-none px-12 pb-2 invalid:border-primary ${
                      errors.notes && touched.notes && "border-red-500"
                    } ${!errors.notes && touched.notes && "border-purple-500"}`}
                    placeholder="Add some notes"
                  />
                  {errors.notes && touched.notes && (
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors.notes}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!dirty}
                  className="btn bg-primary hover:bg-primary px-6 md:w-full"
                >
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default amount;
