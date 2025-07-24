import { Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Team from "@/pages/Team";
import Member from "@/pages/Member";
import Task from "@/pages/Task";
import Logout from "@/pages/Logout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/task" element={<Task />} />
      <Route path="/member" element={<Member />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default AppRouter;
