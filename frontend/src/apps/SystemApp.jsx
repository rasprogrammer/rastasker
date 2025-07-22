import Login from "@/pages/Login";
import AuthRouter from "@/router/AuthRouter";
import AppRouter from "@/router/AppRouter";

const SystemApp = () => {
  const isLoggedIn = false;

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
