import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSignIn from '../hooks/useSignIn';
import { handleGoogleSuccess as googleSignIn, handleGoogleError as googleSignInError } from "../hooks/UseOAutoSignin";

const SignIn = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    inputErrors,
    handleSubmit,
  } = useSignIn();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const backgroundRef = useRef(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [googleLogoLoaded, setGoogleLogoLoaded] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.title = inputErrors.email || '';
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.title = inputErrors.password || 'Password must be between 6 and 20 characters';
    }
  }, [inputErrors]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBackgroundLoaded(true);
          observer.disconnect();
        }
      });
    });

    if (backgroundRef.current) {
      observer.observe(backgroundRef.current);
    }

    return () => {
      if (backgroundRef.current) observer.unobserve(backgroundRef.current);
    };
  }, []);

  const handleGoogleSuccess = async (response) => {
    setGoogleLoading(true);
    await googleSignIn(response, setGoogleLoading);
  };

  const handleGoogleError = (error) => {
    googleSignInError(error);
    setGoogleLoading(false);
  };


  return (
    <GoogleOAuthProvider clientId="688019070397-fsfp3ji4eoq6aoibde26l5id91gree35.apps.googleusercontent.com">
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              {/* Logo with transparent placeholder */}
              <div className="w-32 mx-auto bg-gray-200 rounded-full" style={{ display: logoLoaded ? 'none' : 'block' }}></div>
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                className={`w-32 mx-auto transition-opacity duration-500 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                alt="Logo"
                loading="lazy"
                onLoad={() => setLogoLoaded(true)}
              />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  {/* Google Sign In */}
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    {/* Google Logo with transparent placeholder */}
                    <div className="bg-white p-2 rounded-full">
                      <div className="w-6 h-6 bg-gray-200 rounded-full" style={{ display: googleLogoLoaded ? 'none' : 'block' }}></div>
                      <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt="Google logo"
                        className={`w-6 transition-opacity duration-500 ${googleLogoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => setGoogleLogoLoaded(true)}
                      />
                    </div>
                    <span className="ml-4">Sign in with Google</span>
                  </GoogleLogin>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign in with email
                  </div>
                </div>

                {/* Email and Password Form */}
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                  <div className="mb-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                      <FontAwesomeIcon icon={faEnvelope} className="p-2 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${inputErrors.email ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        aria-invalid={inputErrors.email ? 'true' : 'false'}
                      />
                    </div>
                    {inputErrors.email && <p className="text-red-500 text-sm mt-1" aria-live="polite">{inputErrors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-100 focus-within:border-gray-400">
                      <FontAwesomeIcon icon={faLock} className="p-2 text-gray-500" />
                      <input
                        type="password"
                        id="password"
                        ref={passwordInputRef}
                        className={`w-full px-4 py-3 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none ${inputErrors.password ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        aria-invalid={inputErrors.password ? 'true' : 'false'}
                      />
                    </div>
                    {inputErrors.password && <p className="text-red-500 text-sm mt-1" aria-live="polite">{inputErrors.password}</p>}
                  </div>

                  <Link to="/forget-password" className=" mb-5 border-b text-indigo-500 border-gray-500 border-none text-pretty float-right">
                    Forget password
                  </Link>

                  <button
                    type="submit"
                    className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don’t have an account?{' '}
                  <Link to="/sign-up" className="border-b  text-indigo-500 border-gray-500 border-dotted">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex" ref={backgroundRef}>
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat transition-opacity duration-500"
              style={{
                backgroundImage: backgroundLoaded
                  ? "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"
                  : 'none',
                opacity: backgroundLoaded ? 1 : 0,
              }}
            ></div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
