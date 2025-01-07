import axios from "axios";

export const $api = axios.create({
  baseURL: "https://cargo-wsdy.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});
