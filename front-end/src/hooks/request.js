/* eslint-disable no-unused-vars */

const customFetch = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    options.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  sessionStorage.setItem(
    "accessToken",
    response.headers.get("Authorization").split(" ")[1]
  );
  sessionStorage.setItem(
    "refreshToken",
    response.headers.get("x-refresh-token")
  );

  return response;
};

const getTokensFromApi = async (url = "/oauth/google/callback") => {
  try {
    const response = await fetch(url); // Make sure to replace with your endpoint
    if (!response.ok) throw new Error("Failed to fetch tokens");

    const data = await response.json();
    if (data.token) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));

      window.location = data.Redirect;
    }
  } catch (error) {
    console.error(error);
  }
};

// On page load
window.onload = () => {
  getTokensFromApi();
};
