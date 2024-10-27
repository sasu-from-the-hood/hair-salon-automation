

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

  return response;
};

