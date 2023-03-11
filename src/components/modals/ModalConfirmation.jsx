import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ModalConfirmation = ({setResendCode, title, registerDone, setUserExists, setShowModal, showModal}) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();
  return (
    <>
      {isOpen && (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg overflow-y-scroll">
          <div className="bg-gray-form2 rounded shadow-lg max-w-[85%] w-[700px] mt-[90px] p-12 relative">
            <div className="flex justify-center items-center">
              <MdMarkEmailRead className="text-6xl text-gray-300" />
            </div>
            <h2 className="p-5 text-center text-gray-300 text-[1.1rem] md:text-[1.4rem] lg:text-[1.6rem] ">
              {title}
            </h2>

              <a
                className="absolute top-5 right-5 text-[2rem] p-4 cursor-pointer notaf"
                onClick={() => {
                  setIsOpen(false);
                  if(title == "User already exists"){
                    setUserExists(false);
                    return;
                  }
                  if(title == "Codigo Enviado!"){
                    setResendCode(false);
                    return;
                  }
                  if(title.includes(JSON.parse(localStorage.getItem("username")))){
                    setShowModal(false);
                    if(!showModal){
                      navigate("/new-password");
                    }
                    return;
                  }
                  if(registerDone){
                    navigate("/");

                  }
                }}
              >
                X
              </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalConfirmation;
