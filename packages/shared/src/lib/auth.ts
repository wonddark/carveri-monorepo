let _token: string | null = localStorage.getItem("cv_token");
let _refreshToken: string | null = localStorage.getItem("cv_refresh_token");

export const auth = {
  getToken: () => _token,
  setToken: (token: string) => {
    _token = token;
    localStorage.setItem("cv_token", token);
  },
  clearToken: () => {
    _token = null;
    localStorage.removeItem("cv_token");
    _refreshToken = null;
    localStorage.removeItem("cv_refresh_token");
  },
  isAuthenticated: () => _token !== null,

  getRefreshToken: () => _refreshToken,
  setRefreshToken: (token: string) => {
    _refreshToken = token;
    localStorage.setItem("cv_refresh_token", token);
  },
};
