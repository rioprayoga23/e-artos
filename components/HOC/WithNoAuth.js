/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const WithNoAuth = (Components) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
      if (token) {
        router.replace("/home");
      }
    }, [router, token]);
    if (!token) {
      return <Components {...props} />;
    }
  };
};

export default WithNoAuth;
