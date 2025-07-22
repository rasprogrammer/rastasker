import SystemApp from "./apps/SystemApp";
import { BrowserRouter } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster className="p-5 bg-blue-100" position="top-right" />
      <SystemApp />
    </BrowserRouter>
  );
};

export default App;
