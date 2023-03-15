import { useState, useEffect, lazy } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateForgotPassword } from "../../utils/validations";

import { BiArrowBack } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

import { Auth } from "aws-amplify";

const ModalConfirmation = lazy(() =>
  import("../../components/modals/ModalConfirmation")
);

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("username")) ?? ""
      : ""
  );
  const [showModal, setShowModal] = useState(false);

  const notifyError = () => {
    toast.error("User doesn't exists");
  };

  const notifyNonConfirmed = () => {
    toast.error("User is not confirmed, please check your email first");
  };

  const notifyLimitExceeded = () => {
    toast.error("Limit exceeded, please try again later");
  };

  const hideEmailMessage = (email) => {
    const hiddenUser = email.split("@")[0];
    return (
      email[0] +
      "*".repeat(hiddenUser.length) +
      email[email.length - 1] +
      "@" +
      email.split("@")[1]
    );
  };

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  return (
    <>
      <Helmet>
        <title>Crazy Machines | Forgot Password</title>
        <meta name="description" content="Recovery Password" />
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
        }}
        validationSchema={validateForgotPassword}
        onSubmit={async (values, { resetForm }) => {
          setShowModal(false);
          Auth.forgotPassword(values.username)
            .then((res) => {
              console.log(res);
              setShowModal(true);
              setUsername(values.username);
              resetForm();
            })
            .catch((err) => {
              const { code } = err;
              console.log(err);
              switch (code) {
                case "UserNotFoundException":
                  notifyError();
                  break;
                case "InvalidParameterException":
                  notifyNonConfirmed();
                  break;
                case "LimitExceededException":
                  notifyLimitExceeded();
                  break;
                default:
                  break;
              }
            });
        }}
      >
        {({ errors, handleSubmit }) => (
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
                Recover Password
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
                <button type="submit" className={styles["signin-btn"]}>
                  Send
                </button>
              </div>
            </div>
            <label className="flex items-center justify-center absolute top-0 right-0 mb-6 z-2 text-white cursor-pointer bg-white-cust opacity-20 p-1.5 md:p-2">
              <BiArrowBack
                height={40}
                className="mr-2 text-black text-[2rem] md:text-[2.4rem] hover:text-blue-text-drop"
                onClick={() => {
                  setTimeout(() => {
                    navigate(-1);
                  }, 500);
                }}
              />
            </label>
          </Form>
        )}
      </Formik>
      {showModal && (
        <ModalConfirmation
          title={`We have sent a code to ${hideEmailMessage(
            username
          )}, please check your email and enter the code to continue.`}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}

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

export default ForgotPassword;
