import About from "./About/About";
import { Helmet } from "react-helmet-async";
import Products from "./Products/Products";
import BackTopPage from "../components/UI/BackTopPage";
import Contact from "./Contact/Contact";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Crazy Machines | Home</title>
        <meta
          name="description"
          content="Crazy Machines is a company that sells crazy machines"
        />
      </Helmet>
      <div className="hero"></div>
      <About />
      <Products />
      <BackTopPage />
      <Contact />
    </>
  );
};

export default MainPage;
