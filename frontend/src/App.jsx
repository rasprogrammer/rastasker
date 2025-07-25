import SystemApp from "./apps/SystemApp";
import { BrowserRouter } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { createContext, useState } from "react";

import { AuthContextProvider } from "@/context/AuthContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Toaster className="p-5 bg-blue-100" position="top-right" />
      <Provider store={store}>
        <SystemApp />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
