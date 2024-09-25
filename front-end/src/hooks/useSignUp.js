/* eslint-disable no-undef */
import { useState } from "react";
import { toast } from "react-toastify";

const useSignUp = () => {
  // Define state variables for form inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({}); // Store errors for each input field

  // Validate inputs in real-time
  const validateInput = (fieldName, value) => {
    let errors = { ...inputErrors };

    switch (fieldName) {
      case "name":
        if (!value) {
          errors.name = "Name is required";
        } else {
          delete errors.name;
        }
        break;

      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email is invalid";
        } else {
          delete errors.email;
        }
        break;

      case "phone_number":
        if (!value) {
          errors.phone_number = "Phone number is required";
        } else if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
          errors.phone_number = "Phone number is invalid";
        } else {
          delete errors.phone_number;
        }
        break;

      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 6 || value.length > 20) {
          errors.password = "Password must be between 6 and 20 characters";
        } else {
          delete errors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Confirm password is required";
        } else if (value !== password) {
          errors.confirmPassword = "Passwords do not match";
        } else {
          delete errors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setInputErrors(errors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Start loading
    setInputErrors({}); // Clear previous errors

    // Validate all fields
    validateInput("name", name);
    validateInput("email", email);
    validateInput("phone_number", phone_number);
    validateInput("password", password);
    validateInput("confirmPassword", confirmPassword);

    // Check if there are any errors
    if (Object.keys(inputErrors).length > 0) {
      setLoading(false); // End loading if validation fails
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password, phone_number }),
      });

      // Check if the response is ok
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Sign up successful!");
        sessionStorage.setItem(usertoken, data.token);
        sessionStorage.setItem(accessToken, data.accessToken);
        window.location = data.Redirect;
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
    setEmail: (value) => {
      setEmail(value);
      validateInput("email", value);
    },
    name,
    setName: (value) => {
      setName(value);
      validateInput("name", value);
    },
    password,
    setPassword: (value) => {
      setPassword(value);
      validateInput("password", value);
    },
    confirmPassword,
    setConfirmPassword: (value) => {
      setConfirmPassword(value);
      validateInput("confirmPassword", value);
    },
    phone_number,
    setphone_number: (value) => {
      setphone_number(value);
      validateInput("phone_number", value);
    },
    loading,
    inputErrors,
    handleSubmit,
  };
};

export default useSignUp;
