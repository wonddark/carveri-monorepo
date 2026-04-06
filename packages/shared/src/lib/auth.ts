let _token: string | null = localStorage.getItem("cv_token");

export const auth = {
  getToken: () => _token,
  setToken: (token: string) => {
    _token = token;
    localStorage.setItem("cv_token", token);
  },
  clearToken: () => {
    _token = null;
    localStorage.removeItem("cv_token");
  },
  isAuthenticated: () => _token !== null,
};
