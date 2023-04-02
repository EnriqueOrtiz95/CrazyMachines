import { createContext, useState, useEffect } from "react";
import { Children } from "../children";

const RegisterContext = createContext(
  {} as {
    userRegister: string;
    setUserRegister: (userRegister: string) => void;
    resendCode: boolean;
    setResendCode: (resendCode: boolean) => void;
  }
);

export const RegisterProvider = ({ children }: Children) => {
  const [userRegister, setUserRegister] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userRegister") as string) ?? ""
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
