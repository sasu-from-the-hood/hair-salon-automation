import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PageNotExist from "./PageNotExist";
import Admin from "./Admin/Admin";
<<<<<<< HEAD
import ForgotPassword from "./Authentication/forgetPassword";
=======
import LandingPage from "./Landing page/LandingPage";
>>>>>>> 2106da2798041bd195b09e1f1918c5e740fad6be
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
<<<<<<< HEAD
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
=======
          <Route path="/admin/*" element={<Admin />} />
>>>>>>> 2106da2798041bd195b09e1f1918c5e740fad6be
          <Route path="*" element={<PageNotExist />} />
        </Routes>
      </Router>
    </div>
  );
}

