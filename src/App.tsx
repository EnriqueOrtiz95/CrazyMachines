import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));

const Layout = lazy(() => import("./components/Layout/Layout"));
const About = lazy(() => import("./pages/About/About"));
const Products = lazy(() => import("./pages/Products/Products"));
const MainPage = lazy(() => import("./pages/index"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

const Register = lazy(() => import("./pages/Register/Register"));
const Verification = lazy(() => import("./pages/Register/Verification"));

const Login = lazy(() => import("./pages/Login/Login"));
const ForgotPassword = lazy(() => import("./pages/Login/ForgotPassword"));
const NewPassword = lazy(() => import("./pages/Login/NewPassword"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Profile/Settings/Settings"));

const NotFound = lazy(() => import("./pages/NotFound"));


import { AuthProvider } from "./context/auth/AuthContext";
import { RegisterProvider } from "./context/auth/RegisterContext";
import MainPageSpinner from "./components/UI/Spinners/MainPageSpinner";

const App = () => {
  return (
    <Suspense fallback={<MainPageSpinner />}>
      <Router>
        <AuthProvider>
          <RegisterProvider>
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/new-password" element={<NewPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/profile" element={<Profile />}>
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              <Route path="/" element={<Layout />}>
                <Route index path="/" element={<MainPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </RegisterProvider>
        </AuthProvider>
      </Router>
    </Suspense>
  );
};

export default App;
