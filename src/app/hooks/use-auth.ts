import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { logout, signin } from "../slice/auth";
import useDispatch from "./use-dispatch";
import moment from "moment";

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
        // Nếu error là đối tượng, bạn có thể chuyển đổi nó thành chuỗi JSON để hiển thị chi tiết hơn:
        alert("Login failed: " + JSON.stringify(error));
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
