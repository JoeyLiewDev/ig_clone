export const refreshToken = async () => {
  try {
    const response = await fetch("/api/authentication/refresh_token", {
      credentials: "include",
    });
    if (response.ok) {
      const { accessToken } = await response.json();
      localStorage.setItem("act", accessToken);
    }
  } catch (error) {
    console.error(error);
  }
};
