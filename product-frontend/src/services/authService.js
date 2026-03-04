import api from "./axiosConfig";

export const login = (username, password) => {

  return api.post("/auth/login", {
    username,
    password
  });

};

export const logout = () => {

  localStorage.removeItem("token");

};