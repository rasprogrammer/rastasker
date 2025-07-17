
import SystemApp from "./apps/SystemApp";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <SystemApp />
    </BrowserRouter>
  );
};

export default App;
