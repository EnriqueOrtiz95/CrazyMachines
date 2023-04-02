import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirect = (url: string) => {
    navigate(url);
  };

  const userRegister = (storageName: string) => {
    return localStorage.getItem(storageName);
  };

  const handleRedirect = () => {
    if (!user && pathname.includes("/profile")) {
      redirect("/login");
      return true;
    }
    if (user && (pathname === "/login" || pathname === "/register")) {
      redirect("/profile");
      return true;
    }
    const userRegisterJSON = userRegister("userRegister");
    if (JSON.parse(userRegisterJSON as string) && pathname === "/register") {
      redirect("/verification");
      return true;
    }
    if (!userRegisterJSON && pathname === "/verification") {
      redirect("/register");
      return true;
    }
    return false;
  };

  useEffect(() => {
    handleRedirect();
  }, [user, pathname]);

  if (handleRedirect()) {
    return null;
  }

  return <Outlet />;
};

export default RequireAuth;