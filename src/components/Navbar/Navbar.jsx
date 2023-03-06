import { Link, useLocation } from "react-router-dom";
import { BiMenu, BiLogIn, BiLogOut } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // setIsAuthenticated(true);
  }, []);

  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-8 bg-black-cust text-white-cust text-xl opacity-90">
      <button
        className="md:hidden absolute right-10 transition-all duration-500 ease-in-out 
        "
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          setIsLoginOpen(false);
          setIsAccountOpen(false);
        }}
      >
        {isMenuOpen ? <AiOutlineClose /> : <BiMenu />}
      </button>
      <button
        className={` md:hidden absolute left-10`}
        onClick={() => {
          setIsLoginOpen(!isLoginOpen);
          setIsMenuOpen(false);
          setIsAccountOpen(false);
        }}
      >
        {isAuthenticated ? (
          <MdOutlineAccountCircle className="text-2xl mr-2" />
        ) : (
          <BiLogIn className="text-2xl mr-2" />
        )}
      </button>
      <div>
        <Link to="/" className="notaf">
          Crazy <span className="text-orange-500">Machines</span>
        </Link>
      </div>
      <div
        id="links"
        className={`absolute right-0 top-14 p-4 md:p-0 md:static bg-black-cust md:bg-transparent flex flex-col md:flex md:flex-row w-[200px] md:w-auto items-end md:items-center ml-auto md:ml-0 gap-4 md:gap-0 md:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } 
        `}
      >
        <Link to="/" className="md:ml-10 no-opacity">
          Home
        </Link>
        <Link
          to="/about"
          className={`md:ml-10 no-opacity ${
            location.pathname === "/about" ? "" : ""
          }`}
        >
          About
        </Link>
        <Link to="/products" className="md:ml-10 no-opacity">
          Products
        </Link>
        <Link to="/contact" className="md:ml-10 no-opacity">
          Contact
        </Link>
      </div>
      <div
        className={`login md:flex ${
          isLoginOpen ? "translate-x-0" : "translate-x-[-200px]"
        }
      `}
      >
        {isAuthenticated ? (
          <>
            <MdOutlineAccountCircle
              className="cursor-pointer text-3xl hover:text-gray-400 hide-md"
              onClick={() => {
                setIsAccountOpen(!isAccountOpen);
              }}
            />
            <div
              className={`account-md md:flex ${
                isAccountOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Link to="/profile" className="md:ml-10 no-opacity">
                Profile
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
