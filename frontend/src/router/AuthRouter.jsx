import {Routes, Route} from 'react-router-dom';

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

const AuthRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/*' element={<NotFound/>}></Route>
        </Routes>
    </>
  );
};

export default AuthRouter;
