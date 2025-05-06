import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { logout, signin } from "../slice/auth";
import useDispatch from "./use-dispatch";
import moment from "moment";
import { toast } from 'react-toastify';

type UseAuth = {
  isAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<void>;
  logoutFunc: () => void;
};

const useAuth = (): UseAuth => {
  const dispatch = useDispatch();

  const isAuthenticated = useCallback((): boolean => {
    
    const token = localStorage.getItem("token");
    const exTime = localStorage.getItem("exTime");
    const tokenExpiredTime: Date = new Date(exTime?.toString()!);
    if (token && tokenExpiredTime > new Date()) {
      return true;
    }
    logoutFunc();
    return false;
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
      try {
        const token = unwrapResult(await dispatch(signin({ username, password })));
        localStorage.setItem("token", token.access_token);
        localStorage.setItem("exTime", moment().add(30, "minutes").toString());
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed: " + JSON.stringify(error), {
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
  };
};

export default useAuth;
