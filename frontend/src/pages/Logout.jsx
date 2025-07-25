import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "@/redux/auth/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/redux/auth/selector";
import Loading from "../components/Loader/Loading";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDispatched, setIsDispatched] = useState(false);
  const { isLoading, isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (!isDispatched) {
      setIsDispatched(true);
      dispatch(logoutAction()).then(() => {
        navigate("/");
      });
    }
  }, []);

  return <>{/* <Loading isLoad={isLoading}>Logout</Loading> */}</>;
}
