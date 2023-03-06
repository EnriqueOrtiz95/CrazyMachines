import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import MainPage from "./pages";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Profile/Settings/Settings";

import { AuthProvider } from "./context/auth/AuthContext";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<MainPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="/profile/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />

            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
