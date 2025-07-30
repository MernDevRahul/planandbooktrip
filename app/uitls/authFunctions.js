const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const checkSession = async () => {
  try {
    const isTokenValid = await checkTokenExpiration(); // Ensure token is valid before making request
    const token = localStorage.getItem("token");

    if (isTokenValid && token) {
      const response = await fetch(`${SERVER_URL}/token/token-session`, {
        method: "GET",
        credentials: "include", // Important for sending cookies
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (!response.ok) throw new Error("No active session");

      const data = await response.json();
    
      return data.sessionData;
    }

    // If no valid token, check Google session
    const googleResponse = await fetch(`${SERVER_URL}/google-session`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!googleResponse.ok) throw new Error("No active session");

    const googleData = await googleResponse.json();
    
    return googleData.sessionData;
  } catch (error) {

    return null; // No session found
  }
};

export const checkTokenExpiration = async () => {
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (!expirationTime) {
   
    return false; // No token expiration means token is invalid
  }

  const currentTime = Date.now();
  const expiresAt = parseInt(expirationTime, 10);

  if (currentTime >= expiresAt) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    return false; // Token is expired
  }

  // Set timeout to remove the token exactly when it expires (only if not set already)
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }, expiresAt - currentTime);

  return true; // Token is still valid
};
