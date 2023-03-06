import { Outlet } from "react-router-dom";
import Footer from "../../pages/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.includes("/login") ||
      pathname.includes("/register") ? (
        <Outlet />
      ) : (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
