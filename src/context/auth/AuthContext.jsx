import Axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [setCookie, removeCookie] = useCookies(["IdToken"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const logout = () => {
    setIsAuthenticated(false);
    removeCookie("IdToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;