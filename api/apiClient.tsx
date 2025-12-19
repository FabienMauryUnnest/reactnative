import axios from "axios";
// import Config from "react-native-config";

// const token = "token";

const config = {
  baseURL: "https://jsonplaceholder.typicode.com",
  //   baseURL: "Config.API_URL",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `bearer ${token}`,
  },
};

export const apiClient = axios.create(config);
