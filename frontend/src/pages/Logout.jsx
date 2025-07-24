import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "@/redux/auth/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/redux/auth/selector";
import Loading from "../components/Loader/Loading";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function asyncLogout() {
    dispatch(logoutAction());
  }

  useEffect(() => {
    asyncLogout();
    navigate('/');
  }, []);

  return (
    <>
      <Loading isLoad={isLoading}>Logout</Loading>
    </>
  );
}
