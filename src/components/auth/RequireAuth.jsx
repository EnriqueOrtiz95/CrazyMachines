import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useLayoutEffect } from "react";

const RequireAuth = () => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirect = (url) => {
    navigate(url);
  };

  useEffect(() => {
    if(!user?.username && pathname.includes("/profile")) {
      redirect("/login");
    }
    if(user?.username && (pathname === "/login" || pathname === "/register")) {
      redirect("/profile");
    }
  }, [pathname]);

  return !user?.username && pathname.includes("/profile") ? (
    redirect("/login")
    
  ) : (user?.username && pathname === "/login") || pathname === "/register" ? (
    redirect("/profile")
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
