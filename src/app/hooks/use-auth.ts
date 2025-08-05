import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { logout, signin } from "../slice/auth";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import moment from "moment";
import { toast } from 'react-toastify';
import notificationService from "../services/notification";

type UseAuth = {
  isAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<void>;
  logoutFunc: () => void;
  loginLoading: boolean;
};

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state: any) => state.authSlice);

  const isAuthenticated = useCallback((): boolean => {
    
    const token = localStorage.getItem("token");
    const exTime = localStorage.getItem("exTime");
    if (!token || !exTime) {
      return false;
    }
    const tokenExpiredTime: Date = new Date(exTime);
    if (tokenExpiredTime > new Date()) {
      return true;
    }
    // Token expired, clear storage but don't call logoutFunc to avoid infinite loop
    localStorage.removeItem("token");
    localStorage.removeItem("exTime");
    return false;
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
      try {
        const token = unwrapResult(await dispatch(signin({ username, password })));
        localStorage.setItem("token", token.access_token);
        localStorage.setItem("exTime", moment().add(30, "minutes").toString());
        
        // Set account_id for notifications after successful login
        if (token.account_id) {
          console.log('Login successful, setting account_id:', token.account_id);
          notificationService.setAccountId(token.account_id);
        }
        
        // Show success message
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            background: '#4caf50',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
          }
        });
      } catch (error: any) {
        console.error("Login error:", error);
        
        // Extract meaningful error message
        let errorMessage = "Đăng nhập thất bại!";
        
        if (error?.response?.status === 401) {
          errorMessage = "Sai tên đăng nhập hoặc mật khẩu!";
        } else if (error?.response?.status === 400) {
          errorMessage = "Thông tin đăng nhập không hợp lệ!";
        } else if (error?.response?.status === 500) {
          errorMessage = "Lỗi hệ thống, vui lòng thử lại sau!";
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            background: '#f44336',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
          }
        });
      }
    };
    

  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("exTime");
    dispatch(logout());
  };
  return {
    isAuthenticated,
    login,
    logoutFunc,
    loginLoading,
  };
};

export default useAuth;
