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
    
    return true;
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    const token = unwrapResult(await dispatch(signin({ username, password })));
    localStorage.setItem("token", token.access_token);
    localStorage.setItem(
      "exTime",
      moment()
        .add(token.expiresIn * 1000, "seconds")
        .toString()
    );
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
