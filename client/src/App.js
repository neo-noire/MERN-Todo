import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom';

import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AuthPage } from './pages/AuthPage';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMe } from "./redux/fetures/auth/authSlice";
import { io } from 'socket.io-client';
import { socketUrl } from "./utils/constant";
import { Profile } from "./pages/Profile/Profile";


function App() {
  const [socket, setSocket] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
    setSocket(io(socketUrl))
  }, [dispatch])

  return (
    <Layout>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<AuthPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
