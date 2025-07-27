import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "@/redux/auth/types";

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      const data = { result: { token: token } };

      const auth_state = {
        current: data.result,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
      };
      window.localStorage.setItem("auth", JSON.stringify(auth_state));
      window.localStorage.removeItem("isLogout");
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        payload: data.result,
      });

      navigate('/');
    }
  }, [token]);

  return <></>;
}
