import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "@/redux/auth/actions";
import { useDispatch } from "react-redux";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasLogedOut = useRef(false);

  useEffect(() => {
    if (!hasLogedOut.current) {
      hasLogedOut.current = true;
      dispatch(logoutAction()).then(() => {
        navigate("/");
      });
    }
  }, []);

  return <>{/* <Loading isLoad={isLoading}>Logout</Loading> */}</>;
}
