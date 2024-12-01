import axios from "axios";
const HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST;
const PORT = process.env.NEXT_PUBLIC_API_SERVER_PORT;
const BASE_URL = `${HOST}:${PORT}`;

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const login = async (email, password) => {
  console.log("login 요청");
  const response = await axios.post(BASE_URL + "/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export const register = async (email, password, nickname) => {
  const response = await axios.post(BASE_URL + "/users", {
    email: email,
    password: password,
    nickname: nickname,
  });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("nickname");
  window.location.href = "/";
};

export const getUserInfo = async (userId) => {
  const response = await axiosInstance.get(BASE_URL + `/users/${userId}`);
  return response.data;
};

export const updateUserInfo = async (updateUserInfo, userId) => {
  console.log("API - updateUserInfo", updateUserInfo);
  console.log("API - userId", userId);
  const response = await axiosInstance.put(BASE_URL + `/users/${userId}`, {
    nickname: updateUserInfo.nickname,
    currentPassword: updateUserInfo.currentPassword,
    password: updateUserInfo.password,
  });
  console.log("response", response);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(BASE_URL + `/users/${userId}`);
  return response.data;
};
