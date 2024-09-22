import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogoDark from '../images/logo/logo-dark.svg';
import Logo from '../images/logo/logo.svg';
import useSignUp from '../hooks/useSignUp';

// Example Google icon
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24"
    height="24"
    className="h-5 w-5"
  >
    <path
      fill="#4285F4"
      d="M23.54 12.25c-.1.15-.22.29-.36.4-2.69 2.69-7.05 2.69-9.74 0-1.39-1.39-2.22-3.25-2.35-5.27-.05-.83.1-1.67.39-2.46h-.01C9.4 6.08 12.65 9 17.25 9c.86 0 1.72-.1 2.54-.28-.1.53-.43 1.02-.93 1.41l-.32.24c-.01.01-.02.01-.03.02-1.17.76-2.39 1.24-3.69 1.29-.05-.01-.1-.01-.16-.01-1.49 0-2.92-.55-4.01-1.57-1.05-1.05-1.73-2.48-1.88-4-.03-.25-.05-.51-.06-.77.01-.3.03-.6.07-.9 1.44-.11 2.73.53 3.69 1.49 1.26 1.26 1.85 3.12 1.85 4.99 0 1.83-.59 3.46-1.58 4.79-.03.04-.06.08-.09.12.05 0 .1-.01.15-.02l-.01.02.03.01c1.74 1.74 4.24 1.74 5.98 0 .03-.03.05-.06.08-.09l-.02-.01c.03 0 .06.01.09.01 1.14 1.14 2.68 1.84 4.24 1.84h.01c1.89 0 3.71-.73 5.04-2.06 1.35-1.35 2.09-3.19 2.09-5.04 0-1.82-.58-3.53-1.57-4.9-.02-.02-.05-.05-.08-.08 0 0 0 0 0 0z"
    />
  </svg>
);

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

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-5xl p-8">
          <div className="flex justify-center mb-6">
            <img src={LogoDark} alt="Logo" className="dark:hidden w-32" />
            <img src={Logo} alt="Logo Dark" className="hidden dark:block w-32" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.name ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {inputErrors.name && <p className="text-red-500 text-sm mt-1">{inputErrors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.email ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {inputErrors.email && <p className="text-red-500 text-sm mt-1">{inputErrors.email}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="phone_number">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.phone_number ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                placeholder="e.g. +1234567890"
                value={phone_number}
                onChange={(e) => setphone_number(e.target.value)}
                required
              />
              {inputErrors.phone_number && <p className="text-red-500 text-sm mt-1">{inputErrors.phone_number}</p>}
            </div>

            {/* Password Field */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.password ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {inputErrors.password && <p className="text-red-500 text-sm mt-1">{inputErrors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.confirmPassword ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {inputErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{inputErrors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className={`col-span-1 md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider with "OR" */}
          <div className="text-center my-5 relative">
            <div className="absolute inset-0 flex items-center">
              <hr className="w-full border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative bg-white dark:bg-gray-800 px-4 text-gray-700 dark:text-gray-300">
              <span className="bg-white dark:bg-gray-800 px-2">--- OR ---</span>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center mt-4">
            <a
              href="/oauth"
              className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-md transition duration-150"
            >
              <GoogleIcon className="h-5 w-5 mr-2" />
              Sign up with Google
            </a>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
