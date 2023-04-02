export interface IModalConfirmation {
    title: string;
    setResendCode?: (resendCode: boolean) => void;
    setRegisterDone?: (registerDone: boolean) => void;
    setUserExists?: (userExists: boolean) => void;
    setShowModal?: (showModal: boolean) => void;
    showModal?: boolean;
}