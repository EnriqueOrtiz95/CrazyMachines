import { useState } from "react";
// import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../utils/validations";

import { BiArrowBack, BiShowAlt, BiHide } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

import { Auth } from "aws-amplify";

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const notifyEmail = () => {
    toast.error("Wrong email or password");
  };

  const notifyServerError = () => {
    toast.error("Error connecting to server, please try again later");
  };

  return (
    <>
      <Helmet>
        <title>Crazy Machines | Login</title>
        <meta name="description" content="Login's Page" />
      </Helmet>
      <style jsx="true">{`
        body {
          height: 100vh;
          width: 100vw;
          background-image: linear-gradient(
              to right,
              rgb(30 20 10 / 0.9),
              rgb(10 20 30 / 0.95)
            ),
            url(/img/login_bg.jpg);
        }
        .logo {
          height: 60%;
          width: 100%;
          background-image: url(/img/logo1.webp);
          opacity: 0.5;
          background-size: cover;
          background-position: 10% center;
          z-index: -1;
        }
        .logo2 {
          height: 40%;
          width: 100%;
          background-image: url(/img/logo2.webp);
          opacity: 0.5;
          background-size: cover;
          background-position: 30% center;
          z-index: 2;
        }
      `}</style>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={validateLogin}
        onSubmit={async (values, { resetForm }) => {

          Auth.signIn(values.username, values.password)
            .then((user) => {
                setIsAuthenticated(true);
                resetForm();
                navigate("/");
            })
            .catch((err) => {
              const { code } = err;
              console.log(code);
              setIsAuthenticated(false);
              if (!err.response) {
                notifyServerError();
                return;
              }
              if (err.response.status === 401) {
                notifyEmail();
                return;
              }
            });
        }}
      >
        {({ errors, handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className={`flex flex-col md:flex-row border-gray-form2 shadow-md border-2 border-double text-black-cust w-[65%] md:w-[85%] lg:w-3/4 mx-auto h-[85vh] mt-10 md:mt-0 md:h-[100vh] relative ${styles.oswald} `}
          >
            <div className="hidden md:block md:w-1/2 relative bg-gray-form2">
              <div className="logo"></div>
              <div className="logo2"></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-text-drop opacity-80 text-white-cust text-[1.2rem] md:text-[1.4rem] p-12 h-[100%]">
              <h1 className="text-[1.7rem] md:text-[2rem] font-bolder py-6">
                Welcome to Crazy Machines
              </h1>
              <div className="mt-10">
                <label htmlFor="username" className="block mb-3">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Your Username:"
                  id="username"
                  className="w-full bg-white px-2 py-1 border-gray-BA border-2 text-black-cust"
                />
                <ErrorMessage
                  name="username"
                  component={() => (
                    <p className="text-lg my-1 text-gray-black errorInput">
                      {errors.username}
                    </p>
                  )}
                />
              </div>
              <div className="mt-10">
                <label htmlFor="password" className="block mb-3">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    placeholder="Enter Your Password:"
                    id="password"
                    className="w-full bg-white px-2 py-1 border-gray-BA border-2 text-black-cust"
                  />
                  {showPassword ? (
                    <BiHide
                      className="absolute top-0 right-0 mr-1 text-[2.2rem] text-blue-title transition ease-in-out duration-300 cursor-pointer hover:text-black-text hover:scale-110"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <BiShowAlt
                      className="absolute top-0 right-0 mr-1 text-[2.2rem] text-blue-title transition ease-in-out duration-300 cursor-pointer hover:text-black-text hover:scale-110"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component={() => (
                    <p className="text-lg my-1 text-gray-black errorInput">
                      {errors.password}
                    </p>
                  )}
                />
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-[.9rem] pt-2 text-gray-black hover:text-gray-cust notaf"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className={styles["signin-btn"]}>
                  Sign In
                </button>

                <div className="flex justify-center text-[1rem] mt-20">
                  Don't have an account yet?
                  <Link
                    to="/register"
                    className="text-orange-500 hover:text-orange-600 ml-2 notaf"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <label className="flex items-center justify-center absolute top-0 right-0 mb-6 z-2 text-white cursor-pointer bg-white-cust opacity-20 p-1.5 md:p-2">
              <BiArrowBack
                height={40}
                className="mr-2 text-black text-[2rem] md:text-[2.4rem] hover:text-blue-text-drop"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/");
                  }, 500);
                }}
              />
            </label>
          </Form>
        )}
      </Formik>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={() => {
          return `py-4 px-3 flex bg-white relative rounded-lg shadow max-w-[300px] text-blue-text-drop mx-auto justify-between top-16 xs:top-12 lg:top-0 mb-2`;
        }}
      />
    </>
  );
};

export default Login;
