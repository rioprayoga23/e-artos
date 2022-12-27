import React, { useState } from "react";
import { Phone } from "react-feather";
import MainLayout from "../components/layouts/MainLayout";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone";
import { useSelector } from "react-redux";
import http from "../helpers/http";

YupPassword(Yup); // extend yup

const editPhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Required")
    .phone("ID", true, "Invalid phone number"),
});

const ManagePhoneNumber = () => {
  const [message, setMessage] = useState(true);

  const token = useSelector((state) => state.auth.token);

  const editPhone = async (value) => {
    const form = new URLSearchParams({
      phoneNumber: value.phoneNumber,
    });

    try {
      const { data } = await http(token).post("/profile/phone-number", form);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <h3 className="font-semibold mb-5">Edit Phone Number</h3>
        <div className="w-[45%] md:w-full lg:w-[75%]">
          <p className="text-[#7A7886]">
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </p>
        </div>
        <div className="px-48 pb-40 mt-20 md:px-0 md:pb-10 lg:px-9">
          <Formik
            initialValues={{
              phoneNumber: "",
            }}
            validationSchema={editPhoneSchema}
            onSubmit={(value) => editPhone(value)}
          >
            {({ errors, touched, dirty }) => (
              <Form>
                <div className="relative mt-14">
                  <Phone className="absolute" style={{ color: "#A9A9A999" }} />
                  <Field
                    type="number"
                    name="phoneNumber"
                    className={`w-full border-b-2 focus:outline-none px-12 pb-2 bg-white  ${
                      errors.phoneNumber &&
                      touched.phoneNumber &&
                      "border-red-500"
                    } ${
                      !errors.phoneNumber &&
                      touched.phoneNumber &&
                      "border-purple-500"
                    }`}
                    placeholder="+62 896785545778"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.phoneNumber}
                    </span>
                  </label>
                )}

                {message && (
                  <div className="text-center mt-10">
                    <p className="text-base font-semibold text-green-500">
                      {message}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!dirty}
                  className="btn bg-primary hover:bg-primary mt-14 w-full"
                >
                  Edit Phone Number
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagePhoneNumber;
