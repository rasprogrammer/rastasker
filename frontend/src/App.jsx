import SystemApp from "./apps/SystemApp";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { createContext, useState } from "react";

import { AuthContextProvider } from "@/context/AuthContext";
import MyComponent from "./practice/MyComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (true) {
    return <MyComponent />;
  } else {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Toaster className="p-5 bg-blue-100" position="top-right" />
          <SystemApp />
        </Provider>
      </BrowserRouter>
    );
  }
};

export default App;
