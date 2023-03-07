import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Layout = lazy(() => import("./components/Layout/Layout"));
const About = lazy(() => import("./pages/About/About"));
const Products = lazy(() => import("./pages/Products/Products"));
const MainPage = lazy(() => import("./pages/index"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Profile/Settings/Settings"));

const NotFound = lazy(() => import("./pages/NotFound"));

const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));

import { AuthProvider } from "./context/auth/AuthContext";

const App = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="/profile/settings" element={<Settings />} />
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
        </AuthProvider>
      </Router>
    </Suspense>
  );
};

export default App;
