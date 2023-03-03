import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import { useEffect, useState } from "react";
// import ModalConfirmation from "./modals/modalConfirmation";

import { Helmet } from "react-helmet-async";

const Verification = ({username, resendCode, setResendCode}) => {

  const [error, setError] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);

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
      <Helmet>
        <title>Verification</title>
      </Helmet>
      <Formik
        initialValues={{
          code: "",
          isSecondButton: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          if (values.isSecondButton) {
            let resendCodeData = {
              Username: username,
            };
            console.log(resendCodeData);
            await Axios.post(
              `${process.env.VITE_API_URL}/resend_confirmation_code`,
              resendCodeData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => {
                console.log(res);
                resetForm();
                setError(false);
                setResendCode(true);
              })
              .catch((err) => {
                if (!err.response) {
                  setError(true);
                }
              });
            return;
          }
          let confirmationCodeData = {
            Username: username,
            ConfirmationCode:
              addZero(values?.code.toString()) || values?.code.toString(),
          };
          console.log(confirmationCodeData);
          await Axios.post(
            `${process.env.VITE_API_URL}/confirmation_account`,
            confirmationCodeData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => {
              console.log(res);
              resetForm();
              setError(false);
              setRegisterDone(true);
              // removeCookie(username);
              localStorage.removeItem("username");
            })
            .catch((err) => {
              if (err.response.status === 502) {
                setError(true);
                if (document.querySelector(".alerta")) {
                  setTimeout(() => {}, 2000);
                }
              }
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
              className="w-full bg-white px-2 py-1"
            />
            {error && (
              <p className="text-2xl mt-4 text-red-fond alerta">
                El codigo es incorrecto
              </p>
            )}
            <button className="register-btn">Confirmar</button>

            <div className="flex justify-center items-center">
              <button
                onClick={() => setFieldValue("isSecondButton", true)}
                className="text-3xl mt-10 p-2  text-red-fond alerta"
              >
                Resend Code
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* {resendCode && (
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
      )} */}
    </>
  );
};

export default Verification;
