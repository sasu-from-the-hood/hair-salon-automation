import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogoDark from '../images/logo/logo-dark.svg';
import Logo from '../images/logo/logo.svg';
import useSignIn from '../hooks/useSignIn'; // Ensure this path is correct

const SignIn = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    inputErrors, // Use inputErrors instead of error
    handleSubmit,
  } = useSignIn();

  // Refs for input elements
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Update the title attribute based on input errors
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.title = inputErrors.email || '';
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.title = inputErrors.password || 'Password must be between 6 and 20 characters';
    }
  }, [inputErrors]);

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response);
    // Handle Google login response
  };

  const handleGoogleError = (error) => {
    console.error('Google Login Error:', error);
    // Handle Google login error
  };

  return (
    <GoogleOAuthProvider clientId="688019070397-fsfp3ji4eoq6aoibde26l5id91gree35.apps.googleusercontent.com">
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-8">
          <div className="flex justify-center mb-6">
            <img src={LogoDark} alt="Logo" className="dark:hidden w-32" />
            <img src={Logo} alt="Logo Dark" className="hidden dark:block w-32" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Sign In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                ref={emailInputRef} // Attach ref
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.email ? 'border-red-500 ring-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {inputErrors.email && (
                <p className="text-red-500 text-sm mt-1">{inputErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordInputRef} // Attach ref
                className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputErrors.password ? 'border-red-500 ring-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                pattern=".{6,20}"
                title="Must be between 6 and 20 characters"
                required
              />
              {inputErrors.password && (
                <p className="text-red-500 text-sm mt-1">{inputErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Remember Me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
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

          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              buttonText="Sign in with Google"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            />
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
