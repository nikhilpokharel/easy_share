import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("auth_user");
  const accountID = localStorage.getItem("selected_account");
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers.Account_ID = accountID;
  return config;
});
api.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.data);
    }
  },
  async (error) => {
    if (error && error?.message === "Network Error") {
      window.location.href = "/500";
    }
    const { response, request } = error;
    if (response) {
      if (
        response?.data?.statusText === "Unauthorized_User" ||
        response?.data?.expired
      ) {
        if (typeof window != "undefined") {
          await axios
            .post("api/logout")
            .then((res) => {
              localStorage.removeItem("auth_user");
              if (!["/login", "/register"].includes(window.location.pathname)) {
                window.location.href = "/login";
              }
            })
            .catch((err) => {
              console.log("err here");
              console.log(err);
            });
        }
      }
      if (response?.data?.status >= 400 && response?.data?.status < 500) {
        return Promise.reject(response.data);
      }
    } else if (request) {
      return null;
    }
    return Promise.reject(error);
  }
);

export default api;
