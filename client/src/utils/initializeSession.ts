import jwtDecode from "jwt-decode";

import { refreshToken } from "./refreshToken";

export const initializeSession = async (
  loadSession: () => void,
  setLoading: (loading: boolean) => void
) => {
  // Check whether we have an access token.
  const accessToken = localStorage.getItem("act");
  if (accessToken) {
    console.log(accessToken);
    // Check expiration date.
    const { exp } = jwtDecode(accessToken);
    console.log(exp);
    // If the expiration date is earlier than the current time, try to refresh token.
    if (exp * 1000 < Date.now()) {
      await refreshToken();
    } else {
      // Otherwise, set new timeout to refresh token when access token expires.
      setTimeout(refreshToken, exp * 1000 - Date.now());
    }
    loadSession();
  } else {
    setLoading(false);
  }
};
