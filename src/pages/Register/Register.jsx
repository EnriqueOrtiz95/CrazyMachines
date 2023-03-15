import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useContext, useEffect, lazy } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/validations";
import { BsUpload } from "react-icons/bs";
import { BiArrowBack, BiShowAlt, BiHide } from "react-icons/bi";

import bcrypt from "bcryptjs";

import { Storage } from "aws-amplify";

import RegisterContext from "../../context/auth/RegisterContext";
import { Helmet } from "react-helmet-async";
import { Auth } from "aws-amplify";

const ModalConfirmation = lazy(() =>
  import("../../components/modals/ModalConfirmation")
);

const Register = () => {
  const navigate = useNavigate();
  const { setUserRegister, resendCode, setResendCode } =
    useContext(RegisterContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    setUserExists(false);
  }, []);

  const notifyRegisterError = () => {
    toast.error("Couldn't sign up, please try again");
  };

  const notifyUserExists = () => {
    toast.error("User already exists!");
  };

  const notifyFileError = () => {
    toast.error("Please upload a file");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setFileName(file);
  };

  return (
    <>
      <style jsx="true">{`
        body {
          height: 100vh;
          width: 100vw;
          background-image: linear-gradient(
              to right,
              rgb(30 20 10 / 0.8),
              rgb(10 20 30 / 0.95)
            ),
            url(/img/register.webp);
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
      `}</style>
      <Helmet>
        <title>Crazy Machines | Register</title>
        <meta name="description" content="Register's Page" />
      </Helmet>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirmed: ""
        }}
        validationSchema={validate}
        onSubmit={async (values, { resetForm }) => {
          try {
            await Storage.put(fileName.name, fileName, {
              contentType: fileName.type,
            });
          } catch (error) {
            console.log(error);
          }

          Auth.signUp({
            username: values?.email,
            password: values.passwordConfirmed,
            autoSignIn: {
              enabled: true,
            },
          })
            .then((res) => {
              setUserRegister(values?.email);
              setUserExists(false);
              setImage(null);
              resetForm();
              navigate("/verification");
            })
            .catch((err) => {
              const { code } = err;
              switch (code) {
                case "UsernameExistsException":
                  notifyUserExists();
                  return;
                default:
                  notifyRegisterError();
              }
            });
        }}
      >
        {({ errors, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className={`bg-gray-form4 border-gray-form2 text-2xl shadow-md border-2 border-double text-gray-BA max-w-[600px] w-[90%] mx-auto p-12 my-24 relative
                } `}
          >
            <h2 className="heading text-red-fond">Create Account</h2>
            <label className="flex items-center justify-center w-[100px] h-[100px] absolute top-0 right-0 mb-6 text-white cursor-pointer bg-gray-form4 p-6">
              <BiArrowBack
                className="mr-2 text-white text-[3rem] hover:text-gray-BA"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/");
                  }, 500);
                }}
              />
            </label>
            <div className="mb-8">
              <Field
                type="file"
                name="photo"
                accept="image/*"
                id="photo"
                className="hidden"
                onChange={(e) => {
                  handleFile(e);
                }}
              />
              <ErrorMessage
                name="photo"
                component={() => (
                  <p className="text-[.5rem] mt-4 text-red-fond errorInput">
                    {errors.photo}
                  </p>
                )}
              />
              <label
                htmlFor="photo"
                className="flex items-center justify-center w-[100px] h-[100px] absolute top-0 left-0 text-white cursor-pointer bg-gray-form4"
              >
                {image ? (
                  <img src={image} alt={fileName} width={100} height={200} />
                ) : (
                  <div>
                    <BsUpload className="text-white text-[3rem] hover:text-gray-BA" />
                  </div>
                )}
              </label>
            </div>
            <div>
              <label htmlFor="email" className="block mb-6 mt-10 text-purple">
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter Your email:"
                id="email"
                className="w-full bg-white px-2 py-1 focus:text-black-cust"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <p className="text-[1rem] mt-4 text-red-fond">
                    {errors.email}
                  </p>
                )}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-6 mt-10 text-purple"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter Your password:"
                  id="password"
                  className="w-full bg-white px-2 py-1 focus:text-black-cust"
                />
                {showPassword ? (
                  <BiHide
                    className="absolute top-0 right-0 mr-1 text-[2rem] text-blue-title transition ease-in-out duration-300 cursor-pointer hover:text-black-text hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <BiShowAlt
                    className="absolute top-0 right-0 mr-1 text-[2rem] text-blue-title transition ease-in-out duration-300 cursor-pointer hover:text-black-text hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <ErrorMessage
                name="password"
                component={() => (
                  <p className="text-[1rem] mt-4 text-red-fond">
                    {errors.password}
                  </p>
                )}
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirmed"
                className="block mb-6 mt-10 text-purple"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  type={`${showPasswordConfirmed ? "text" : "password"}`}
                  name="passwordConfirmed"
                  placeholder="Confirm Your password:"
                  id="passwordConfirmed"
                  className="w-full bg-white px-2 py-1 focus:text-black-cust"
                />
                {showPasswordConfirmed ? (
                  <BiHide
                    className="absolute top-0 right-0 mr-1 text-[2rem] text-blue-title transition ease-in-out duration-300 cursor-pointer hover:text-black-text hover:scale-11"
                    onClick={() =>
                      setShowPasswordConfirmed(!showPasswordConfirmed)
                    }
                  />
                ) : (
                  <BiShowAlt
                    className="absolute top-0 right-0 mr-1 text-[2rem] text-blue-title transition ease-in-out duration-300 cursor-pointer hover:text-black-text hover:scale-11"
                    onClick={() =>
                      setShowPasswordConfirmed(!showPasswordConfirmed)
                    }
                  />
                )}
              </div>
              <ErrorMessage
                name="passwordConfirmed"
                component={() => (
                  <p className="text-[1rem] mt-4 text-red-fond">
                    {errors.passwordConfirmed}
                  </p>
                )}
              />
            </div>
            <button type="submit" className={styles["register-btn"]}>
              Register
            </button>
            {messageError && (
              <p className="text-[1rem] mt-4 text-red-fond alerta">
                {messageError}
              </p>
            )}
            {userExists && (
              <ModalConfirmation
                title="User already exists"
                setUserExists={setUserExists}
                resendCode={resendCode}
                setResendCode={setResendCode}
              />
            )}
          </Form>
        )}
      </Formik>

      <ToastContainer
        position="top-right"
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

export default Register;
