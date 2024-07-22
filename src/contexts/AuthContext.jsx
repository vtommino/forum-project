import { useState } from "react";
import { createContext } from "react";
import authApi from "../api/auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../features/authentication/utils/local-storage";
import { useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();

    setAuthUser(resGetAuthUser.data.user);
  };

  async function getAuthInfo() {
    try {
      const resGetAuthUser = await authApi.getAuthUser();
      if (resGetAuthUser.data.user.isAdmin === true) {
        // window.location.pathname = "/admin";
      }
      setAuthUser(resGetAuthUser.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!authUser && getAccessToken()) {
      getAuthInfo();
    }
  }, []);

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  //Don't forget the dot before Authcontext otherwise infinite loop will occur. It will use itself.
  return (
    <AuthContext.Provider value={{ login, logout, authUser }}>
      {children}
    </AuthContext.Provider>
  );
}
