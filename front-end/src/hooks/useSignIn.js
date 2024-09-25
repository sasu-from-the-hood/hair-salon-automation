/* eslint-disable no-undef */
import { useState } from "react";
import { toast } from "react-toastify";

const useSignIn = () => {
  // Define state variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); // Store errors for each input field

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setLoading(true); // Start loading
    setInputErrors({}); // Clear previous errors

    try {
      // Make a POST request to the backend
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      // Check if the response is ok
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        sessionStorage.setItem(usertoken, data.token);
        sessionStorage.setItem(accessToken, data.accessToken);
        window.location = data.Redirect;

        console.log(data);
      } else {
        const errorData = await response.json();
        const errors = {};
        // Handle validation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorData.errors.forEach((err) => {
            errors[err.field] = err.errorMessage;
          });
        } else {
          errors[errorData.errors.field] = errorData.errors.errorMessage;
          toast.error(errorData.errors.errorMessage || "Something went wrong");
        }
        setInputErrors(errors); // Set errors for specific fields
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    inputErrors,
    handleSubmit,
  };
};

export default useSignIn;
