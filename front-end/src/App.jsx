import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PageNotExist from "./PageNotExist";
<<<<<<< HEAD
// import Admin from "./Admin/Admin";

import ForgotPassword from "./Authentication/forgetPassword";

// import LandingPage from "./Landing page/LandingPage";
=======

import ForgotPassword from "./Authentication/forgetPassword";

import LandingPage from "./Pages/LandingPage";
>>>>>>> a5e561f1a241c8de8a0a8dda8b6a5663ffb3ef6f
import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import AppointmentForm from "./Pages/Reservation";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
<<<<<<< HEAD
          {/* <Route path="/admin/*" element={<Admin />} /> */}
=======
          <Route path="/book-now" element={<AppointmentForm />} />
>>>>>>> a5e561f1a241c8de8a0a8dda8b6a5663ffb3ef6f
          <Route path="/forget-password" element={<ForgotPassword />} />
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
