import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validateInput from '../hooks/security/clinit_vildcation'; // Import the validation function

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Define validation filters for the form fields
    const filters = {
        email: { type: "String", required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        phone_number: { type: "String", required: true, minLength: 10 },
        password: { type: "String", required: true, minLength: 6 },
        confirm_password: { type: "String", required: true, minLength: 6 },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for validation
        const data = {
            email,
            phone_number: phone,
            password,
            confirm_password: confirmPassword,
        };

        // Run validation
        const validationErrors = validateInput(data, filters);

        // Check for validation errors
        if (validationErrors) {
            validationErrors.forEach(error => {
                toast.error(`${error.field}: ${error.error}`);
            });
            return; // Stop submission if there are validation errors
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('./forgetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            // Handle response
            if (response.ok && result.success) {
                toast.success('Password reset link sent successfully! Check your email.');
            } else {
                toast.error(`${result.message}`);
                throw new Error(result.errorMessage || 'Failed to reset password');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-transparent-100 border-blue-50-500 to-white-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-1/2 lg:w-1/3">
                <div className="text-center mb-4">
                    <FontAwesomeIcon icon={faLock} className="text-3xl text-pretty-500" />
                </div>
                <h2 className="text-lg font-bold mb-2">Forgot Password?</h2>
                <p className="text-sm text-gray-600 mb-4">You can reset your password here</p>

                {/* Form to submit email and phone number */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border-b-2 border-blue-50-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email address"
                        required
                    />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 mb-4 border-b-2 border-blue-50-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone number"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border-b-2 border-blue-50-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 mb-4 border-b-2 border-blue-50-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm password"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Sending...' : 'Send My Password'}
                    </button>
                </form>

                {/* Toast container to display messages */}
                <ToastContainer />
            </div>
        </div>
    );
}
