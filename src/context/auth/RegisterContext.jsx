import { createContext, useState, useEffect } from "react";

const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [userRegister, setUserRegister] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userRegister")) ?? ""
      : ""
  );
  const [resendCode, setResendCode] = useState(false);

  useEffect(() => {
    localStorage.setItem("userRegister", JSON.stringify(userRegister));
  }, [userRegister]);

  return (
    <RegisterContext.Provider
      value={{ userRegister, setUserRegister, resendCode, setResendCode }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContext;
