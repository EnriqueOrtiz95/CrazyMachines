import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirect = (url) => {
    navigate(url);
  };

  useEffect(() => {
    if (!user && pathname.includes("/profile")) {
      redirect("/login");
      return;
    }
    if (user && (pathname === "/login" || pathname === "/register")) {
      redirect("/profile");
      return;
    }
    if (
      JSON.parse(localStorage.getItem("userRegister")) &&
      pathname === "/register"
    ) {
      redirect("/verification");
      return;
    }
    if (
      !JSON.parse(localStorage.getItem("userRegister")) &&
      pathname === "/verification"
    ) {
      redirect("/register");
      return;
    }
  }, [pathname]);

  return !user && pathname.includes("/profile") ? (
    redirect("/login")
  ) : (user && pathname === "/login") ||
    (user && pathname === "/register") ? (
    redirect("/profile")
  ) : JSON.parse(localStorage.getItem("userRegister")) &&
    pathname === "/register" ? (
    redirect("/verification")
  ) : !JSON.parse(localStorage.getItem("userRegister")) &&
    pathname === "/verification" ? (
    redirect("/register")
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
