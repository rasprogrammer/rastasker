import Login from "@/pages/Login";
import AuthRouter from "@/router/AuthRouter";
import AppRouter from "@/router/AppRouter";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/auth/selector";

const SystemApp = () => {
  const { isLoggedIn } = useSelector(selectAuth);
  if (isLoggedIn) {
    return (
      <>
        <AppRouter />
      </>
    );
  } else {
    return (
      <>
        <AuthRouter />
      </>
    );
  }
};

export default SystemApp;
