import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import LogoDark from "../images/logo/logo-dark.svg";
import Logo from "../images/logo/logo.svg";
import "./src/index.css";
const SignUp = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-9 py-0 h-18 mb-10 bg-white">
        <div className="logo w-10 h-10 bg-cover bg-no-repeat bg-center bg-user">
          <img src="imgs/User 03C.png" alt="" />
        </div>

        <div class="btns">
          <button className="login w-24 h-10 text-base font-medium rounded-md border border-black bg-white cursor-pointer transition-all duration-300 mr-5 hover:opacity-80 ">
            Sign in
          </button>
          <button className="signup w-24 h-10 text-base font-medium rounded-md border border-black bg-black text-white cursor-pointer transition-all duration-300 mr-5  hover:opacity-80 ">
            Sign up
          </button>
        </div>
      </nav>

      <div
        id="signup"
        className="flex justify-center items-center; width: 100%; height: 100%;">
        <div className="card w-[33.13rem] rounded-3xl bg-[#ffffff] py-8  px-12">
          <h1 className="title font-medium text-[2rem] leading-none">
            Sign up
          </h1>
          <form action="" id="signupForm" className="flex flex-col">
            <label className="text-gray-600 mt-4">First name</label>
            <input type="text" />

            <label for="">Last name</label>
            <input type="text" />

            <label for="">Email</label>
            <input type="email" />

            <label for="">Phone number</label>
            <input type="tel" value="+251 " />

            <label for="">Password</label>
            <input type="password" />

            <button className="signupbtn px-4 py-3 text-lg font-bold text-white rounded-full bg-gray-300 hover:bg-black transition-all duration-300 cursor-pointer mt-10">
              Sign up
            </button>
            <div className="or-separator">
              <span>OR</span>
            </div>
            <button className="google-btn flex justify-center items-center px-4 py-2 text-lg rounded-full border border-black cursor-pointer">
              <span className="w-5 h-5 bg-cover bg-no-repeat bg-center bg-social-media"></span>
              &nbsp; &nbsp;Continue with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
