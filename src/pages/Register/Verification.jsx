import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState, useContext, lazy } from "react";
import styles from "./Register.module.css";

import { Helmet } from "react-helmet-async";
import { Auth } from "aws-amplify";
import RegisterContext from "../../context/auth/RegisterContext";

const ModalConfirmation = lazy(() =>
  import("../../components/modals/ModalConfirmation")
);

const Verification = () => {
  const [error, setError] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  const { userRegister, resendCode, setResendCode } =
    useContext(RegisterContext);

  const addZero = (num) => {
    return num.length === 5 ? "0" + num : num;
  };

  useEffect(() => {
    setError(false);
    setRegisterDone(false);
    setResendCode(false);
  }, []);

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
        <title>Crazy Machines | Verification</title>
        <meta name="description" content="Verification New User" />
      </Helmet>
      <Formik
        initialValues={{
          code: "",
          isSecondButton: false,
        }}
        onSubmit={(values, { resetForm }) => {
          if (values.isSecondButton) {
            Auth.resendSignUp(userRegister)
              .then((res) => {
                console.log(res);
                resetForm();
                setError(false);
                setResendCode(true);
                console.log("todo fine");
              })
              .catch((err) => {
                console.log(err);
                setError(true);
              });
            return;
          }
          Auth.confirmSignUp(
            userRegister,
            addZero(values?.code.toString()) || values?.code.toString()
          )
            .then((res) => {
              console.log(res);
              resetForm();
              setError(false);
              setRegisterDone(true);
              localStorage.removeItem("userRegister");
            })
            .catch((err) => {
              console.log(err);
              setError(true);
            });
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className={`bg-gray-form4 border-gray-form2 shadow-md border-2 border-double text-gray-BA max-w-[600px] w-[90%] mx-auto p-12 my-24 relative ${
              registerDone && "hidden"
            }}`}
          >
            <Field
              type="number"
              name="code"
              placeholder="Enter Your code:"
              id="code"
              className="w-full bg-white px-2 py-1 focus:text-black-cust"
            />
            {error && (
              <p className="text-xl mt-4 text-red-fond alerta">
                El codigo es incorrecto
              </p>
            )}
            <button className={styles["register-btn"]} type="submit">
              Confirmar
            </button>

            <div className="flex justify-center items-center">
              <button
                onClick={() => setFieldValue("isSecondButton", true)}
                className="text-2xl mt-10 p-2  text-red-fond alerta"
                type="submit"
              >
                Resend Code
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {resendCode && (
        <ModalConfirmation
          title={"Codigo Enviado!"}
          // setFormSubmit={setFormSubmit}
          registerDone={registerDone}
          setResendCode={setResendCode}
        />
      )}
      {registerDone && (
        <ModalConfirmation
          title={"Registro Exitoso!"}
          registerDone={registerDone}
          // setFormSubmit={setFormSubmit}
        />
      )}
    </>
  );
};

export default Verification;
