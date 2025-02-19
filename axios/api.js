import axios from "axios";
import Cookies from "js-cookie";

export const $api = axios.create({
  baseURL: "http://cargoback.bwheel.ru/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Сохранение токена (7 дней)
export const setToken = (token) => {
  Cookies.set("auth_token", token, { expires: 7, path: "/" });
  localStorage.setItem("auth_token", token);
};

// Удаление токена
export const removeToken = () => {
  Cookies.remove("auth_token", { path: "/" });
  localStorage.removeItem("auth_token");
};

// Получение токена
export const getToken = () => {
  const token = Cookies.get("auth_token") || localStorage.getItem("auth_token");
  return token ? token : undefined;
};

// Перехватчик запросов (автоматически добавляет токен)
$api.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(`Твой токен ${token}`);
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
