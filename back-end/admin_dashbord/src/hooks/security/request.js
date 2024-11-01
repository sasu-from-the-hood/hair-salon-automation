/**
 * 
 * @param {*} url "api/admin/setresource"
 * @param {*} options body : JSON.strgify(data)
 * 
 * @returns 
 * 
 * @example:
 * customFetch("api/admin/setresource", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.strgify(data)
    })
      .then(data => console.log(data))
      .catch(err => console.error("Error:", err));

 */




const customFetch = async (url, options = {}) => {
  const base_url = "http://localhost:5173/"

  options.headers = options.headers || {};
  const storage = options.storage || sessionStorage;
  const accessToken = storage.getItem("accessToken");

  if (accessToken) {
    options.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(base_url + url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "An error occurred";
      throw new Error(errorMessage);
    }

    const newAccessToken = response.headers.get("Authorization")?.split(" ")[1];
    if (newAccessToken) {
      storage.setItem("accessToken", newAccessToken);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

