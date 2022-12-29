import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const WithAuth = (Components) => {
  return (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token]);
    if (token) {
      return <Components {...props} />;
    }
  };
};

export default WithAuth;
