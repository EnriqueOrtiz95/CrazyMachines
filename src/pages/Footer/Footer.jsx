import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <footer
      className={`flex flex-col lg:flex-row items-center px-16 py-8 bg-black-cust text-white-cust text-xl ${
        pathname === "/" ? "lg:justify-between" : "lg:justify-center"
      }`}
    >
      <nav
        className={` ${
          pathname === "/"
            ? "w-full lg:w-1/4 flex flex-col lg:flex-row gap-6 justify-center items-center"
            : "hidden"
        } `}
      >
        <a href="#top">Home</a>
        <a href="#about">About</a>
        <a href="#products">Products</a>
        <a href="#contact" className="mb-6 lg:mb-0">
          Contact
        </a>
      </nav>

      <p
        className={`w-full lg:w-3/4 text-center xl:clear-both font-bold ${
          pathname === "/" ? "lg:text-right" : "lg:text-center"
        }`}
      >
        Crazy Machines | Todos los derechos reservados{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
