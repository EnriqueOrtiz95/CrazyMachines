import { Helmet } from "react-helmet-async";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Crazy Machines | About</title>
        <meta
          name="description"
          content="About Crazy Machines"
        />
      </Helmet>
      <section id="about" className={`bg-blue-strong text-white-cust ${styles.raleway}`}>
        <h1>Why Crazy Machines?</h1>

        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <div className="w-1/2 text-xl">
            <h2>Our Mission</h2>
            <p>
              Crazy Machines is a company that is dedicated to promoving and
              providing all the models from Pump It Up Machines of Andamiro's
              Franchise to the best price in Mexico, assuring our customers that
              they will have the best experience with our machines in the dance
              play.
            </p>
            <br />
            <p>
              Currently, we are only selling the Machines in Mexico City,
              Guadalajara and Monterrey, but we are working to expand our
              services to the rest of the country as soon as we can.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="../../../public/img/about_mc.jpg"
              alt="Pump It Up"
              className="h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
