
import {Routes, Route} from 'react-router-dom';

import Dashboard from '@/pages/Dashboard';
import Team from '@/pages/Team';
import Member from '@/pages/Member';
import Task from '@/pages/Task';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/task" element={<Task />} />
      <Route path="/member" element={<Member />} />
    </Routes>
  );
};

export default AppRouter;