// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignIn from "./Authentication/SignIn";
// import SignUp from "./Authentication/SignUp";
// // import PageNotExist from "./PageNotExist";
// import Admin from "./Admin/Admin";
// import LandingPage from "./Landing page/LandingPage";
// import Footer from "./Landing page/Footer";
// import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from "react-icons/ai";
// export default function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/sign-in" element={<SignIn />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/admin/*" element={<Admin />} />

//           {/* <Route path="*" element={<PageNotExist />} /> */}

//           <Route path="*" element={<Footer/>} />
//           <div className="bg-orange-200 justify-center items-center flex pb-30 flex-row space-x-5 pb-2 text-3xl">
//             <AiFillFacebook className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/600 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
//             <AiFillInstagram className="bg-browen box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
//             <AiFillTikTok className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/400 duration-300 " />
//           </div>
//         </Routes>
//       </Router>
//     </div>
//   );
// }


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Admin from "./Admin/Admin";
import LandingPage from "./Landing page/LandingPage";
// import Footer from "./Landing page/Footer";
// import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from "react-icons/ai";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin/*" element={<Admin />} />
          {/* <Route path="*" element={<PageNotExist />} /> */}
          {/* <Route path="*" element={<Footer />} /> */}
        </Routes>

        {/* Social Media Icons Section */}
        {/* <div className="bg-orange-200 justify-center items-center flex pb-30 flex-row space-x-5 pb-2 text-3xl">
          <AiFillFacebook className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/600 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
          <AiFillInstagram className="bg-browen box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
          <AiFillTikTok className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/400 duration-300 " />
        </div> */}
      </Router>
    </div>
  );
}

