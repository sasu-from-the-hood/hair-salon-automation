import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoDark from "../Assets/images/logo/logo-dark.svg";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phone_number,
    setphone_number,
    loading,
    inputErrors,
    handleSubmit,
  } = useSignUp();

  const [showOtherInputs, setShowOtherInputs] = useState(false);

  const handleGoogleSignUp = () => {
    setShowOtherInputs(false); // Hide other inputs when Google button is clicked
  };

  const handleEmailFocus = () => {
    setShowOtherInputs(true); // Show other inputs when email is clicked
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src={LogoDark} alt="Logo" className="w-32 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <a
                    href="/oauth"
                    onClick={handleGoogleSignUp}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt=""
                        className="w-6"
                      />
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </a>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-xs">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="p-2 text-gray-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${
                          inputErrors.email
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={handleEmailFocus}
                        required
                      />
                    </div>
                    {inputErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        * {inputErrors.email}
                      </p>
                    )}
                  </div>

                  {!showOtherInputs && (
                    <div className="mt-4 text-xs text-gray-600 text-center">
                      <p>
                        I agree to abide by terms of service and privacy policy.
                      </p>
                      Already have an account?
                      <Link
                        to="/sign-in"
                        className="border-b  ml-1 text-indigo-500 border-gray-500 border-dotted"
                      >
                        Sign in
                      </Link>
                    </div>
                  )}

                  <div
                    className={`transition-all duration-500 ease-in-out transform ${
                      showOtherInputs
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="mx-auto max-w-xs mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="p-2 text-gray-500"
                        />
                        <input
                          type="text"
                          placeholder="Name"
                          className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${
                            inputErrors.name
                              ? "border-red-500"
                              : "border-transparent"
                          }`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      {inputErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          * {inputErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="mx-auto max-w-xs mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="p-2 text-gray-500"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${
                            inputErrors.phone_number
                              ? "border-red-500"
                              : "border-transparent"
                          }`}
                          value={phone_number}
                          onChange={(e) => setphone_number(e.target.value)}
                          required
                        />
                      </div>
                      {inputErrors.phone_number && (
                        <p className="text-red-500 text-sm mt-1">
                          * {inputErrors.phone_number}
                        </p>
                      )}
                    </div>

                    <div className="mx-auto max-w-xs mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="p-2 text-gray-500"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${
                            inputErrors.password
                              ? "border-red-500"
                              : "border-transparent"
                          }`}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {inputErrors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          * {inputErrors.password}
                        </p>
                      )}
                    </div>

                    <div className="mx-auto max-w-xs mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="p-2 text-gray-500"
                        />
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${
                            inputErrors.confirmPassword
                              ? "border-red-500"
                              : "border-transparent"
                          }`}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      {inputErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          * {inputErrors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>

                {showOtherInputs && (
                  <div className="mt-6 text-xs text-gray-600 text-center">
                    <p>
                      I agree to abide by terms of service and privacy policy.
                    </p>
                    Already have an account?
                    <Link
                      to="/sign-in"
                      className="border-b text-indigo-500 border-gray-500 border-dotted"
                    >
                      Sign in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
