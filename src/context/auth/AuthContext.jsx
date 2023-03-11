import Axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [setCookie, removeCookie] = useCookies(["IdToken"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  const logout = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setUser({
        username: "",
        email: "",
        role: "",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   checkCookie();
  // }, []);

  // const checkCookie = async () => {
  //   try {
  //     const { data } = await Axios.get(
  //       `${process.env.VTTE_API_URL}/checkCookie`
  //     );
  //     const { IdToken } = data;
  //     console.log(IdToken);
  //     if(!IdToken) {
  //       // removeCookie("IdToken");
  //       setIsAuthenticated(false);
  //       return;
  //     }
  //     setCookie("IdToken", IdToken, {
  //       path: "/",
  //       // httpOnly: true,
  //       secure: true,
  //       sameSite: "strict",
  //     });
  //     setIsAuthenticated(true);
  //   } catch (err) {
  //     // removeCookie("IdToken");
  //     setIsAuthenticated(false);
  //   }
  // };

  // const logout = () => {
  //   setIsAuthenticated(false);
  //   setUser({
  //     username: "",
  //     email: "",
  //     role: "",
  //   })
  //   removeCookie("IdToken");
  //   navigate("/login");
  // };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;