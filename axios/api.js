import axios from "axios";
import Cookies from "js-cookie";

export const $api = axios.create({
  baseURL: "https://cargo-wsdy.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// #TODO - установление тока из запроса и хранение в Cokies а так же localStorage срок хранение 7 дней
// значение 7 дней можно поменять в свойстве "expires"

export const setToken = (token) => {
  Cookies.set("auth_token", token, { expires: 7 });
  localStorage.setItem("auth_token", token);
};

// #TODO - получение токена в запроса и сохрание в Cookies а так же в localStorage на хранение срокам 7 дней
//
export const getToken = () => {
  return Cookies.get("auth_token") || localStorage.getItem("auth_token");
};

// #TODO - перехватчик для установление токена в последуйщих запросах после входа или регистраций
$api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
