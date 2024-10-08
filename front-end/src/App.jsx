import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PageNotExist from "./PageNotExist";
import Admin from "./Admin/Admin";
<<<<<<< HEAD
import ForgotPassword from "./Authentication/forgetPassword";
=======
import LandingPage from "./Landing page/LandingPage";
<<<<<<< HEAD
>>>>>>> 2106da2798041bd195b09e1f1918c5e740fad6be
=======
import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from "react-icons/ai";
>>>>>>> 7631f6b99fbc1a6e2c54914f7d75fbe7763eb036
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

        <div className="bg-orange-200 justify-center items-center flex pb-30 flex-row space-x-5 pb-2 text-3xl">
          <AiFillFacebook className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/600 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
          <AiFillInstagram className="bg-browen box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
          <AiFillTikTok className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/400 duration-300 " />
        </div>
      </Router>
    </div>
  );
}

