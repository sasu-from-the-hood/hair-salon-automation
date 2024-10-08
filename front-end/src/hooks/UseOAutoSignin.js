import { toast } from 'react-toastify';

// Function to handle Google login success
async function handleGoogleSuccess(response, setLoading) {
    const { tokenId } = response; // Extract tokenId from Google response
    setLoading(true); // Set loading state to true

    try {
        const res = await fetch('/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenId }),
        });

        const data = await res.json(); // Parse the response as JSON

        if (res.ok) {
            toast.success(data.message || 'Login successful'); // Show success message

            // Store tokens in session storage
            sessionStorage.setItem("usertoken", data.token);
            sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));

            // Redirect to the specified homepage or route
            window.location = data.redirect || '/'; // Default redirect if not specified
        } else {
            toast.error(data.error || 'Login failed'); // Show error message if any
        }
    } catch (error) {
        console.error('Network or server error:', error);
        toast.error('Network or server error. Please try again.');
    } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
    }
}

// Function to handle Google login error
function handleGoogleError(error) {
    console.error('Google Login Error:', error);
    toast.error('Google login failed. Please try again.');
}

// Export the functions using ES6 export syntax
export { handleGoogleSuccess, handleGoogleError };
