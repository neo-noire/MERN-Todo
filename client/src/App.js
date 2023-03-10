import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom';

import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AuthPage } from './pages/AuthPage';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/fetures/auth/authSlice";



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<AuthPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
