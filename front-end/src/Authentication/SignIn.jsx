import { BrowserRouter as Router, Link } from "react-router-dom";
import LogoDark from "../images/logo/logo-dark.svg";
import Logo from "../images/logo/logo.svg";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const SignIn = () => {
  return (
    <Router>
      {/* Breadcrumb */}
      <Breadcrumb pageName="Sign In" />

      {/* Sign In Section */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-8">
          <div className="flex justify-center mb-6">
            {/* Change logo based on theme */}
            <img src={LogoDark} alt="Logo" className="dark:hidden w-32" />
            <img
              src={Logo}
              alt="Logo Dark"
              className="hidden dark:block w-32"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Sign In
          </h2>

          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

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
    </Router>
  );
};

export default SignIn;
